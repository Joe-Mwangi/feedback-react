import { useState, createContext } from "react"
import { v4 as uuidv4 } from "uuid"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 'wiewfhfue8239',
            rating: 7,
            text: 'Feedback from context'
        }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    //adding new feedback
    const addNewFeedback = newFeedback => {
        newFeedback.id = uuidv4()
        console.log(newFeedback)
        setFeedback([newFeedback, ...feedback])
    }

    //deleting new feedback
    const deleteFeedback = id => {
        setFeedback(feedback.filter(item => item.id !== id))
    }
    
    //updating feedback
    const editFeedback = item => {
        setFeedbackEdit({item, edit: true})
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map(item => 
            item.id === id ? {...item, ...updItem}: item
        ))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addNewFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext