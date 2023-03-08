import Board from "../board/Board"

const Container = () => {
  const containerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={containerStyle}>
        <div className='color-picker-container'>
            <input type='color' />
        </div>
        <div className='board-container'>
 
        </div>
    </div>
  )
}

export default Container