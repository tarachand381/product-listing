import { useContext, useState } from 'react';
import { MainContext } from '../Context';

const Card = () => {
    const { Card, RemovetoCard } = useContext(MainContext)
    

    return (
        Card.map((item, i) => {
            return (
                <div className="flex max-w-[700px] mx-auto mt-4 items-center justify-between p-4 border-b border-gray-200">
                    {/* Product Image */}
                    <img
                        src={item.thumbnail}
                        alt='img'
                        className="w-20 h-20 object-cover rounded-lg"
                    />

                    {/* Product Details */}
                    <div className="flex flex-col ml-4 w-2/3">
                        <span className="text-lg font-semibold">{item.title}</span>
                        {/* Price */}
                        <span className="font-semibold text-lg">${item.price}</span>
                        <div className="flex items-center mt-2 space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                                <button

                                    className="bg-gray-300 px-2 py-1 rounded-full text-gray-700"
                                >
                                    -
                                </button>
                                <span className="text-lg">{item.qty}</span>
                                <button

                                    className="bg-gray-300 px-2 py-1 rounded-full text-gray-700"
                                >
                                    +
                                </button>
                            </div>


                        </div>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => RemovetoCard(item.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                    >
                        Remove
                    </button>
                </div>
            )
        })
    );
};

export default Card;
