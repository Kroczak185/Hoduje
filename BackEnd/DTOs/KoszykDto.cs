using System.Collections.Generic;

namespace BackEnd.DTOs
{
    public class KoszykDto
    {
        public int Id { get; set; }
        public string KupiecId { get; set; }
        public List<KoszykItemDto> Przedmioty { get; set; } = new();
    }
}