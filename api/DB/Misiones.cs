using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class Misiones

    {
       
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? id_mision { get; set; }
        public string? nombre { get; set; }
        public string? objetivo { get; set; }
        [DataType(DataType.Date)]
        public DateTime? fecha_iniciada { get; set; }
        [DataType(DataType.Date)]
        public DateTime? fecha_terminada { get; set; }
        public int id_n { get; set; }
        [ForeignKey("id_n")]
        public virtual astronautas? Astronauta { get; set; }

    }
}
