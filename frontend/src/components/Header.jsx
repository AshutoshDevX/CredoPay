import React from 'react'
import { Link } from 'react-router'
export const Header = () => {
    return (
        // <nav className="left-0 w-full px-10 py-6 flex justify-between items-center text-white fixed top-0 z-5000 backdrop-blur-md">
        //     <div className="text-2xl font-bold">CredoPay</div>
        //     <div className="hidden md:flex gap-8 text-sm items-center">
        //         <a href="#">Products</a>
        //         <a href="#">Company</a>
        //         <a href="#">Support</a>
        //         <Link to="/signin"><button className="border border-white px-4 py-2 rounded">Login</button></Link>
        //         <Link to="/signup"><button className="bg-white text-black px-4 py-2 rounded font-semibold">SignUp</button></Link>
        //     </div>
        // </nav>
        <nav className="left-0 w-full px-6 md:px-10 py-6 flex justify-between items-center text-white fixed top-0 z-50 backdrop-blur-md ">
            <div className="text-2xl font-bold">CredoPay</div>

            {/* Desktop Nav Links */}
            <div className="flex gap-8">
                <div className="hidden md:flex gap-8 text-sm items-center">
                    <a href="#">Products</a>
                    <a href="#">Company</a>
                    <a href="#">Support</a>
                </div>

                {/* Login/Signup — always visible */}
                <div className="flex gap-3 text-sm items-center">
                    <Link to="/signin">
                        <button className="border border-white px-4 py-1.5 rounded">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-white text-black px-4 py-1.5 rounded font-semibold ">SignUp</button>
                    </Link>
                </div>
            </div>

        </nav>
    )
}
