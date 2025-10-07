import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter} from 'react-router'
import {RouterProvider} from "react-router/dom"
import Watchlist from './components/ui/Watchlist';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
  {
    path: '/components/ui/Watchlist',
    element: <Watchlist />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
