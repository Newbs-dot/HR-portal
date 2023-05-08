using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dal.Migrations
{
    /// <inheritdoc />
    public partial class Initial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<long>>(
                name: "RespondedUsers",
                table: "Vacancies",
                type: "bigint[]",
                nullable: true,
                oldClrType: typeof(long[]),
                oldType: "bigint[]");

            migrationBuilder.AlterColumn<List<long>>(
                name: "VacancyIdList",
                table: "Tags",
                type: "bigint[]",
                nullable: true,
                oldClrType: typeof(long[]),
                oldType: "bigint[]");

            migrationBuilder.AlterColumn<List<long>>(
                name: "SummaryIdList",
                table: "Tags",
                type: "bigint[]",
                nullable: true,
                oldClrType: typeof(long[]),
                oldType: "bigint[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long[]>(
                name: "RespondedUsers",
                table: "Vacancies",
                type: "bigint[]",
                nullable: false,
                defaultValue: new long[0],
                oldClrType: typeof(List<long>),
                oldType: "bigint[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<long[]>(
                name: "VacancyIdList",
                table: "Tags",
                type: "bigint[]",
                nullable: false,
                defaultValue: new long[0],
                oldClrType: typeof(List<long>),
                oldType: "bigint[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<long[]>(
                name: "SummaryIdList",
                table: "Tags",
                type: "bigint[]",
                nullable: false,
                defaultValue: new long[0],
                oldClrType: typeof(List<long>),
                oldType: "bigint[]",
                oldNullable: true);
        }
    }
}
