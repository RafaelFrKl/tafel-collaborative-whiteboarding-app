/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import './Board.css'

const Board = ({ color, brushSize }) => {
    const socket = io.connect('http://localhost:3003')
    let timeout
    let isDrawing = false // Solves race condition

    socket.on('canvas-data', function(data) {
        console.log('On Recieval:', color, brushSize)
        let interval = setInterval(function() {
            if(isDrawing) return
            isDrawing = true
            clearInterval(interval)
            let image = new Image()
            const canvas = document.getElementById('board')
            const ctx = canvas.getContext('2d')
            image.onload = function() {
                ctx.drawImage(image, 0, 0)

                isDrawing = false
            }
            image.src = data
        }, 200)
    })

    // equivalent to windows.onload()
    useEffect(() => {
        drawOnCanvas()
    }, [])

    // update color and brush size whenever changed by user
    useEffect(() => {
        const canvas = document.getElementById('board')
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = brushSize
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.strokeStyle = color
    }, [color, brushSize])

    const drawOnCanvas = () => {
        const canvas = document.getElementById('board')
        const ctx = canvas.getContext('2d')

        let sketch = document.querySelector('#sketch')
        let sketch_style = getComputedStyle(sketch)
        canvas.width = parseInt(sketch_style.getPropertyValue('width'))
        canvas.height = parseInt(sketch_style.getPropertyValue('height'))

        let mouse = { x: 0, y: 0 }
        let last_mouse = { x: 0, y: 0 }

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x
            last_mouse.y = mouse.y

            let rect = canvas.getBoundingClientRect()
            let scaleX = canvas.width / rect.width
            let scaleY = canvas.height / rect.height
            mouse.x = (e.clientX - rect.left) * scaleX
            mouse.y = (e.clientY - rect.top) * scaleY
        }, false)

        /* Drawing on Paint App */

        canvas.addEventListener('mousedown', function(event) {
            canvas.addEventListener('mousemove', onPaint, false)
        }, false)

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false)
        }, false)


        const onPaint = () => {
            ctx.beginPath()
            ctx.moveTo(last_mouse.x, last_mouse.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.closePath()
            ctx.stroke()

            if(timeout !== undefined) clearTimeout(timeout)
            timeout = setTimeout(function(){
                let baseImage = canvas.toDataURL('image/png')
                socket.emit('canvas-data', baseImage)
            }, 500)
        }
    }

    socket.on('clear-data', function(data) {
        console.log('On Recieval:', data)
        if (data){
            const canvas = document.getElementById('board')
            const context = canvas.getContext('2d')
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
    })

    const handleClear = (e) => {
        const canvas = document.getElementById('board')
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        let clearCanvas = true
        socket.emit('clear-data', clearCanvas)
    }

    return (
        <div className="sketch" id='sketch'>
            <button onClick={handleClear}>Clear</button>
            <canvas className="board" id="board"></canvas>
        </div>
    )
}

export default Board