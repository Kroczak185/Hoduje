using System.Collections.Generic;
using System.Linq;
using BackEnd.Podmioty;

namespace BackEnd.Dodatki
{
    public static class ZwierzeDodatek
    {
        public static IQueryable<Zwierze> Sortuj(this IQueryable<Zwierze> zapytanie, string filtruj)
        {
            if (string.IsNullOrEmpty(filtruj)) return zapytanie.OrderBy(p => p.Nazwa); 

            zapytanie = filtruj switch
            {
                "cena" => zapytanie.OrderBy(p => p.Cena),
                "cenaMalejaco" => zapytanie.OrderByDescending(p => p.Cena),
                _ => zapytanie.OrderBy(p => p.Nazwa)
            };

            return zapytanie;
        }

        public static IQueryable<Zwierze> Szukaj(this IQueryable<Zwierze> zapytanie, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return zapytanie;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return zapytanie.Where(p => p.Nazwa.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Zwierze> Filtruj(this IQueryable<Zwierze> zapytanie, string typ, string lokalizacja)
        {
            var typLista = new List<string>();
            var lokalizacjaLista = new List<string>();

            if (!string.IsNullOrEmpty(typ))
                typLista.AddRange(typ.ToLower().Split(",").ToList());

            if (!string.IsNullOrEmpty(lokalizacja))
                lokalizacjaLista.AddRange(lokalizacja.ToLower().Split(",").ToList());

            zapytanie = zapytanie.Where(p => typLista.Count == 0 || typLista.Contains(p.Typ.ToLower()));
            zapytanie = zapytanie.Where(p => lokalizacjaLista.Count == 0 || lokalizacjaLista.Contains(p.Lokalizacja.ToLower()));

            return zapytanie;
        }
    }
}