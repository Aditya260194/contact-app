import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList.js';

function App() {

 /* const contacts = [
    {
      id:1, name: "Aditya", email: "aditya260194@gmail.com"
    },
    {
      id:2, name: "Batflix", email: "gaikwad260194@gmail.com"
    }
  ]; */
  /*will use react hooks to set contacts from add contacts screen 
    This create state for contacts with blank as initial value
  */
  const [contacts, setContacts] = useState([]);


  const addContactHandler = (contact) =>{
    console.log(contact);
    /* to add contact to contacts we use setContacts which we we dfined earlier as hook */
    setContacts([...contacts, contact]);
  }

  return (
    <div className='ui container'>
      <Header/>
      {/* to fetch data from child to parent we use handler props*/}
      <AddContact addContactHandler={addContactHandler}/>
      {/* passing conatcts as props*/}
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;
