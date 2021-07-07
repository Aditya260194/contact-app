import React, { useState, useEffect } from 'react';
/*useEffect renders values when it changes, we use it to store values in local data */
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList.js';
import uuid from 'uuidv4'

function App() {

 /* const contacts = [
    {
      id:1, name: "Aditya", email: "*@gmail.com"
    },
    {
      id:2, name: "Batflix", email: "*@gmail.com"
    }
  ]; */
  /*will use react hooks to set contacts from add contacts screen 
    This create state for contacts with blank as initial value
  */
  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler = (contact) =>{
    console.log("addContactHandler " , contact);
    /* to add contact to contacts we use setContacts which we we dfined earlier as hook */
    setContacts([...contacts, contact]);
  }

  /*storing contacts in local storage*/
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("use EffectretrieveContacts" , retrieveContacts);
    if(retrieveContacts) setContacts(retrieveContacts);
  },[]);

    /*stpring contacts in local storage */
    useEffect( () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      console.log("use Effect setItem ");
    }, [contacts]);

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
