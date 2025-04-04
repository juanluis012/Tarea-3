import React, { useState } from 'react';
import { useSpring, animated, useTransition } from "@react-spring/web";
import './Modal.css';

const SecondModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        fecha_nacimiento: '',
        edad: '',
        redes_sociales: '',
        nacionalidad: '',
        estado: '',
    });

    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
        config: {
            duration: 300
        }
    });

    const springs = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 300
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch('https://localhost:7255/api/astronautas/Guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Datos guardados exitosamente');
                onClose(); // Cerrar el modal después de guardar
            } else {
                console.error('Error al guardar los datos');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    return modalTransition((styles, isOpen) => (
        isOpen && (
            <animated.div style={styles} className="react-modal-overlay2" onClick={onClose}>
                <animated.div style={springs} className="react-modal-wrapper" onClick={(e) => e.stopPropagation()}>
                    <div className="react-modal-content2">
                        <h2>Añadir Astronauta</h2>
                        <form className="astronaut-form">
                            <label>
                                Nombre:
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                            </label>
                            <label>
                                Descripción:
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                            </label>
                            <label>
                                Fecha de Nacimiento:
                                <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} />
                            </label>
                            <label>
                                Edad:
                                <input type="text" name="edad" value={formData.edad} onChange={handleInputChange} />
                            </label>
                            <label>
                                Redes Sociales:
                                <input type="text" name="redes_sociales" value={formData.redes_sociales} onChange={handleInputChange} />
                            </label>
                            <label>
                                Nacionalidad:
                                <input type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleInputChange} />
                            </label>
                            <label>
                                Estado (Vivo/Muerto):
                                <input type="text" name="estado" value={formData.estado} onChange={handleInputChange} />
                            </label>
                            <button type="button" onClick={handleSave}>
                                Guardar
                            </button>
                        </form>
                        <button className="btn-2" type="button" onClick={onClose}>
                            Cerrar Segunda Modal
                        </button>
                    </div>
                </animated.div>
            </animated.div>
        )
    ));
};


const Modal = ({ isOpen, onClose, children }) => {
    const [secondModalOpen, setSecondModalOpen] = useState(false);

    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
        config: {
            duration: 300
        }
    });

    const springs = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 300
        }
    });

    const openSecondModal = () => {
        setSecondModalOpen(true);
    };

    const closeSecondModal = () => {
        setSecondModalOpen(false);
    };

    return modalTransition((styles, isOpen) => (
        isOpen && (
            <animated.div style={styles} className="react-modal-overlay" onClick={onClose}>
                <animated.div style={springs} className="react-modal-wrapper" onClick={(e) => e.stopPropagation()}>
                    <div className="react-modal-content">
                        {children}
                        <button className="btn-2" onClick={openSecondModal}>Registar un Astronauta</button>
                        {secondModalOpen && (
                            <SecondModal isOpen={secondModalOpen} onClose={closeSecondModal} />
                        )}
                        <button className='btn-2' type="button" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </animated.div>
            </animated.div>
        )
    ));
};

export default Modal;
