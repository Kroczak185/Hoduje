using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Zapytania
{
    public class PagList<T> : List<T>
    {
        public PagList(List<T> items, int suma, int numerStrony, int wielkoscStrony)
        {
            MetaDane = new MetaDane
            {
                Suma = suma,
                AktualnaStrona = numerStrony,
                WielkoscStrony = wielkoscStrony,
                IloscStron = (int)Math.Ceiling(suma / (double)wielkoscStrony)
            };
            AddRange(items);
        }

        public MetaDane MetaDane { get; set; }

        public static async Task<PagList<T>> ToPagedList(IQueryable<T> zapytanie, 
            int numerStrony, int wielkoscStrony)
        {
            var suma = await zapytanie.CountAsync();
            var items = await zapytanie.Skip((numerStrony-1)*wielkoscStrony).Take(wielkoscStrony).ToListAsync();
            return new PagList<T>(items, suma, numerStrony, wielkoscStrony);
        }
    }
}