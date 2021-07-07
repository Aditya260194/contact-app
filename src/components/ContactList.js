import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {

    const getContactId = (id) => {
        console.log("ContactList", id);
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={getContactId}
            key={contact.id}></ContactCard>
        );
    }
    );
    return (
        <div className='ui celled list'>
            {renderContactList}
        </div>
    );
}

export default ContactList;