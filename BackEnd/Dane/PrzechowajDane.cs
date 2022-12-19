using BackEnd.Podmioty;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Dane
{
    public class PrzechowajDane : DbContext
    {
        public PrzechowajDane(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Zwierze> Zwierzeta{ get; set; }

        public DbSet<Koszyk> Koszyki { get; set; }
    }
}