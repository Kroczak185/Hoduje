using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Podmioty
{
    public class Koszyk
    {
        public int Id { get; set; }
        public string KupiecId { get; set; }
        public List<KoszykPrzedmiot> Przedmioty { get; set; } = new();

        public void DodajZwierze(Zwierze zwierze)
        {
            if (Przedmioty.All(item => item.ZwierzeId != zwierze.Id))
            {
                Przedmioty.Add(new KoszykPrzedmiot{Zwierze = zwierze});
            }
        }

        public void UsunZwierze(int IdZwierze)
        {
            var item = Przedmioty.FirstOrDefault(item => item.ZwierzeId == IdZwierze);
            if (item == null) return;
            Przedmioty.Remove(item);
        }
    }
}