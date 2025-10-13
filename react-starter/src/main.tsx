import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {createBrowserRouter} from 'react-router'
import {RouterProvider} from "react-router/dom"
import Watchlist from './components/ui/Watchlist';
import routerConfig from './Router.tsx'

const router = createBrowserRouter(routerConfig);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
