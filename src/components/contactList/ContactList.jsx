import React from 'react';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { Contact } from '../contact/Contact';
import { NoContacts } from 'components/noContacts/NoContacts';
import { ContactFilter } from '../contactFilter/ContactFilter';
import { selectFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  return (
    <div>
      <h2 className={css.subtitle}>Contacts</h2>
      <ContactFilter />
      {contacts.length === 0 && <NoContacts />}
      <ul className={css.list}>
        {contacts.length > 0 &&
          contacts.map(c => <Contact key={c.id} contact={c} />)}
      </ul>
    </div>
  );
};
