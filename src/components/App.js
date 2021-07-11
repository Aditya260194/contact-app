import React, { useState, useEffect } from 'react';
/*useEffect renders values when it changes, we use it to store values in local data */
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList.js';
import ContactDetails from './ContactDetails.js';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';
import { uuid } from 'uuidv4'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import api from '../api/contact'

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

  //Retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts")
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log("addContactHandler ", contact);
    /* to add contact to contacts we use setContacts which we we dfined earlier as hook */
    //setContacts([...contacts, contact]);

    const request = { id: uuid(), ...contact };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  /*storing contacts in local storage*/
  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log("use EffectretrieveContacts", retrieveContacts);
    //if (retrieveContacts) setContacts(retrieveContacts);
    const geAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    geAllContacts();
  }, []);

  /*stpring contacts in local storage */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    console.log("use Effect setItem ");
  }, [contacts]);

  const deleteContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContacts);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
    return contact.id == id ? { ...response.data } : contacts;
  }));
};

return (
  <div className='ui container'>
    <Router>
      <Header />
      <div>
        <Switch>
          <Route path="/" exact
            render={(props) => (
              <ContactList {...props}
                contacts={contacts}
              />
            )}
          />
          <Route path="/add" render={(props) => (
            <AddContact {...props}
              addContactHandler={addContactHandler}
            />
          )} />
          <Route path="/contact/:id" component={ContactDetails} />
          <Route path="/deletecontact/:id" render={(props) => (
            <DeleteContact {...props}
              contacts={contacts} clickHandler={deleteContactHandler}
            />
          )} />
          <Route path="/editcontact/" render={(props) => (
            <EditContact {...props}
              contacts={contacts} updateContactHandler={updateContactHandler}
            />
          )} />
        </Switch>
      </div>
      {/*<AddContact addContactHandler={addContactHandler} /> }
        {//<ContactList contacts={contacts} getContactId={deleteContactHandler} /> */}
    </Router>
  </div>
);
}

export default App;
