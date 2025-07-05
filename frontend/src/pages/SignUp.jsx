import React from 'react'
import { SignUpForm } from '../components/signup-form'
import { Link } from 'react-router'
export const SignUp = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center p-6 md:p-10 bg-[#0a0f3c]">
            <div className="absolute w-[700px] h-[700px] bg-blue-600 rounded-full blur-[150px] opacity-30 top-10 left-20 z-0"></div>
            <Link to="/"><h1 className="absolute top-10 left-10 text-4xl text-white">CredoPay</h1></Link>
            <div className="w-full max-w-sm">
                <SignUpForm />
            </div>
        </div>
    )
}
