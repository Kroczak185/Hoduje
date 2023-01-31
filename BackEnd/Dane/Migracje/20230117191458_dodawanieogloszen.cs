using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Dane.Migracje
{
    public partial class dodawanieogloszen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a95ae71-38f4-45e7-899d-77f9dc782aa3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "85edfd5b-7e55-4dd7-a71f-7feddc3fbf71");

            migrationBuilder.RenameColumn(
                name: "KupiecId",
                table: "Zwierzeta",
                newName: "Email");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1981c73e-526b-47bc-9d77-120326eddc87", "3473d12c-6ae9-4d75-8d01-506bc1296de4", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d39438a1-bfb6-40e9-9905-511ca4848bd8", "622f88c5-0798-4f30-8d7b-913eac978016", "Member", "MEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1981c73e-526b-47bc-9d77-120326eddc87");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d39438a1-bfb6-40e9-9905-511ca4848bd8");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Zwierzeta",
                newName: "KupiecId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5a95ae71-38f4-45e7-899d-77f9dc782aa3", "ef6ac9f3-8e03-4af2-adc8-e54e8135fff0", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "85edfd5b-7e55-4dd7-a71f-7feddc3fbf71", "9b933ec1-e433-4dbf-b0a9-86ecc441a561", "Admin", "ADMIN" });
        }
    }
}
