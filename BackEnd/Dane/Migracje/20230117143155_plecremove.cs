using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Dane.Migracje
{
    public partial class plecremove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7413a180-c5eb-48de-98cf-16cb86c76314");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fbb2b4ae-12c7-44fa-babd-b053d1d28347");

            migrationBuilder.AddColumn<string>(
                name: "KupiecId",
                table: "Zwierzeta",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5a95ae71-38f4-45e7-899d-77f9dc782aa3", "ef6ac9f3-8e03-4af2-adc8-e54e8135fff0", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "85edfd5b-7e55-4dd7-a71f-7feddc3fbf71", "9b933ec1-e433-4dbf-b0a9-86ecc441a561", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a95ae71-38f4-45e7-899d-77f9dc782aa3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "85edfd5b-7e55-4dd7-a71f-7feddc3fbf71");

            migrationBuilder.DropColumn(
                name: "KupiecId",
                table: "Zwierzeta");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7413a180-c5eb-48de-98cf-16cb86c76314", "345f6504-7df1-403a-96c3-154e5e5d047b", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fbb2b4ae-12c7-44fa-babd-b053d1d28347", "f9cb345a-d225-424c-bec3-e8bde7507bd2", "Member", "MEMBER" });
        }
    }
}
