using System;
using System.Collections.Generic;
using System.Linq;
using BackEnd.Podmioty;
using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace BackEnd.Dane
{
    public static class DodajDoBazy
    {
        public static void Wywolaj(PrzechowajDane context)
        {
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
                    Plec = Gender.Samica,
                    ZdjecieUrl = "/images/zwierzeta/owca_bialoglowa.png",
                    Gatunek = "Białogłowa",
                    Typ = "Owce",
                    Lokalizacja = "Wrocław",
                    Zarezerwowane = false
                },
                new Zwierze
                {
                    Nazwa = "Owca Białogłowa zadbana",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 3000,
                    Wiek = 3,
                    Waga = 3370,
                    Plec = Gender.Samiec,
                    ZdjecieUrl = "/images/zwierzeta/owca_bialoglowa2.png",
                    Gatunek = "Białogłowa",
                    Typ = "Owce",
                    Lokalizacja = "Warszawa",
                    Zarezerwowane = false
                },
                new Zwierze
                {
                    Nazwa = "Owca Corriedale zadbana",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 7000,
                    Wiek = 1,
                    Waga = 2370,
                    Plec = Gender.Samiec,
                    ZdjecieUrl = "/images/zwierzeta/owca_corriedale.png",
                    Gatunek = "Corriedale",
                    Typ = "Owce",
                    Lokalizacja = "Katowice",
                    Zarezerwowane = false
                },
                new Zwierze
                {
                    Nazwa = "Krowa 150kg",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 17500,
                    Wiek = 4,
                    Waga = 15400,
                    Plec = Gender.Samica,
                    ZdjecieUrl = "/images/zwierzeta/krowa_miesna1.png",
                    Gatunek = "Mięsna",
                    Typ = "Krowa",
                    Lokalizacja = "Gliwice",
                    Zarezerwowane = false
                },
                new Zwierze
                {
                    Nazwa = "Byk",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 45000,
                    Wiek = 6,
                    Waga = 11370,
                    Plec = Gender.Samiec,
                    ZdjecieUrl = "/images/zwierzeta/krowa_miesna2.png",
                    Gatunek = "Mięsna",
                    Typ = "Krowa",
                    Lokalizacja = "Katowice",
                    Zarezerwowane = false
                },
                new Zwierze
                {
                    Nazwa = "Cielaczek",
                    Opis =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Cena = 250000,
                    Wiek = 1,
                    Waga = 4370,
                    Plec = Gender.Samiec,
                    ZdjecieUrl = "/images/zwierzeta/krowa_mieszana1.png",
                    Gatunek = "Mieszana",
                    Typ = "Krowa",
                    Lokalizacja = "Wrocław",
                    Zarezerwowane = true
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