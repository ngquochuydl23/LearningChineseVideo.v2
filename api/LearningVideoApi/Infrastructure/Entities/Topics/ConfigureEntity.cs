using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.Topics
{
    public static class ConfigureEntity
    {
        public static void AddTopicEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TopicEntity>(entity =>
            {
                entity.ToTable("Topic");
                entity.HasKey(x => x.Id);
            });

            modelBuilder.Entity<TopicVideoEntity>(entity =>
            {
                entity.ToTable("TopicVideo");
                entity.HasKey(x => x.Id);

                entity
                    .HasOne(x => x.Topic)
                    .WithMany(topic => topic.TopicVideos)
                    .HasForeignKey(x => x.TopicId);

                entity
                    .HasOne(x => x.Video)
                    .WithMany(video => video.TopicVideos)
                    .HasForeignKey(x => x.VideoId);
            });
        }
    }
}
