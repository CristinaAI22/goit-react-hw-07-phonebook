import { useDispatch, useSelector } from 'react-redux';
import css from './App.module.css';
import { AddContact } from './addContact/AddContact';
import { ContactList } from './contactList/ContactList';
import { selectError, selectIsLoading } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <AddContact />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
    </div>
  );
};
