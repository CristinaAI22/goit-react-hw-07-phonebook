import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import css from './AddContact.module.css';
import { selectContacts } from 'redux/selectors';

export const AddContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setphoneError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [contactExistsMessage, setContactExistsMessage] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    setNameError('');
    setphoneError('');
    setContactExistsMessage('');

    const validateName = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
    const validatephone =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
        phone
      );

    if (!validateName) {
      setNameError('Please enter a valid name.');
      return;
    }

    if (!validatephone) {
      setphoneError('Please enter a valid phone phone.');
      return;
    }
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      setContactExistsMessage('Contact already exists in your contact list!');
      setTimeout(() => {
        setContactExistsMessage('');
      }, 2000);
      return;
    }
    dispatch(addContact({ name, phone }));

    setSuccessMessage('Contact added successfully.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
    setName('');
    setphone('');
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          {nameError && <p className={css.error}>{nameError}</p>}
        </label>
        <label>
          Phone number:
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={e => setphone(e.target.value)}
            required
          />
          {phoneError && <p className={css.error}>{phoneError}</p>}
        </label>
        <button type="submit">Add Contact</button>
      </form>
      {successMessage && <p className={css.successMessage}>{successMessage}</p>}
      {contactExistsMessage && (
        <p className={css.error}>{contactExistsMessage}</p>
      )}
    </div>
  );
};
