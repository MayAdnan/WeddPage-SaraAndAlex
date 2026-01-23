using Microsoft.EntityFrameworkCore;
using Wedd_Page_SaraAndAlex.Models;

namespace Wedd_Page_SaraAndAlex.Data
{
    public class WeddingDbContext : DbContext
    {
        public WeddingDbContext(DbContextOptions<WeddingDbContext> options) : base(options)
        {
        }

        public DbSet<Rsvp> Rsvps { get; set; }
        public DbSet<WeddingInfo> WeddingInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Rsvp>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.DietaryRestrictions).HasMaxLength(500);
            });

            modelBuilder.Entity<WeddingInfo>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.BrideName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.GroomName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.VenueName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.VenueAddress).HasMaxLength(500);
                entity.Property(e => e.Description).HasMaxLength(2000);
            });
        }
    }
}

