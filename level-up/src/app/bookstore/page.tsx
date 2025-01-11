'use client'

import React, { useState } from "react";

const Bookstore: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  const books = [
    {
      img: "91ccGUt2sbL._AC_UF1000,1000_QL80_.jpg",
      title: "Concepts of Physics Vol. 1",
      author: "H.C. Verma",
      price: "20 gamecoins",
    },
    {
      img: "concept-of-physics-vol-2-by-h-c-verma-original-imagazbj2fshymee.webp",
      title: "Concepts of Physics Vol. 2",
      author: "H.C. Verma",
      price: "20 gamecoins",
    },
    {
      img: "ansic.jpg",
      title: "ANSI C",
      author: "E. Balaguruswamy",
      price: "20 gamecoins",
    },
    {
      img: "irodov.jpg",
      title: "Problems in General Physics",
      author: "I.E. Irodov",
      price: "20 gamecoins",
    },
    {
      img: "percy.jpg",
      title: "Percy Jackson and the Lightning Thief",
      author: "Rick Riordan",
      price: "20 gamecoins",
    },
    {
      img: "hp.jpg",
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      price: "20 gamecoins",
    },
    {
      img: "wimpykid.jpg",
      title: "Diary of a Wimpy Kid",
      author: "Jeff Kinney",
      price: "20 gamecoins",
    },
    {
      img: "richdad.jpg",
      title: "Rich Dad Poor Dad",
      author: "Robert Kiosaki",
      price: "20 gamecoins",
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-center text-3xl font-bold mb-8">
          REDEEM YOUR GAMECOINS FOR EXCITING BOOKS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              <p className="text-sm text-gray-400 mb-2">by {book.author}</p>
              <p className="text-green-400 font-bold mb-4">{book.price}</p>
              <button
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-500"
                onClick={handleShowPopup}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-gray-800 text-gray-100 border border-pink-600 rounded-lg p-6 shadow-lg text-center">
            <p className="mb-4">You spent 20 gamecoins!</p>
            <button
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-500"
              onClick={handleHidePopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookstore;
