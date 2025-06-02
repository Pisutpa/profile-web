function ModalViewer({ images, index, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(index);

  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((currentIndex + 1) % images.length);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
      <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>✕</button>
      <button className="absolute left-4 text-white text-3xl" onClick={prev}>‹</button>
      <img
        src={images[currentIndex]}
        alt=""
        className="max-w-[90%] max-h-[90%] object-contain cursor-grab active:cursor-grabbing"
        style={{ transition: "transform 0.3s" }}
        draggable
      />
      <button className="absolute right-4 text-white text-3xl" onClick={next}>›</button>
    </div>
  );
}
