import React from 'react';

const Footer = () => {
    return (
        <div className='bottom-0 left-0 w-full'>
            <div className='flex justify-center items-center text-center h-20 bg-[#C87A34] text-[#f4d4f8] md:tracking-widest leading-tight font-semibold'>
                <h4>
                    &copy; {new Date().getFullYear()}
                    <span className='text-[#f19ffa]'> LennitaBB </span>
                </h4>
                <h4 className='ml-3'>Todos los derechos reservados.</h4>
            </div>
        </div>
    );
};

export default Footer;