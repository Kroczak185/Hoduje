using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    public class ErrorController: BazaController
    {
        [HttpGet("nie-znaleziono")]
        public ActionResult GetNotFound()
        {
            return NotFound(new ProblemDetails{Title="Nie znaleziono."});
        }

        [HttpGet("złe-zapytanie")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title="To jest błędne zapytanie"});
        }

        [HttpGet("nieautoryzowane")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized(new ProblemDetails{Title="Nieautoryzoane."});
        }

        [HttpGet("błąd-walidacji")]
        public ActionResult GetValidationError() 
        {
            ModelState.AddModelError("Walidacja","error");
            return ValidationProblem();
        }

        [HttpGet("błąd-serwera")]
        public ActionResult GetServerError()
        {
            throw new Exception("To jest błąd serwera");
        }
    }
}