import { useState, useEffect,createContext } from "react"
// import { v4 as uuidv4 } from "uuid"

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
        const response = await fetch(`${url}?_sort=id&_order=desc`)
        const results = await response.json()
        setFeedback(results)
        setIsLoading(false)
    }

    async function delData(id) {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
    }

    //adding new feedback
    async function addNewFeedback(newFeedback) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const results = await response.json()
        
        setFeedback([results, ...feedback])
    }

    //deleting new feedback
    const deleteFeedback = id => {
        delData(id)
        setFeedback(feedback.filter(item => item.id !== id))
    }
    
    //updating feedback
    const editFeedback = item => {
        setFeedbackEdit({item, edit: true})
    }

    async function updateFeedback(id, updItem) {
        const response = await fetch(`${url}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })
        const results = await response.json()
        setFeedback(feedback.map(item => 
            item.id === id ? {...item, ...results}: item
        ))
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