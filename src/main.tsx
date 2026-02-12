import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/global.css'

// 👇 import this
import { preloadImages } from './assets/preLoad'

// 👇 call it BEFORE render
preloadImages()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
