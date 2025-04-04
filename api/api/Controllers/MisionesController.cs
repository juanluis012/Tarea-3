using DB;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MisionesController : ControllerBase
    {
       
            private Nasacontext _context;
            public MisionesController(Nasacontext context)
            {
                _context = context;
            }
            [HttpGet]
            public IEnumerable<Misiones> Get() => _context.misiones.ToList();

        
    }
}
