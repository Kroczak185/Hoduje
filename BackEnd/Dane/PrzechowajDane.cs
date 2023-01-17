using BackEnd.Podmioty;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Dane
{
    public class PrzechowajDane : IdentityDbContext<Uzytkownik>
    {
        public PrzechowajDane(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Zwierze> Zwierzeta{ get; set; }

        public DbSet<Koszyk> Koszyki { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}