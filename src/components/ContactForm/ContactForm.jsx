import PropTypes from 'prop-types';
import React from 'react';
import {Form, Label, Input, Button} from './ContactForm.styled'
import { nanoid } from 'nanoid';


export class ContactForm extends React.Component{
    state = {
        name: '',
        number: '',
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { name, number } = this.state;
        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        this.props.onSubmit(newContact);
        this.setState({ name: '', number: '', });
    };


    render() {
        const { name, number } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Label>
                    Name
                <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    />
                </Label>
                
                <Label>
                    Number
                <Input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                   
                    required
                    />
                </Label>

                <Button type="submit">Add contact</Button>
            </Form>
        )
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};