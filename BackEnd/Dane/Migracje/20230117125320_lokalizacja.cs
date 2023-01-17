using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Dane.Migracje
{
    public partial class lokalizacja : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "32bff8ab-6ccc-49aa-b5ed-e6733bd053b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca7ddcc6-79cf-4fd2-a209-afca0f3079d5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7413a180-c5eb-48de-98cf-16cb86c76314", "345f6504-7df1-403a-96c3-154e5e5d047b", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fbb2b4ae-12c7-44fa-babd-b053d1d28347", "f9cb345a-d225-424c-bec3-e8bde7507bd2", "Member", "MEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7413a180-c5eb-48de-98cf-16cb86c76314");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fbb2b4ae-12c7-44fa-babd-b053d1d28347");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "32bff8ab-6ccc-49aa-b5ed-e6733bd053b8", "85527125-44af-4c54-9e55-94dcf8dbe9fc", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ca7ddcc6-79cf-4fd2-a209-afca0f3079d5", "72a0ef3c-4a88-4675-ad15-42d6a51982a3", "Member", "MEMBER" });
        }
    }
}
