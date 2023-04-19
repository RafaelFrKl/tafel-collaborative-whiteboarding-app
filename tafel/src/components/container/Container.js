import { useState } from 'react'
import Board from '../board/Board'
import './Container.css'

const Container = () => {
    const [color, setColor] = useState('#000000')
    const [brushSize, setBrushSize] = useState('5')

    const handleChangeColor = (e) => {
        setColor(e.target.value)
    }

    const handleChangeBrushSize = (e) => {
        setBrushSize(e.target.value)
    }

    return (
        <div className='container'>
            <div className="tools-select">
                <div className='color-picker-container'>
              Select Brush Color: &nbsp;
                    <input type='color' value={color} onChange={handleChangeColor}/>
                </div>
                <div className='brushsize-container'>
              Select Brush Size: &nbsp;
                    <select value={brushSize} onChange={handleChangeBrushSize}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                    </select>
                </div>
            </div>
            <div className='board-container'>
                <Board color={color} brushSize={brushSize}></Board>
            </div>
        </div>
    )
}

export default Container