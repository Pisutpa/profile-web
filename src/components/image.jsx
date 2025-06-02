import React, { useState } from 'react';

const ProjectGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {/* แสดงภาพเล็กทั้งหมด */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Screenshot ${index + 1}`}
            className="rounded cursor-pointer shadow-md hover:scale-105 transition"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Modal เมื่อคลิกภาพ */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-full max-h-full rounded shadow-xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
