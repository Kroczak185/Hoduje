using System;
using BackEnd.Dane;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host =CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<PrzechowajDane>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try{
                context.Database.Migrate();
                DodajDoBazy.Wywolaj(context);
            }
            catch(Exception ex)
            {
                logger.LogError(ex, "Nie udało dodać do bazy");
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
