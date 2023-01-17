using System;
using System.Threading.Tasks;
using BackEnd.Dane;
using BackEnd.Dodatki;
using BackEnd.DTOs;
using BackEnd.Podmioty;
using BackEnd.Uslugi;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class KontoController : BazaController
    {
        private readonly UserManager<Uzytkownik> _userManager;
        private readonly Token _tokenService;
        private readonly PrzechowajDane _context;
        public KontoController(UserManager<Uzytkownik> userManager, Token tokenService, PrzechowajDane context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UzytkownikDto>> Login(LoginDto loginDto)
        {
            var uzytkownik = await _userManager.FindByNameAsync(loginDto.Login);
            Console.WriteLine(uzytkownik);
            if (uzytkownik == null || !await _userManager.CheckPasswordAsync(uzytkownik, loginDto.Password))
                return Unauthorized();

            var userKoszyk = await RetrieveKoszyk(loginDto.Login);
            var anonKoszyk = await RetrieveKoszyk(Request.Cookies["kupiecId"]);
 
            if (anonKoszyk != null)
            {
                if (userKoszyk != null) _context.Koszyki.Remove(userKoszyk);
                anonKoszyk.KupiecId = uzytkownik.UserName;
                Response.Cookies.Delete("kupiecId");
                await _context.SaveChangesAsync();
            }

            return new UzytkownikDto
            {
                Email = uzytkownik.Email,

                Token = await _tokenService.GenerateToken(uzytkownik),
                Koszyk = anonKoszyk != null ? anonKoszyk.MapKoszykDoDto() : userKoszyk?.MapKoszykDoDto()
            };
        }

        [HttpPost("rejestracja")]
        public async Task<ActionResult> Register(RejestracjaDto rejestracjaDto)
        {
            var user = new Uzytkownik { UserName = rejestracjaDto.Login, Email = rejestracjaDto.Email };

            var result = await _userManager.CreateAsync(user, rejestracjaDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("aktualnyUzytkownik")]
        public async Task<ActionResult<UzytkownikDto>> GetCurrentUser()
        {
            var uzytkownik = await _userManager.FindByNameAsync(User.Identity.Name);

            var uzytkownikKoszyk = await RetrieveKoszyk(User.Identity.Name);

            return new UzytkownikDto
            {
                Email = uzytkownik.Email,
                Token = await _tokenService.GenerateToken(uzytkownik),
                Koszyk = uzytkownikKoszyk?.MapKoszykDoDto()
            };
        }

        private async Task<Koszyk> RetrieveKoszyk(string kupiecId)
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
    }
}