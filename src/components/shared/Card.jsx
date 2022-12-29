import PropTypes from 'prop-types'

function Card({children, reverse}) {
    //conditional class
//   return <div className={`card ${reverse && 'reverse'}`}>
//         {children}
//     </div>

//conditional style
const darkStyles = {
    backgroundColor: reverse ? 'rgb(0,0,0,0.4)': '#fff',
    color: reverse ? '#fff': 'rgb(0,0,0)'
}
return (
    <div className="card" style={darkStyles}>
        {children}
    </div>
    )
}

Card.defaultProps = {
    reverse: false
}
Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool
}

export default Card