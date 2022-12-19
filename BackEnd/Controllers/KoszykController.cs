using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using BackEnd.Dane;
using BackEnd.DTOs;
using BackEnd.Podmioty;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class KoszykController :BazaController
    {
        private readonly PrzechowajDane _context;

        public KoszykController(PrzechowajDane context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetKoszyk")]
        public async Task<ActionResult<KoszykDto>> GetKoszyk()
        {
            var koszyk = await OdzyskajKoszyk();

            if (koszyk == null) return NotFound();

            return MapKoszykToDto(koszyk);
        }

        [HttpPost]
        public async Task<ActionResult<KoszykDto>> DodajItemDoKoszyk(int ZwierzeId)
        {
            var Koszyk = await OdzyskajKoszyk();

            if (Koszyk == null) Koszyk = UtworzKoszyk();

            var product = await _context.Zwierzeta.FindAsync(ZwierzeId);

            if (product == null) return NotFound();

            var founded = Koszyk.Przedmioty.Find(item => item.ZwierzeId == product.Id);

            if (founded!=null) 

            return BadRequest(new ProblemDetails{Title = "Obecne zwierze znajduje się już w koszyku!!!"});

            Koszyk.DodajZwierze(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetKoszyk", MapKoszykToDto(Koszyk));

            return BadRequest(new ProblemDetails{Title = "Problem z dodawaniem do Koszyka"});
        }

        [HttpDelete]
        public async Task<ActionResult> UsunKoszykItem(int ZwierzeID)
        {
            var koszyk = await OdzyskajKoszyk();

            if (koszyk == null) return NotFound();

            koszyk.UsunZwierze(ZwierzeID);

            var wynik = await _context.SaveChangesAsync() > 0;

            if (wynik) return Ok();

            return BadRequest(new ProblemDetails{Title = "Wystąpił problem z usuwaniem koszyka."});
        }

        private async Task<Koszyk> OdzyskajKoszyk()
        {
            return await _context.Koszyki
                .Include(i => i.Przedmioty)
                .ThenInclude(p => p.Zwierze)
                .FirstOrDefaultAsync(x => x.KupiecId == Request.Cookies["KupiecId"]);
        }

        private Koszyk UtworzKoszyk()
        {
            var KupiecId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("KupiecId", KupiecId, cookieOptions);
            var Koszyk = new Koszyk{KupiecId = KupiecId};
            _context.Koszyki.Add(Koszyk);
            return Koszyk;
        }

        private KoszykDto MapKoszykToDto(Koszyk Koszyk)
        {
            return new KoszykDto
            {
                Id = Koszyk.Id,
                KupiecId = Koszyk.KupiecId,
                Przedmioty = Koszyk.Przedmioty.Select(item => new KoszykItemDto
                {
                    ZwierzeId = item.ZwierzeId,
                    Nazwa = item.Zwierze.Nazwa,
                    Cena = item.Zwierze.Cena,
                    ZdjecieUrl = item.Zwierze.ZdjecieUrl,
                    Typ = item.Zwierze.Typ,
                    Gatunek = item.Zwierze.Gatunek,
                    Lokalizacja = item.Zwierze.Lokalizacja,
                    Zarezerwowane = item.Zwierze.Zarezerwowane
                    
                }).ToList()
            };
        }
    }
}