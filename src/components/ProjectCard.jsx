import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  image,
  images = [],
  delay = 0,
  onImageClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md p-4 w-full sm:w-[48%] lg:w-[32%]"
    >
      {/* Image */}
      <div
        className="relative mb-4 rounded-xl overflow-hidden cursor-pointer"
        onClick={() => {
          if (images.length > 0 && onImageClick) {
            onImageClick(images, 0); // เปิดภาพแรก
          }
        }}
      >
        <img
          src={images[0] || image}
          alt={title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-2 line-clamp-3">{description}</p>

      {/* Tech */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, i) => (
          <span
            key={i}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>

      {/* GitHub Link */}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:underline text-sm"
        >
          <Github className="w-4 h-4 mr-1" />
          Source Code
        </a>
      )}
    </motion.div>
  );
}
