import React from 'react'
import { Link } from 'react-router'
export const Header = () => {
    return (
        <nav className="left-0 w-full px-10 py-6 flex justify-between items-center text-white fixed top-0 z-5000 backdrop-blur-md">
            <div className="text-2xl font-bold">CredoPay</div>
            <div className="hidden md:flex gap-8 text-sm items-center">
                <a href="#">Products</a>
                <a href="#">Company</a>
                <a href="#">Support</a>
                <Link to="/signin"><button className="border border-white px-4 py-2 rounded">User Login</button></Link>
                <button className="bg-white text-black px-4 py-2 rounded font-semibold">Employee</button>
            </div>
        </nav>
    )
}
