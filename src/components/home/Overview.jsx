import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import './overview.css'; // Importa el archivo CSS aquí
import { Link } from "react-router-dom";

const Overview = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollPos, setLastScrollPos] = useState(window.pageYOffset);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5 // Cambia este valor según tus necesidades
    });

    // Actualiza el estado isVisible cuando cambia inView
    useEffect(() => {
        setIsVisible(inView);
    }, [inView]);

    // Escucha los eventos de scroll para determinar la dirección
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (currentScrollPos > lastScrollPos) {
                // Hacia abajo
                document.documentElement.style.setProperty("--scroll-direction", "down");
            } else {
                // Hacia arriba
                document.documentElement.style.setProperty("--scroll-direction", "up");
            }
            setLastScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollPos]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="overview-container w-full bg-[#F1D8F4] py-20 md:py-32 text-center text-[#9F5D23]"
        >
            <div className="px-3 lg:px-0 lg:w-[55%] mx-auto">
                <h2 className="font-extrabold text-5xl capitalize mb-10 tracking-widest leading-10">Quienes somos</h2>
                <p className="text-lg tracking-widest font-normal mb-5 leading-7">¡Bienvenidos a Lennita BB! Somos un emprendimiento artesanal ubicado en Santa Clara del Mar, Argentina. Nos especializamos en la producción de adorables muñequitos de amigurumis hechos con mucho amor y dedicación. En Lennita BB, cada creación es única, diseñada para traer alegría y diversión a tu vida. Desde simpáticos animales hasta personajes fantásticos, nuestros amigurumis son el regalo perfecto para todas las ocasiones. ¡Déjanos ser parte de tus momentos especiales con nuestros encantadores muñequitos de amigurumis!</p>
            </div>
            <Link className="inline-block px-6 py-3 font-semibold tracking-wider text-[#F1D8F4] bg-[#9F5D23] uppercase mt-8 text-lg hover:bg-secondary-200 transition-all duration-300" to='/about'>
                Más sobre mi
            </Link>
        </motion.div>
    );
};

export default Overview;
