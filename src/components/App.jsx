import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Layout } from "./Layout";
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

const getInitialContacts = () => {

 const savedContacts = localStorage.getItem('contacts');
  if (savedContacts) {
    return JSON.parse(savedContacts);
  }
  return []
};

export const App = () => {

  const [contacts, setContacts] = useState(getInitialContacts())
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
      return;
  }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = newContact => {
    const { name, number } = newContact;
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
        || contact.number === number
    );
  
    if (isExist) {
      alert(`${name} or ${number} is already in contacts.`);
      return;
    }

  setContacts(prevContacts => [
    ...prevContacts,
    { id: nanoid(), ...newContact },
  ]);
  }

const deleteContact = contactId => {
  setContacts(prevContacts =>
    prevContacts.filter(contact => contact.id !== contactId)
  );
};

  const searchContact = filterContact => {
   setFilter(filterContact);
  };

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onSearchContact={searchContact} />
        <ContactList filterContactsList={visibleContacts} deleteContact={deleteContact} />
     </Layout>
    ); 
    }
