using LearningVideoApi.Infrastructure.Entities.Topics;
using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.Users
{
    public static class ConfigureEntity
    {
        public static void AddUserEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>(entity =>
            {
                entity.ToTable("User");
                entity.HasKey(x => x.Id);
            });
        }
    }
}
