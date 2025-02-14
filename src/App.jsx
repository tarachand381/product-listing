import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import List from './components/List'
import Details from './components/Details'

import Layuot from './components/Layuot'
import Card from './components/Card'


export default function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layuot />,
        children: [
          {
            path: "/:categor_slug?",
            element: <List />
          },
          {
            path: "/details/:Products_id?",
            element: <Details />
          },
          {
            path: "/card",
            element: <Card />
          },
        

        ]
      },

    ]
  )
  return (
    <RouterProvider router={router} />
  )
}
