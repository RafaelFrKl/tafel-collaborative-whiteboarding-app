import { useEffect } from 'react'
import './Board.css'

const Board = () => {
 
  // equivalent to windows.onload()
  useEffect(() => {;
    drawOnCanvas();
  }, []);

  const drawOnCanvas = () => {
    let canvas = document.getElementById('board');
    console.log(canvas);
    let ctx = canvas.getContext('2d');
    console.log(ctx);

    let sketch = document.querySelector('#sketch');
    let sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    let mouse = {x: 0, y: 0};
    let last_mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);


    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';

    canvas.addEventListener('mousedown', function(event) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);
    
    const onPaint = () => {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    };
  }

  return (
    <div className="sketch" id='sketch'>
        <canvas className="board" id="board"></canvas>
    </div>
  )
}

export default Board