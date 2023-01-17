using System;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Dane;
using BackEnd.Dodatki;
using BackEnd.DTOs;
using BackEnd.Podmioty;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class KoszykController : BazaController
    {
        private readonly PrzechowajDane _context;

        public KoszykController(PrzechowajDane context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetKoszyk")]
        public async Task<ActionResult<KoszykDto>> GetKoszyk()
        {
            var koszyk = await OdzyskajKoszyk(GetKupiecId());

            if (koszyk == null) return NotFound();

            return koszyk.MapKoszykDoDto();
        }

        [HttpPost]
        public async Task<ActionResult<KoszykDto>> DodajItemDoKoszyk(int ZwierzeId)
        {
            var Koszyk = await OdzyskajKoszyk(GetKupiecId());

            if (Koszyk == null) Koszyk = UtworzKoszyk();

            var zwierze = await _context.Zwierzeta.FindAsync(ZwierzeId);

            if (zwierze == null) return BadRequest(new ProblemDetails { Title = "Produktu nie znaleziono" });

            var founded = Koszyk.Przedmioty.Find(item => item.ZwierzeId == zwierze.Id);

            if (founded != null)

                return BadRequest(new ProblemDetails { Title = "Obecne zwierze znajduje się już w koszyku!!!" });

            Koszyk.DodajZwierze(zwierze);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetKoszyk", Koszyk.MapKoszykDoDto());

            return BadRequest(new ProblemDetails { Title = "Problem z dodawaniem do Koszyka" });
        }

        [HttpDelete]
        public async Task<ActionResult> UsunKoszykItem(int ZwierzeID)
        {
            var koszyk = await OdzyskajKoszyk(GetKupiecId());

            if (koszyk == null) return NotFound();

            koszyk.UsunZwierze(ZwierzeID);

            var wynik = await _context.SaveChangesAsync() > 0;

            if (wynik) return Ok();

            return BadRequest(new ProblemDetails { Title = "Wystąpił problem z usuwaniem koszyka." });
        }

        private async Task<Koszyk> OdzyskajKoszyk(string kupiecId)
        {
            if (string.IsNullOrEmpty(kupiecId))
            {
                Response.Cookies.Delete("kupiecId");
                return null;
            }
            return await _context.Koszyki
                .Include(i => i.Przedmioty)
                .ThenInclude(p => p.Zwierze)
                .FirstOrDefaultAsync(x => x.KupiecId == kupiecId);
        }

        private Koszyk UtworzKoszyk()
        {
            var kupiecId = User.Identity?.Name;
            if (string.IsNullOrEmpty(kupiecId))
            {
                kupiecId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("kupiecId", kupiecId, cookieOptions);
            }
            var koszyk = new Koszyk { KupiecId = kupiecId };
            _context.Koszyki.Add(koszyk);
            return koszyk;
        }

        private string GetKupiecId()
        {
            return User.Identity?.Name ?? Request.Cookies["kupiecId"];
        }
    }
}