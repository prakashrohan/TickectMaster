import React from "react";

const LocationCard = ({ txt, imageUrl }) => {
  return (
    <div className="relative w-120 h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img src={imageUrl} alt={txt} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-lg font-bold text-white">{txt}</h3>
      </div>
    </div>
  );
};

export default LocationCard;
