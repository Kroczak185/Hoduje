using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Dane.Migracje
{
    public partial class KoszykDodany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Koszyki",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    KupiecId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Koszyki", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KoszykPrzedmioty",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ZwierzeId = table.Column<int>(type: "INTEGER", nullable: false),
                    KoszykId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KoszykPrzedmioty", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KoszykPrzedmioty_Koszyki_KoszykId",
                        column: x => x.KoszykId,
                        principalTable: "Koszyki",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KoszykPrzedmioty_Zwierzeta_ZwierzeId",
                        column: x => x.ZwierzeId,
                        principalTable: "Zwierzeta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KoszykPrzedmioty_KoszykId",
                table: "KoszykPrzedmioty",
                column: "KoszykId");

            migrationBuilder.CreateIndex(
                name: "IX_KoszykPrzedmioty_ZwierzeId",
                table: "KoszykPrzedmioty",
                column: "ZwierzeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KoszykPrzedmioty");

            migrationBuilder.DropTable(
                name: "Koszyki");
        }
    }
}
