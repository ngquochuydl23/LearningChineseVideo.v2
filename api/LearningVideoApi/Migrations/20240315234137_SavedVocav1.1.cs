using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class SavedVocav11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShowedAt",
                table: "SavedVocaEntity",
                newName: "ShowedAtDuration");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShowedAtDuration",
                table: "SavedVocaEntity",
                newName: "ShowedAt");
        }
    }
}
