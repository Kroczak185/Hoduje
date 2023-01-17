using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.DTOs
{
    public class RejestracjaDto : LoginDto
    {
        public string Email { get; set; }
    }
}