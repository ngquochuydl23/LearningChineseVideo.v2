using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class SavedVocav13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SavedVocaEntity_VocabularyId",
                table: "SavedVocaEntity");

            migrationBuilder.CreateIndex(
                name: "IX_SavedVocaEntity_VocabularyId",
                table: "SavedVocaEntity",
                column: "VocabularyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SavedVocaEntity_VocabularyId",
                table: "SavedVocaEntity");

            migrationBuilder.CreateIndex(
                name: "IX_SavedVocaEntity_VocabularyId",
                table: "SavedVocaEntity",
                column: "VocabularyId",
                unique: true);
        }
    }
}
