using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTopicV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TopicVideoEntity_TopicEntity_TopicId",
                table: "TopicVideoEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicVideoEntity_Video_VideoId",
                table: "TopicVideoEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TopicVideoEntity",
                table: "TopicVideoEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TopicEntity",
                table: "TopicEntity");

            migrationBuilder.RenameTable(
                name: "TopicVideoEntity",
                newName: "TopicVideo");

            migrationBuilder.RenameTable(
                name: "TopicEntity",
                newName: "Topic");

            migrationBuilder.RenameIndex(
                name: "IX_TopicVideoEntity_VideoId",
                table: "TopicVideo",
                newName: "IX_TopicVideo_VideoId");

            migrationBuilder.RenameIndex(
                name: "IX_TopicVideoEntity_TopicId",
                table: "TopicVideo",
                newName: "IX_TopicVideo_TopicId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TopicVideo",
                table: "TopicVideo",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Topic",
                table: "Topic",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TopicVideo_Topic_TopicId",
                table: "TopicVideo",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicVideo_Video_VideoId",
                table: "TopicVideo",
                column: "VideoId",
                principalTable: "Video",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TopicVideo_Topic_TopicId",
                table: "TopicVideo");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicVideo_Video_VideoId",
                table: "TopicVideo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TopicVideo",
                table: "TopicVideo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Topic",
                table: "Topic");

            migrationBuilder.RenameTable(
                name: "TopicVideo",
                newName: "TopicVideoEntity");

            migrationBuilder.RenameTable(
                name: "Topic",
                newName: "TopicEntity");

            migrationBuilder.RenameIndex(
                name: "IX_TopicVideo_VideoId",
                table: "TopicVideoEntity",
                newName: "IX_TopicVideoEntity_VideoId");

            migrationBuilder.RenameIndex(
                name: "IX_TopicVideo_TopicId",
                table: "TopicVideoEntity",
                newName: "IX_TopicVideoEntity_TopicId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TopicVideoEntity",
                table: "TopicVideoEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TopicEntity",
                table: "TopicEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TopicVideoEntity_TopicEntity_TopicId",
                table: "TopicVideoEntity",
                column: "TopicId",
                principalTable: "TopicEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicVideoEntity_Video_VideoId",
                table: "TopicVideoEntity",
                column: "VideoId",
                principalTable: "Video",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
