using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class astronautas
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
       public int id_n { get; set; }
        public string?  nombre { get; set; }
        public string? nacionalidad { get; set; }
        public string? descripcion { get; set; }
        [DataType(DataType.Date)]
        public DateTime? fecha_nacimiento { get; set; }
        public int? edad { get; set; }

        public string? redes_sociales { get; set; }

        public string? Estado { get; set; }

    }
}
