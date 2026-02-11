import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import Clarity from '@microsoft/clarity';

const projectId = 'vfv3oei6x3'; // Reemplaza con la ID que me dan en la página de Clarity cuando subo el proyecto
Clarity.init(projectId);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
