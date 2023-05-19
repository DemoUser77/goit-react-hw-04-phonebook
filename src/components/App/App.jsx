import React from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container } from './App.styled';
// import { nanoid } from 'nanoid';


export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  componentDidMount() {
    const savedState = localStorage.getItem("contacts");

    if (savedState) {
      this.setState({contacts: JSON.parse(savedState)})
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  };

  addContact = contact => {
    if (this.state.contacts.some(item => (item.name).toLowerCase() === (contact.name).toLowerCase(),)) {
      alert(`${contact.name} is already in contacts.`)
    } else {
      this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }))
    }
  
  };
   
onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };


 onChangeFilter = event => {
    this.setState({ filter: event.target.value })
  };


  render(){
    
     const getContacts = this.state.contacts.filter(contact =>
    contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact } />

        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChange={this.onChangeFilter} />
        
        <ContactList
          contacts={getContacts}
           onDeleteContact={this.onDeleteContact}  />
          
      
      </Container>
    )
  };
}
