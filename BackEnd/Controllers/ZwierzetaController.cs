using System;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Dane;
using BackEnd.Dodatki;
using BackEnd.Podmioty;
using BackEnd.Zapytania;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    
    public class ZwierzetaController : BazaController
    {
        private readonly PrzechowajDane _dane;
        public ZwierzetaController(PrzechowajDane dane)
        {
            _dane = dane;
        }

        [HttpGet]
        public async Task<ActionResult<PagList<Zwierze>>> GetZwierzeta([FromQuery]ZwierzeParametry zwierzeParametry)
        {
            var query = _dane.Zwierzeta
                .Sortuj(zwierzeParametry.Sortuj)
                .Szukaj(zwierzeParametry.Szukaj)
                .Filtruj(zwierzeParametry.Typy, zwierzeParametry.Lokalizacja)
                .AsQueryable();

            var zwierzeta = await PagList<Zwierze>.ToPagedList(query, 
                zwierzeParametry.NumerStrony, zwierzeParametry.WielkoscStrony);

            Response.DodaJNaglowek(zwierzeta.MetaDane);

            return zwierzeta;
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Zwierze>> GetZwierze(int id)
        {
            var zwierze = await _dane.Zwierzeta.FindAsync(id);
            if(zwierze==null) return NotFound();
            return zwierze;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var typy = await _dane.Zwierzeta.Select(p => p.Typ).Distinct().ToListAsync();
            var lokalizacja = await _dane.Zwierzeta.Select(p => p.Lokalizacja).Distinct().ToListAsync();

            return Ok(new {typy, lokalizacja});
        }
    }
}