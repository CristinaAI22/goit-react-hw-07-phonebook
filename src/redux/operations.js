import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://64f9f4684098a7f2fc153948.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      Notiflix.Loading.standard('Loading...');
      const response = await axios.get('/contacts');
      Notiflix.Loading.remove();
      return response.data;
    } catch (err) {
      Notiflix.Loading.remove();
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, phone });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      Notiflix.Notify.success('Contact deleted successfully!');
      return response.data;
    } catch (err) {
      Notiflix.Notify.failure('Error deleting contact.');
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
