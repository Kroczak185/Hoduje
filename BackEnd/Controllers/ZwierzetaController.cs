using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Dane;
using BackEnd.Podmioty;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("BackEnd/[controller]")]
    public class ZwierzetaController
    {
        private readonly PrzechowajDane _dane;
        public ZwierzetaController(PrzechowajDane dane)
        {
            _dane = dane;
        }

        [HttpGet]
        public async Task<ActionResult<List<Zwierze>>> GetZwierzeta()
        {
            return await _dane.Zwierzeta.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Zwierze>> GetZwierze(int id)
        {
            return await _dane.Zwierzeta.FindAsync(id);
        }
    }
}