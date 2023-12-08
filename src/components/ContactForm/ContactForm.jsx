import css from './ContactForm.module.css';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleAddContact = userContacts => {
    const hasDuplicateContacts = contacts.some(
      contact =>
        contact.name.toLowerCase() === userContacts.name.toLowerCase() ||
        contact.number === userContacts.number
    );

    if (hasDuplicateContacts) {
      alert(
        `${userContacts.name} or ${userContacts.number} is already in contacts`
      );
      return;
    }
    dispatch(addContact(userContacts));
  };

  const [data, setData] = useState({ name: '', number: '' });
  const { name, number } = data;

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const userContacts = {
      id: nanoid(),
      name: name,
      number: number,
    };

    handleAddContact(userContacts);
    setData({ name: '', number: '' });
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit}>
      <label>
        <input
          className={css.formInput}
          type="text"
          value={name}
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          required
        />
      </label>
      <label>
        <input
          className={css.formInput}
          type="tel"
          value={number}
          onChange={handleInputChange}
          name="number"
          placeholder="Number"
          required
        />
      </label>
      <button className={css.formButton}>Add contact</button>
    </form>
  );
};