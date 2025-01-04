import React from 'react';
import { useDispatch } from 'react-redux';
// import { toggleTheme } from './themeSlice';
import { toggleTheme } from '../features/theme/themeSlice'; // Correct path to themeSlice.js

const ThemeToggler = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      style={{
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: '#ffffff',
        fontSize: '16px',
      }}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggler;
