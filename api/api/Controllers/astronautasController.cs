using DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class astronautasController : ControllerBase
    {
        private Nasacontext _context;
        public astronautasController(Nasacontext context)
        {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<astronautas> Get() => _context.Astronauta.ToList();


        [HttpPost]
        [Route("Guardar")]
        public dynamic Guardar(astronautas astronautas)
        {
            try
            {
                _context.Astronauta.Add(astronautas);
                _context.SaveChanges();

                // Devolver los datos guardados si es necesario
                return new
                {
                    Id = astronautas.id_n, // O cualquier otro identificador único que utilices
                    Nombre = astronautas.nombre,
                    Nacionalidad = astronautas.nacionalidad,
                    Descripcion = astronautas.descripcion,
                    Fecha = astronautas.fecha_nacimiento,
                    Edad = astronautas.edad,
                    Redes = astronautas.redes_sociales,
                    Estado = astronautas.Estado
                };
            }
            catch (Exception ex)
            {
                // Manejar errores, loggear, etc.
                Console.WriteLine($"Error al intentar guardar en la base de datos: {ex.Message}");
                return null; // Otra forma de manejar el error según tus necesidades
            }



        }

        [HttpPost]
        [Route("Actualizar")]
        public dynamic Actualizar(astronautas astronautas)
        {
            try
            {
                // Buscar el astronauta existente en la base de datos por su ID
                var existente = _context.Astronauta.Find(astronautas.id_n);
                if (existente == null)
                {
                    return new { mensaje = "Astronauta no encontrado" };
                }

                // Actualizar los campos del astronauta existente con los nuevos valores
                existente.nombre = astronautas.nombre;
                existente.nacionalidad = astronautas.nacionalidad;
                existente.descripcion = astronautas.descripcion;
                existente.fecha_nacimiento = astronautas.fecha_nacimiento;
                existente.edad = astronautas.edad;
                existente.redes_sociales = astronautas.redes_sociales;
                existente.Estado = astronautas.Estado;
                // Guardar los cambios en la base de datos
                _context.SaveChanges();
                // Retornar un mensaje de éxito y el astronauta actualizado
                return new
                {
                    mensaje = "Astronauta actualizado correctamente",
                    astronauta = existente
                };
            }
            catch (Exception ex)
            {
                // Capturar cualquier error y mostrarlo en la consola
                Console.WriteLine($"Error al intentar actualizar el astronauta: {ex.Message}");
                // Retornar null en caso de error
                return null;
            }
        }

        // Controlador de la API - Método para eliminar un astronauta
        [HttpDelete]
        [Route("Eliminar/{id}")]
        public dynamic Eliminar(int id)
        {
            try
            {
                // Buscar el astronauta en la base de datos por su ID
                var astronauta = _context.Astronauta.Find(id);
                // Verificar si el astronauta fue encontrado
                if (astronauta == null)
                {
                    // Retornar un mensaje si no existe
                    return new { mensaje = "Astronauta no encontrado" };
                }
                // Eliminar el astronauta encontrado
                _context.Astronauta.Remove(astronauta);
                // Guardar los cambios en la base de datos
                _context.SaveChanges();
                // Retornar un mensaje de éxito
                return new { mensaje = "Astronauta eliminado correctamente" };
            }
            catch (Exception ex)
            {// Capturar cualquier error y mostrarlo en la consola
                Console.WriteLine($"Error al intentar eliminar el astronauta: {ex.Message}");
                // Retornar null en caso de error
                return null;
            }
        }
    }
}

