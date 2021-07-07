import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {

    const getContactId = (id) => {
        console.log("ContactList", id);
        props.getContactId(id);
    };

    const contacts = [{
        id: 1,
        "name": "A",
        "email": "a@gmail.com"
    }];

    const renderContactList = contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={getContactId}
                key={contact.id}></ContactCard>
        );
    }
    );
    return (
        <div class='main'>
            <h2>Contact List</h2>
            <div className='ui celled list'>
                {renderContactList}
            </div>
        </div>
    );
}

export default ContactList;