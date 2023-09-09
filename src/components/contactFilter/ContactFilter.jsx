import css from './ContactFilter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTextFilter } from 'redux/filterSlice';
import { selectFilterSlice } from 'redux/selectors';

export const ContactFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterSlice);
  const handleFilterChange = e => {
    const name = e.target.value;
    dispatch(changeTextFilter(name));
  };
  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Search contacts..."
      className={css.input}
    />
  );
};
