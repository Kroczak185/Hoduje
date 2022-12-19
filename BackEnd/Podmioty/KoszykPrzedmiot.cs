using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Podmioty
{
    [Table("KoszykPrzedmioty")]
    public class KoszykPrzedmiot
    {
        public int Id { get; set; }

        // navigation propeties
        public int ZwierzeId { get; set; }
        public Zwierze Zwierze { get; set; }

        public int KoszykId { get; set; }
        public Koszyk Koszyk { get; set; }
    }
}