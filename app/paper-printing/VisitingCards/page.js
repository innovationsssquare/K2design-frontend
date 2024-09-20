import React from 'react';

const BusinessCardPage = () => {
  return (
    <div className="flex justify-center items-start py-10 px-5">
      {/* Left Side: Galleria */}
      <div className="w-1/2">
        <div className="border rounded-md p-5">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Business Card Preview"
            className="w-full h-auto object-cover rounded-md mb-4"
          />
          {/* Thumbnail Gallery */}
          <div className="flex space-x-4">
            <img
              src="https://via.placeholder.com/100x100"
              alt="Thumbnail 1"
              className="w-24 h-24 object-cover border rounded-md"
            />
            <img
              src="https://via.placeholder.com/100x100"
              alt="Thumbnail 2"
              className="w-24 h-24 object-cover border rounded-md"
            />
            <img
              src="https://via.placeholder.com/100x100"
              alt="Thumbnail 3"
              className="w-24 h-24 object-cover border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Right Side: Details and Dropdowns */}
      <div className="w-1/2 px-10">
        <h1 className="text-2xl font-bold mb-4">Standard Business Card</h1>
        <p className="mb-4">
          Make a lasting impression with our Standard Business Cards, designed to communicate your professional identity effectively.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Size: 3.5 x 2 inches</li>
          <li>2 different paper materials available</li>
          <li>Available Lamination Options: Matte or Glossy</li>
          <li>Order from as low as 100 units</li>
          <li>Same-day delivery for orders before 3 PM</li>
        </ul>
        <p className="text-red-500 mb-4">
          We do not accept designs that belong to or represent government or government-affiliated organizations.
        </p>

        {/* Dropdowns for Options */}
        <div className="mb-4">
          <label htmlFor="material" className="block mb-2 font-semibold">
            Materials
          </label>
          <select
            id="material"
            className="w-full border p-2 rounded-md"
          >
            <option>Lykam Matte Coated Paper</option>
            <option>Lykam Glass Coated Paper</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="lamination" className="block mb-2 font-semibold">
            Lamination
          </label>
          <select
            id="lamination"
            className="w-full border p-2 rounded-md"
          >
            <option>Matte Lamination</option>
            <option>Glossy Lamination</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="orientation" className="block mb-2 font-semibold">
            Orientation
          </label>
          <select
            id="orientation"
            className="w-full border p-2 rounded-md"
          >
            <option>Landscape</option>
            <option>Portrait</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="printing-location" className="block mb-2 font-semibold">
            Printing Location
          </label>
          <select
            id="printing-location"
            className="w-full border p-2 rounded-md"
          >
            <option>Front</option>
            <option>Back</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2 font-semibold">
            Quantity
          </label>
          <select
            id="quantity"
            className="w-full border p-2 rounded-md"
          >
            <option>100</option>
            <option>200</option>
            <option>300</option>
            <option>500</option>
          </select>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">₹739.86 inclusive of all taxes</p>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md">
            Upload your Files
          </button>
        </div>

        <button className="bg-purple-600 text-white w-full py-3 rounded-md">
          Create your Design
        </button>
      </div>
    </div>
  );
};

export default BusinessCardPage;
