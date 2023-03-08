import Board from "../board/Board"
import './Container.css'

const Container = () => {

  return (
    <div className='container'>
        <div className='color-picker-container'>
            <input type='color' />
        </div>
        <div className='board-container'>
          <Board></Board>
        </div>
    </div>
  )
}

export default Container