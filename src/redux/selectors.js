import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilterSlice = state => state.filters.textFilter;

export const selectFilteredContacts = createSelector(
  [selectFilterSlice, selectContacts],
  (filterSlice, contacts) => {
    const textFilter = filterSlice;
    console.log(textFilter);

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);
