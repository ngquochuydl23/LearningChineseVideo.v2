using LearningVideoApi.Infrastructure.Entities.Topics;
using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Entities.Vocabularies;
using LearningVideoApi.Infrastructure.Entities.WatchedVideos;
using Microsoft.EntityFrameworkCore;


namespace LearningVideoApi.Infrastructure
{
    public class LearningVideoDbContext : DbContext
    {
        public LearningVideoDbContext(DbContextOptions<LearningVideoDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.AddUserEntities();
            modelBuilder.AddVideoEntities();
            modelBuilder.AddWatchedVideoEntities();
            modelBuilder.AddVocaEntity();
            modelBuilder.AddTopicEntities();
        }
    }
}
