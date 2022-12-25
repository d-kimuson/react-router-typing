import React from "react"
import ReactDOM from "react-dom"
import { RouterProvider } from "react-router-dom"
import { router } from './index'

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <RouterProvider router={router} />
)
