import {ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER} from '../types'

export default function (state, action) {
    switch (action.type) {
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload) 
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case SET_CURRENT:
            return {
                ...state,
                current: null
            }

        default:
            return state
    }
}