import React from 'react';
import { motion } from 'framer-motion';
import whatsAppIcon from '../assets/whatshapp3d-removebg-preview.png'; // Asegúrate de proporcionar la ruta correcta a la imagen

const WhatsAppButton = () => {
  const handleWhatsAppRedirect = () => {
    // Reemplaza "123456789" con el número de WhatsApp al que quieres redirigir
    window.open(`https://wa.me/123456789`, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }} // Escala al 110% en hover
      transition={{ duration: 0.3 }} // Transición suave de 0.3 segundos
      className="fixed bottom-4 left-6 z-10 p-3 focus:outline-none"
      onClick={handleWhatsAppRedirect}
    >
      <img src={whatsAppIcon} alt="WhatsApp" className="w-16 h-16" />
    </motion.div>
  );
};

export default WhatsAppButton;
