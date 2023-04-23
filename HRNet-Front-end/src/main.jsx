import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages/Router';
import CssBaseline from '@mui/material/CssBaseline';
//import { WrappedApp } from './App';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <WrappedApp />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  </React.StrictMode>
);
