import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid'
import ContactContext from "./contactContext";
import contactReducer from './contactReducer'
import {ADD_CONTACT,
        DELETE_CONTACT,
        SET_CURRENT,
        CLEAR_CURRENT,
        UPDATE_CONTACT,
        FILTER_CONTACTS,
        CLEAR_FILTER} from '../types'

// Creating initial state
const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "John Doe",
                email: "John@gmail.com",
                phone: '111-222',
                type: 'personal'
            },
            {
                id: 2,
                name: "Jane Doe",
                email: "Jane@gmail.com",
                phone: '111-322',
                type: 'personal'
            },
            {
                id: 3,
                name: "Jimm Dane",
                email: "Jimm@gmail.com",
                phone: '231-232',
                type: 'professional'
            },


        ],

            current: null
    }

    // Pulling out the state and dispatching the reducer
    const [state, dispatch] = useReducer(contactReducer, initialState) 

    // Having all the necessary actions
    
    // Add contact
 
    const addContact = (contact) => {
        // Generating a "fake" ID for a contact before dealing with MongoDB (After connecting to the backend, we
        // will be using data from the database that provides us with a built-in ID)
        contact.id = uuidv4()
        dispatch({type: ADD_CONTACT, payload: contact}) 
    }

    // Delete contact

    const deleteContact = id => { 
        dispatch({type: DELETE_CONTACT, payload: id})
    }

    // Set current contact

    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    // Clear current contact 
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    } 
    // Update the contact

    // Filter contact

    // Clear filter

    return (
        <ContactContext.Provider
        value = {{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,


        }}>
            {props.children}
      

        </ContactContext.Provider>  
    )

}

export default ContactState
