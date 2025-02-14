import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../Context'


export default function Haeder() {
    const { Card } = useContext(MainContext)  
    return (
        <div className="flex gap-20 text-[28px] px-10 font-bold border border-b-2 w-full py-4 bg-gray-200 shadow-lg font-[Poppins]">
    <div>
        <Link to="/card">Cart: {Card.length}</Link>
    </div>
    <div>
        <Link to="/">List</Link>
    </div>
</div>

    )
}


