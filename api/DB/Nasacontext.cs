using Microsoft.EntityFrameworkCore;

namespace DB
{
    public class Nasacontext : DbContext
    {
        public Nasacontext(DbContextOptions<Nasacontext> options) : base(options)
        {
            
        }
        public DbSet<astronautas> Astronauta { get; set; }
        public DbSet<Misiones> misiones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           modelBuilder.Entity<astronautas>().ToTable("astronautas");
            modelBuilder.Entity<Misiones>().ToTable("Misiones");
        }
    }
}
 
