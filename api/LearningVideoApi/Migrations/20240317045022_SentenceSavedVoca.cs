using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class SentenceSavedVoca : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Sentence",
                table: "SavedVocaEntity",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sentence",
                table: "SavedVocaEntity");
        }
    }
}
