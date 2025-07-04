import React from 'react'
export const Feature = ({ h4, feature, p }) => {
    return (
        <div className="bg-[#262aa9] p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
            <div className="p-2 mb-4">
                {feature}
            </div>
            <h4 className="text-xl font-semibold text-white">{h4}</h4>
            <p className="mt-4 text-white text-center">{p}</p>
        </div>
    )
}
