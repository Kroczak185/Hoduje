namespace API.DTOs
{
    public enum Gender{
        Samiec,
        Samica
    }
    public class KoszykItemDto
    {
        public int ZwierzeId { get; set; }
        public string Nazwa { get; set; }
        public long Cena { get; set; }
        public string ZdjecieUrl { get; set; }
        public string Typ { get; set; }
        public string Gatunek { get; set; }
        public string Lokalizacja { get; set; }
        public bool Zarezerwowane { get; set; }
    }
}
