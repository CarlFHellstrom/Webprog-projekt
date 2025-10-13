import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter} from 'react-router'
import {RouterProvider} from "react-router/dom"

import  ViewWatchlist  from './pages/ViewWatchlist.tsx';
import  SearchMedia  from './pages/SearchMedia.tsx';
import  SearchResult  from './pages/SearchResult.tsx';

const routerConfig = [
  {
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "pages/ViewWatchlist",
        Component: ViewWatchlist,
      },
      {
        path: "pages/SearchMedia",
        Component: SearchMedia,
      },
      {
        path: "pages/SearchResult",
        Component: SearchResult,
      },
      {
        path: "*",
        Component: PageNotFound,
      }
    ],
  },
];

function Home() {
  return <h2 className="text-xl font-bold text-center ">Welcome</h2>;
}

function PageNotFound() {
  return <h2>Page not found</h2>;
}

export default routerConfig;