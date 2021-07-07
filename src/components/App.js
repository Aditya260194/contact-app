import React, { useState, useEffect } from 'react';
/*useEffect renders values when it changes, we use it to store values in local data */
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList.js';
import { uuid } from 'uuidv4'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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

  const addContactHandler = (contact) => {
    console.log("addContactHandler ", contact);
    /* to add contact to contacts we use setContacts which we we dfined earlier as hook */
    //setContacts([...contacts, contact]);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }

  /*storing contacts in local storage*/
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("use EffectretrieveContacts", retrieveContacts);
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  /*stpring contacts in local storage */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    console.log("use Effect setItem ");
  }, [contacts]);

  const deleteContactHandler = (id) => {
    const newContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContacts);
  };

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact 
              render = { (props) => (
                  <ContactList {...props} 
                  contacts={contacts} getContactId={deleteContactHandler}
                  />
              )}
          />
          <Route path="/add" render = { (props) => (
                  <AddContact {...props} 
                  addContactHandler={addContactHandler}
                  />
              )}/>
        </Switch>
        {/*<AddContact addContactHandler={addContactHandler} /> }
        {//<ContactList contacts={contacts} getContactId={deleteContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
