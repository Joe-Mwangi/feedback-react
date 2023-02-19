import { useState, useEffect,createContext } from "react"
import { v4 as uuidv4 } from "uuid"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    useEffect(() => {
        fetchData()
    }, [])

    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    const [isLoading, setIsLoading] = useState(true)

    const url = 'http://localhost:5000/feedback'
    async function fetchData() {
        const response = await fetch(url)
        const results = await response.json()
        setFeedback(results)
        setIsLoading(false)
    }

    async function createData(data) {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    async function delData(id) {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
    }

    async function updateData(id, body) {
        await fetch(`${url}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    //adding new feedback
    const addNewFeedback = newFeedback => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
        createData(newFeedback)
    }

    //deleting new feedback
    const deleteFeedback = id => {
        setFeedback(feedback.filter(item => item.id !== id))
        delData(id)
    }
    
    //updating feedback
    const editFeedback = item => {
        setFeedbackEdit({item, edit: true})
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map(item => 
            item.id === id ? {...item, ...updItem}: item
        ))
        updateData(id, updItem)
    }

    return <FeedbackContext.Provider value={{
        feedback,
        isLoading,
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