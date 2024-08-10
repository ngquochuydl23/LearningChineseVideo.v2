using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.WatchedVideos
{
    public static class ConfigureEntity
    {
        public static void AddWatchedVideoEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WatchedVideoEntity>(entity =>
            {
                entity.ToTable("WatchedVideo");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => x.UserId);

                entity
                    .HasOne(x => x.Video)
                    .WithMany(video => video.WatchedVideos)
                    .HasForeignKey(x => x.VideoId);

                entity
                    .HasOne(x => x.User)
                    .WithMany(user => user.WatchedVideos)
                    .HasForeignKey(x => x.UserId);
            });
        }
    }
}
