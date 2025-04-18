import { useState, useEffect } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import './index.css';
import dumb from './imagenes/dumb.jpg';
import Modal from './Recurso/modal.jsx';
import 'swiper/swiper-bundle.css';

function App() {
  // Estado para almacenar las misiones
  const [date, setDate] = useState(null);

  // Obtiene las misiones desde el backend
  useEffect(() => {
    fetch("https://localhost:7255/api/Misiones")
      .then((response) => response.json())
      .then((date) => setDate(date));
  }, []);
// Estado para almacenar los astronautas
  const [data, setData] = useState(null);
    // Obtiene los astronautas desde el backend
  useEffect(() => {
    fetch("https://localhost:7255/api/astronautas")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  // Estados para controlar modales, filtros y edición
  const [openModals, setOpenModals] = useState({});
  const [filterNacionalidad, setFilterNacionalidad] = useState(null);
  const [filterEstado, setFilterEstado] = useState(null);
  const [editAstronauta, setEditAstronauta] = useState(null);
 // Maneja el cambio de filtro por nacionalida
  const handleNacionalidadChange = (event) => {
    setFilterNacionalidad(event.target.value);
  };
 // Maneja el cambio de filtro por estado
  const handleEstadoChange = (event) => {
    setFilterEstado(event.target.value);
  };

  const filteredData = data?.filter((astronauta) => {
    const nacionalidadMatch = !filterNacionalidad || astronauta.nacionalidad.toLowerCase().includes(filterNacionalidad.toLowerCase());
    const estadoMatch = !filterEstado || astronauta.estado.toLowerCase().includes(filterEstado.toLowerCase());
    return nacionalidadMatch && estadoMatch;
  });
// Alterna la visibilidad de un modal específico
  const toggleModal = (astronautaId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [astronautaId]: !prevModals[astronautaId],
    }));
  };
// Abre el formulario para editar un astronauta
  const handleEdit = (astronauta) => {
    setEditAstronauta({ ...astronauta });
  };
// Guarda los cambios realizados a un astronauta
  const handleSaveEdit = () => {
    fetch("https://localhost:7255/api/astronautas/Actualizar", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editAstronauta),
    })
      .then(response => response.json())
      .then(data => {
        if (data.mensaje === "Astronauta actualizado correctamente") {
          setData(prevData => prevData.map(a => a.id_n === editAstronauta.id_n ? editAstronauta : a));
          setEditAstronauta(null); // Cerrar el modal
        } else {
          alert("Error al actualizar astronauta");
        }
      })
      .catch(error => console.error("Error:", error));
  };
// Elimina un astronauta del sistema
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este astronauta?")) {
      fetch(`https://localhost:7255/api/astronautas/Eliminar/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          if (data.mensaje === "Astronauta eliminado correctamente") {
            setData(prevData => prevData.filter((astronauta) => astronauta.id_n !== id));
          } else {
            alert("Error al eliminar astronauta");
          }
        })
        .catch(error => console.error("Error:", error));
    }
  };

  return (
    <>
    {/* Encabezado con navegación */}
      <header>
        <nav>
          <a href='#'> Inicio</a>
          <a href='#'> Sobre mi</a>
          <a href='#'> Redes sociales </a>
          <a href='#'> Servicios</a>
        </nav>
      </header>
        {/* Imagen principal */}
      <div className="encabezado-img">
        <h2>Nasa</h2>
        <h2>Astronautas</h2>
        <p>Viendo las maravillas del espacio</p>
      </div>
       {/* Contenedor principal con el carrusel */}
      <div className="container">
        <div className='cartel'>
          <hr />
        </div>
        <div className="swiper_mySwiper">
          <div className="swiper-wrapper">
             {/* Muestra los astronautas filtrados */}
            {filteredData?.map((astronauta) => (
              <div className="swiper-slide" key={astronauta.id_n}>
                <div className='product-content'>
                  <div className='product-txt'>
                    <h3>{astronauta.nombre}</h3>
                    <div className='product-img'>
                      <img src={dumb} alt="" />
                    </div>
                    <p>{astronauta.descripcion}</p>
                  </div>
                  <ul>
                    <li><h6>Nacionalidad: {astronauta.nacionalidad}</h6></li>
                    <li><h6>Fecha de nacimiento: {astronauta.fecha_nacimiento}</h6></li>
                    <li><h6>Edad: {astronauta.edad}</h6></li>
                    <li><h6>Redes sociales: {astronauta.redes_sociales}</h6></li>
                    <li><h6>Estado: {astronauta.estado}</h6></li>
                  </ul>
                </div>
                <button className='btn-1' onClick={() => toggleModal(astronauta.id_n)}>Más</button>
                <button className='btn-1' onClick={() => handleEdit(astronauta)}>Editar</button>
                 {/* Modal con detalles de misiones */}
                <Modal isOpen={openModals[astronauta.id_n]} onClose={() => toggleModal(astronauta.id_n)}>
                  {date ? (
                    <div>
                      {date.filter((Misiones) => Misiones.id_n === astronauta.id_n).map((Misiones) => (
                        <p key={Misiones.id_misiones}>
                          <strong>Nombre:</strong> {Misiones.nombre} | <strong>Objetivo:</strong> {Misiones.objetivo}
                          <br />
                          <hr />
                          <strong>Fecha de iniciada:</strong> {Misiones.fecha_iniciada}
                          <br />
                          <strong>Fecha de Finalizada:</strong> {Misiones.fecha_terminada}
                        </p>
                      ))}
                      <button onClick={() => handleDelete(astronauta.id_n)}>Eliminar</button>
                    </div>
                  ) : (
                    <p>Cargando datos...</p>
                  )}
                </Modal>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {editAstronauta && (
        <div className="react-modal-overlay">
          <div className="react-modal-wrapper">
            <div className="react-modal-content">
              <h2>Editar Astronauta</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                <label>
                  Nombre:
                  <input 
                    type="text" 
                    value={editAstronauta.nombre} 
                    onChange={(e) => setEditAstronauta({ ...editAstronauta, nombre: e.target.value })}
                  />
                </label>
                <label>
                  Nacionalidad:
                  <input 
                    type="text" 
                    value={editAstronauta.nacionalidad} 
                    onChange={(e) => setEditAstronauta({ ...editAstronauta, nacionalidad: e.target.value })}
                  />
                </label>
                <label>
                  Descripción:
                  <textarea 
                    value={editAstronauta.descripcion} 
                    onChange={(e) => setEditAstronauta({ ...editAstronauta, descripcion: e.target.value })}
                  />
                </label>
                <label>
                  Fecha de Nacimiento:
                  <input 
                    type="date" 
                    value={editAstronauta.fecha_nacimiento} 
                    onChange={(e) => setEditAstronauta({ ...editAstronauta, fecha_nacimiento: e.target.value })}
                  />
                </label>
                <label>
                  Edad:
                  <input 
                    type="number" 
                    value={editAstronauta.edad} 
                    onChange={(e) => setEditAstronauta({ ...editAstronauta, edad: e.target.value })}
                  />
                </label>
                <label>
                  Redes Sociales:
                  <input 
                    type="text" 
                    value={editAstronauta.redes_sociales} 
                    onChange={(e) => setEditAstronauta({ ...editAstronauta, redes_sociales: e.target.value })}
                  />
                </label>
                <label>
                  Estado:
                  <input 
                    type="text" 
                    value={editAstronauta.estado} 
                    onChange={(e) => setEditAstronauta({ ...editAstronauta, estado: e.target.value })}
                  />
                </label>
                <button type="submit">Guardar cambios</button>
                <button type="button" onClick={() => setEditAstronauta(null)}>Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
