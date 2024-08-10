using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class SavedVocav14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShowedAtDuration",
                table: "SavedVocaEntity",
                newName: "ShowedTo");

            migrationBuilder.AddColumn<double>(
                name: "ShowedFrom",
                table: "SavedVocaEntity",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowedFrom",
                table: "SavedVocaEntity");

            migrationBuilder.RenameColumn(
                name: "ShowedTo",
                table: "SavedVocaEntity",
                newName: "ShowedAtDuration");
        }
    }
}
