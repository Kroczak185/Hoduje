using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Podmioty
{
    public enum Gender{
        Samiec,
        Samica
    }
    public class Zwierze
    {
        public int Id { get; set; }
        public string Nazwa { get; set; }
        public string Opis { get; set; }
        public long Cena { get; set; }
        public long Wiek { get; set; }
        public long Waga { get; set; }
        public Gender Plec { get; set; }
        public string ZdjecieUrl { get; set; }
        public string Typ { get; set; }
        public string Gatunek { get; set; }
        public string Lokalizacja { get; set; }
    }
}