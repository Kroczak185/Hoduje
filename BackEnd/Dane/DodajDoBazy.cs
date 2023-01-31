using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Podmioty;
using Microsoft.AspNetCore.Components.Web.Virtualization;
using Microsoft.AspNetCore.Identity;

namespace BackEnd.Dane
{
    public static class DodajDoBazy
    {
        public static async Task Wywolaj(PrzechowajDane context,UserManager<Uzytkownik> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new Uzytkownik
                {
                    UserName = "kowalski",
                    Email = "kowalski@test.pl"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new Uzytkownik
                {
                    UserName = "admin",
                    Email = "admin@test.pl"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
            }

            if(context.Zwierzeta.Any()) return;
            
            var zwierzeta = new List<Zwierze>{
                new Zwierze
                {
                    Nazwa = "Owca Białogłowa 2-letnia",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 2000,
                    Wiek = 2,
                    Waga = 4130,
                    ZdjecieUrl = "/images/zwierzeta/owca_bialoglowa.png",
                    Gatunek = "Białogłowa",
                    Typ = "Owce",
                    Lokalizacja = "Wrocław",
                    Zarezerwowane = false,
                    Email = "kowalski1@test.pl"
                },
                new Zwierze
                {
                    Nazwa = "Owca Białogłowa zadbana",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 3000,
                    Wiek = 3,
                    Waga = 3370,
                    ZdjecieUrl = "/images/zwierzeta/owca_bialoglowa2.png",
                    Gatunek = "Białogłowa",
                    Typ = "Owce",
                    Lokalizacja = "Warszawa",
                    Zarezerwowane = false,
                    Email = "kowalski2@test.pl"
                },
                new Zwierze
                {
                    Nazwa = "Owca Corriedale",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 7000,
                    Wiek = 1,
                    Waga = 2370,
                    ZdjecieUrl = "/images/zwierzeta/owca_corriedale.png",
                    Gatunek = "Corriedale",
                    Typ = "Owce",
                    Lokalizacja = "Katowice",
                    Zarezerwowane = false,
                    Email = "kowalski3@test.pl"
                },
                new Zwierze
                {
                    Nazwa = "Krowa wysokocielna",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 17500,
                    Wiek = 4,
                    Waga = 15400,
                    ZdjecieUrl = "/images/zwierzeta/krowa_miesna1.png",
                    Gatunek = "Mięsna",
                    Typ = "Krowy",
                    Lokalizacja = "Gliwice",
                    Zarezerwowane = false,
                    Email = "kowalski4@test.pl"
                },
                new Zwierze
                {
                    Nazwa = "Duża krowa",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 45000,
                    Wiek = 6,
                    Waga = 11370,
                    ZdjecieUrl = "https://static.topagrar.pl/media/articles/cow-min.png",
                    Gatunek = "Mięsna",
                    Typ = "Krowy",
                    Lokalizacja = "Katowice",
                    Zarezerwowane = true,
                    Email = "kowalski5@test.pl"
                },
                new Zwierze
                {
                    Nazwa = "Ciele",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 250000,
                    Wiek = 1,
                    Waga = 4370,
                    ZdjecieUrl = "/images/zwierzeta/krowa_mieszana1.png",
                    Gatunek = "Mieszana",
                    Typ = "Krowy",
                    Lokalizacja = "Wrocław",
                    Zarezerwowane = true,
                    Email = "kowalski6@test.pl"
                },
                new Zwierze
                {
                    Nazwa = "Sprzedam krowę mleczną",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 25000,
                    Wiek = 2,
                    Waga = 4220,
                    ZdjecieUrl = "/images/zwierzeta/krowa_mieszana1.png",
                    Gatunek = "Mieszana",
                    Typ = "Krowy",
                    Lokalizacja = "Katowice",
                    Zarezerwowane = false,
                    Email = "kowalski7@test.pl"
                },
                new Zwierze
                {
                    Nazwa = "Krowa wysoko cielna 5 lat",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 4500,
                    Wiek = 5,
                    Waga = 11170,
                    ZdjecieUrl = "/images/zwierzeta/krowa_miesna2.png",
                    Gatunek = "Mieszana",
                    Typ = "Krowy",
                    Lokalizacja = "Jawor",
                    Zarezerwowane = false,
                    Email = "kowalski8@test.pl"
                },
            };
            foreach (var zwierze in zwierzeta)
            {
                context.Zwierzeta.Add(zwierze);
            }

            context.SaveChanges();
        }
    }
}