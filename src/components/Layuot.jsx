import React from 'react'
import Haeder from './Haeder'
import { Outlet } from 'react-router-dom'

export default function Layuot() {
  return (
    <>
    <Haeder/>
    <Outlet/>
    </>
  )
}
