import { GiStabbedNote } from 'react-icons/gi';
import { IoCardOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, {useState } from "react";
import { HiOutlineTruck } from "react-icons/hi";
import "./theservices.css";
const TheServices = () => {
    return (
        <div className="bg-[#F1D8F4] px-8 py-4 lg:py-4">
            <div className="container mx-auto">
                <h2 className="text-3xl lg:text-4xl text-[#9F5D23] font-semibold pt-8 mb-8">Descubrí nuestros servicios</h2>
                <p className="text-lg text-[#9F5D23] mb-2">¡Bienvenido a LennitaBB! Acá te explicamos como trabajamos y qué servicios ofrecemos para que disfrutes al máximo de nuestros amigurumis personalizados.</p>

                <div className="service-card  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard
                        icon={<IoCardOutline className="text-[#F1D8F4] text-4xl" />}
                        title="Método de pago seguro"
                        description="En LennitaBB, te ofrecemos un método de pago seguro para todas tus compras. Aceptamos todas las principales tarjetas de crédito y débito, así como MercadoPago y transferencias bancarias."
                    />
                    <ServiceCard
                        icon={<HiOutlineTruck className="text-[#F1D8F4] text-4xl" />}
                        title="Envío rápido y confiable"
                        description="Garantizamos un envío rápido y confiable para que recibas tus amigurumis personalizados en perfectas condiciones y en el menor tiempo posible. Trabajamos con los mejores servicios de mensajería para tu tranquilidad."
                    />
                    <ServiceCard
                        icon={<GiStabbedNote className="text-[#F1D8F4] text-4xl" />}
                        title="Amigurumis personalizados"
                        description="En LennitaBB, nos especializamos en la creación de amigurumis personalizados según tus gustos y preferencias. ¡Cuéntanos tu idea y nosotros la convertiremos en un adorable muñeco de ganchillo!"
                    />
                </div>
            </div>
        </div>
    );
};

const ServiceCard = ({ icon, title, description }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5 // Cambia este valor según tus necesidades
    });
    const [isVisible, setIsVisible] = useState(false);

    return (

        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="overview-container w-full bg-[#F1D8F4] py-12 md:py-12 text-center text-[#9F5D23]"
            style={{ animationRange: "entry 25% cover 30%" }} // Aplica animation-range directamente en el estilo
        > <div className="bg-[#C87A34] text-[#F1D8F4] px-8 py-12 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-6 ">
                    {icon}
                </div>
                <h3 className="text-xl lg:text-2xl text-[#F1D8F4] font-bold mb-3">{title}</h3>
                <p className="text-[#F1D8F4]">{description}</p>
            </div></motion.div>

    );
};

export default TheServices;
