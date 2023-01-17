using System.Text.Json;
using BackEnd.Zapytania;
using Microsoft.AspNetCore.Http;

namespace BackEnd.Dodatki
{
    public static class HttpDodatek
    {
        public static void DodaJNaglowek(this HttpResponse odpowiedz, MetaDane metaDane)
        {
            var opcje = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            odpowiedz.Headers.Add("Pagination", JsonSerializer.Serialize(metaDane, opcje));
            odpowiedz.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}