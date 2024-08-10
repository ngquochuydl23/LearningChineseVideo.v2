using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class SavedVocav1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SavedVocaEntity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    VideoId = table.Column<string>(type: "text", nullable: false),
                    VocabularyId = table.Column<string>(type: "text", nullable: false),
                    ShowedAt = table.Column<double>(type: "double precision", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedVocaEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedVocaEntity_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedVocaEntity_Video_VideoId",
                        column: x => x.VideoId,
                        principalTable: "Video",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedVocaEntity_Vocabulary_VocabularyId",
                        column: x => x.VocabularyId,
                        principalTable: "Vocabulary",
                        principalColumn: "OriginWord",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedVocaEntity_UserId",
                table: "SavedVocaEntity",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedVocaEntity_VideoId",
                table: "SavedVocaEntity",
                column: "VideoId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedVocaEntity_VocabularyId",
                table: "SavedVocaEntity",
                column: "VocabularyId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedVocaEntity");
        }
    }
}
