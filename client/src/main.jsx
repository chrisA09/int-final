import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Note from './Note.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/notes/:noteId",
    element: <Note />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
