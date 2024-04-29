import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import conejita1 from "../../assets/conejimarron.png";
import conejita2 from "../../assets/coneji-removebg-preview.png";
import conejita3 from "../../assets/osito-removebg-preview (2).png";
import Elemento1 from "../../assets/LennitaPortada/RosaPastel.png";
import Elemento2 from "../../assets/LennitaPortada/ElementoPastel4.png";
import Elemento3 from "../../assets/LennitaPortada/ElementoPastel3.png";
import Elemento4 from "../../assets/LennitaPortada/ElementoPastel2.png";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(conejita1);
  const controls = useAnimation();
  const [dots, setDots] = useState([]);
  const [showElements, setShowElements] = useState(false); // Estado para controlar la aparición de todos los elementos
  const [showText, setShowText] = useState(false); // Estado para controlar la aparición del texto "Lennita BB"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        switch (prevImage) {
          case conejita1:
            return conejita2;
          case conejita2:
            return conejita3;
          case conejita3:
            return conejita1;
          default:
            return conejita1;
        }
      });
    }, 8000); // Cambiar cada 8 segundos

    controls.set({ scale: 50, transition: { duration: 8, ease: "easeInOut" } });

    const stopAnimation = async () => {
      await controls.start({ scale: 1 });
      controls.start({
        scale: 50,
        transition: { duration: 8, ease: "easeInOut" },
      });
    };

    stopAnimation();

    // Generar lunares aleatorios
    const generateDots = () => {
      const newDots = [];
      for (let i = 0; i < 10; i++) { // Reducir la cantidad de puntos
        newDots.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 50 + 20, // Tamaño aleatorio entre 20 y 70
          opacity: Math.random(), // Opacidad aleatoria
          delay: Math.random() * 5, // Retardo aleatorio para la animación
          shouldPulse: Math.random() < 0.2, // 20% de posibilidad de que el lunar pulse
        });
      }
      setDots(newDots);
    };

    generateDots();

    // Mostrar todos los elementos después de un retraso
    const showElementsAfterDelay = setTimeout(() => {
      setShowElements(true);
    }, 2000); // Mostrar después de 2 segundos

    // Mostrar texto "Lennita BB" letra por letra después de un retraso
    const showTextAfterDelay = setTimeout(() => {
      setShowText(true);
    }, 1000); // Mostrar después de 1 segundo

    return () => {
      clearInterval(interval);
      clearTimeout(showElementsAfterDelay);
      clearTimeout(showTextAfterDelay);
    };
  }, []);

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#9F5D23" }}
    >
      {/* Elementos */}
      {showElements && (
        <>
          {/* Elemento1: Imagen en la esquina superior izquierda */}
          <motion.img
            src={Elemento1}
            alt="Elemento1"
            className="absolute top-0 left-0 w-32 lg:w-48 z-0"
            initial={{ opacity: 0, x: -50, y: -50 }} // Fuera de la pantalla en la esquina superior izquierda
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }} // Transición suave con retraso
          />

          {/* Elemento2: Imagen en la esquina inferior derecha */}
          <motion.img
            src={Elemento2}
            alt="Elemento2"
            className="absolute bottom-0 right-0 w-32 lg:w-48 z-0"
            initial={{ opacity: 0, x: 50, y: 50 }} // Fuera de la pantalla en la esquina inferior derecha
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1,  ease: "easeInOut" }} // Transición suave con retraso
          />

          {/* Elemento3: Imagen en la esquina superior derecha */}
          <motion.img
            src={Elemento3}
            alt="Elemento3"
            className="absolute top-0 right-0 w-32 lg:w-48 z-0"
            initial={{ opacity: 0, x: 50, y: -50 }} // Fuera de la pantalla en la esquina superior derecha
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }} // Transición suave con retraso
          />

          {/* Elemento4: Imagen en la esquina inferior izquierda */}
          <motion.img
            src={Elemento4}
            alt="Elemento4"
            className="absolute bottom-0 left-0 w-32 lg:w-48 z-0"
            initial={{ opacity: 0, x: -50, y: 50 }} // Fuera de la pantalla en la esquina inferior izquierda
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1,  ease: "easeInOut" }} // Transición suave con retraso
          />
        </>
      )}

      {/* Texto "Lennita BB" */}
      {showText && (
        <motion.div
          className="absolute top-0 left-0 w-full text-center mt-8 text-white text-6xl font-quicksand font-thin z-30"
          initial={{ opacity: 0, y: -50 }} // Fuera de la pantalla hacia arriba
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }} // Transición suave con retraso
        >
          <div className="mx-auto" style={{ width: "fit-content" }}>
            {showText && "Lennita BB".split("").map((char, index) => (
              <motion.span
                key={index}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Resto del contenido */}
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            top: dot.y,
            left: dot.x,
            backgroundColor: "#dfb2fa", // Color violeta clarito
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            opacity: dot.opacity,
            scale: dot.shouldPulse ? [1, 1.2, 1] : 1, // Si el lunar debe pulsar, se define la animación
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: dot.delay, duration: 1 + Math.random() * 2 },
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="relative min-h-screen flex items-center justify-center">
        <motion.div
          className="absolute left-0 w-full h-full bg-cover bg-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.img
          key={currentImage} // Key para forzar la remontaje de la imagen en cada cambio
          src={currentImage}
          alt="conejita"
          className="w-60 md:w-72 lg:w-80 mx-auto rounded-lg z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{
            duration: 2, // Duración de la transición
            ease: "easeInOut", // Tipo de transición
            scale: { duration: 1.5, yoyo: Infinity, ease: "easeInOut" }, // Efecto de zoom
          }}
        />
      </div>

      {/* Botón */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-12 z-20">
        <Link to="/products">
          <motion.button
            className="px-4 py-2  rounded-full font-quicksand font-thin shadow-md m-2 bg-purple-600 bg-opacity-30 text-white"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
            style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.4)" }}
          >
            Ver diseños
          </motion.button>
        </Link>
      </div>

      {/* Animación de fondo */}
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        transition={{ duration: 8, ease: "easeInOut", loop: Infinity }} // Loop de la animación
      />
    </motion.div>
  );
};

export default Hero;
