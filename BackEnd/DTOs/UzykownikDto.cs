using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.DTOs;

namespace BackEnd.DTOs
{
    public class UzytkownikDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public KoszykDto Koszyk { get; set; }
    }
}