import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Layout } from "./Layout";
import { nanoid } from 'nanoid';

export class App extends Component {
state = {
  contacts: [],
  filter: ''
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts')

    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  addContact = newContact => {
    const { name, number } = newContact;
    const isExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
        || contact.number === number
    );
  
    if (isExist) {
      alert(`${name} or ${number} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [
          ...prevState.contacts,
          {id: nanoid(), ...newContact},
        ],
      }));
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  searchContact = filterContact => {
    this.setState({
      filter: filterContact,
    })
  };


  render() {
    const { contacts, filter } = this.state
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onSearchContact={this.searchContact} />
        <ContactList filterContactsList={visibleContacts} deleteContact={this.deleteContact} />
     </Layout>
    ); 
    }
}