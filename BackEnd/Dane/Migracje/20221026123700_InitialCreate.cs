using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Dane.Migracje
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Zwierzeta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nazwa = table.Column<string>(type: "TEXT", nullable: true),
                    Opis = table.Column<string>(type: "TEXT", nullable: true),
                    Cena = table.Column<long>(type: "INTEGER", nullable: false),
                    Wiek = table.Column<long>(type: "INTEGER", nullable: false),
                    Waga = table.Column<long>(type: "INTEGER", nullable: false),
                    ZdjecieUrl = table.Column<string>(type: "TEXT", nullable: true),
                    Typ = table.Column<string>(type: "TEXT", nullable: true),
                    Gatunek = table.Column<string>(type: "TEXT", nullable: true),
                    Lokalizacja = table.Column<string>(type: "TEXT", nullable: true),
                    Zarezerwowane = table.Column<bool>(type: "BOOL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zwierzeta", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Zwierzeta");
        }
    }
}
