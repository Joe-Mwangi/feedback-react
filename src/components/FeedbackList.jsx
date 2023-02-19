import {motion, AnimatePresence} from 'framer-motion'
import FeedbackItem from "./FeedbackItem"
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackList() {
  const {feedback, isLoading} = useContext(FeedbackContext)

  if(!isLoading && (!feedback || feedback.length === 0)) {
    return (
        <div>No Feedback yet</div>
    )
  }
  return isLoading ? <h3>Loading...</h3> : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map(item => (
            <motion.div
            key={item.id} 
            initial={{opacity: 0, y: "-50%"}}
            animate={{opacity: 1, y: "0%"}}
            exit={{opacity: 0, x: "-150%"}}
            >
              <FeedbackItem key={item.id} item={item}/>
            </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}


  //with no animation
//   return (
//     <div className="feedback-list">
//         {feedback.map(item => (
//             <FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
//         ))}
//     </div>
//   )
// }

// FeedbackList.propTypes = {
//     feedback: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             text: PropTypes.string.isRequired,
//             rating: PropTypes.number.isRequired
//         })
//     )
// }
export default FeedbackList