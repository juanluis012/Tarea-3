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
    }
}

