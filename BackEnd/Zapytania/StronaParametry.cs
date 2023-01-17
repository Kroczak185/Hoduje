namespace BackEnd.Zapytania
{
    public class StronaParametry
    {
        private const int MaksymalnaWielkoscStrony = 50;
        public int NumerStrony { get; set; } = 1;
        private int _wielkoscStrony = 6;
        public int WielkoscStrony
        {
            get => _wielkoscStrony;
            set => _wielkoscStrony = value > MaksymalnaWielkoscStrony ? MaksymalnaWielkoscStrony : value;
        }
    }
}