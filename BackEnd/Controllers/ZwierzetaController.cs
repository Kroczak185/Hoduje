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
    
    public class ZwierzetaController : BazaController
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
            var product = await _dane.Zwierzeta.FindAsync(id);
            if(product==null) return NotFound();
            return product;
        }
    }
}