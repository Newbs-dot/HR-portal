using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dal.Migrations
{
    /// <inheritdoc />
    public partial class Initial5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VacanciesId",
                table: "Departaments");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Departaments",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Departaments");

            migrationBuilder.AddColumn<List<long>>(
                name: "VacanciesId",
                table: "Departaments",
                type: "bigint[]",
                nullable: true);
        }
    }
}
