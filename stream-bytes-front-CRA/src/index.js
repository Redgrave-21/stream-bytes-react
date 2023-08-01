import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './contexts/AuthContext';
import NavigationBar from './components/Navbar/NavigationBar';
import { ManageVideoContextProvider } from './contexts/ManageVideoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root);
root.render(
  <React.StrictMode>
    <AuthContextProvider value={Children}>
      <ManageVideoContextProvider value={Children}>
      <App />
      </ManageVideoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


reportWebVitals();
