using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DB.Migrations
{
    public partial class iniDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "astronautas",
                columns: table => new
                {
                    id_n = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nacionalidad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_nacimiento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    edad = table.Column<int>(type: "int", nullable: true),
                    redes_sociales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_astronautas", x => x.id_n);
                });

            migrationBuilder.CreateTable(
                name: "Misiones",
                columns: table => new
                {
                    id_mision = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    objetivo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_iniciada = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fecha_terminada = table.Column<DateTime>(type: "datetime2", nullable: true),
                    id_n = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Misiones", x => x.id_mision);
                    table.ForeignKey(
                        name: "FK_Misiones_astronautas_id_n",
                        column: x => x.id_n,
                        principalTable: "astronautas",
                        principalColumn: "id_n",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Misiones_id_n",
                table: "Misiones",
                column: "id_n");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Misiones");

            migrationBuilder.DropTable(
                name: "astronautas");
        }
    }
}
