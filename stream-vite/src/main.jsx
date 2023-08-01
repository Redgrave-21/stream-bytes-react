import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
// import { AuthContextProvider } from './components/Context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
      <App />
    {/* </AuthContextProvider> */}
  </React.StrictMode>
)
