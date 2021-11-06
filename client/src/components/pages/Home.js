import React from 'react'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'

const Home = () => {
    return (
        <div class = 'grid-2'>
            <div>
             <ContactForm />
            </div>
            <div>
              <Contacts />
            </div>
        </div>
    )
}

export default Home
