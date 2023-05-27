import { createRoot } from "react-dom/client"
import React from "react"
import App  from "./src/App.jsx"
import { ReactDOM } from "react-dom/client"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "*",
        element: <App />
    }
])

createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

