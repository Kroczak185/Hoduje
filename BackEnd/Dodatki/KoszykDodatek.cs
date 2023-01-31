using System.Linq;
using BackEnd.DTOs;
using BackEnd.Podmioty;

namespace BackEnd.Dodatki
{
    public static class KoszykDodatek
    {
        public static KoszykDto MapKoszykDoDto(this Koszyk koszyk)
        {
            return new KoszykDto
            {
                Id = koszyk.Id,
                KupiecId = koszyk.KupiecId,
                Przedmioty = koszyk.Przedmioty.Select(item => new KoszykItemDto
                {
                    ZwierzeId = item.ZwierzeId,
                    Nazwa = item.Zwierze.Nazwa,
                    Cena = item.Zwierze.Cena,
                    ZdjecieUrl = item.Zwierze.ZdjecieUrl,
                    Typ = item.Zwierze.Typ,
                    Gatunek = item.Zwierze.Gatunek,
                    Lokalizacja = item.Zwierze.Lokalizacja,
                    Zarezerwowane = item.Zwierze.Zarezerwowane,
                    Email = item.Zwierze.Email
                }).ToList()
            };
        }
    }
}