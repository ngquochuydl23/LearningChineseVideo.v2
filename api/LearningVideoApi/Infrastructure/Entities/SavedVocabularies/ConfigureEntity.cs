using LearningVideoApi.Infrastructure.Entities.Topics;
using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.SavedVocabularies
{
    public static class ConfigureEntity
    {
        public static void AddSavedEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SavedVocaEntity>(entity =>
            {
                entity.ToTable("SavedEntity");
                entity.HasKey(x => x.Id);

                entity
                    .HasOne(x => x.Vocabulary)
                    .WithMany(voca => voca.SavedVocabularies)
                    .HasForeignKey(x => x.VocabularyId);

                entity
                    .HasOne(x => x.User)
                    .WithMany(user => user.SavedVocabularies)
                    .HasForeignKey(x => x.UserId);

                entity
                   .HasOne(x => x.Video)
                   .WithMany(user => user.SavedVocabularies)
                   .HasForeignKey(x => x.VideoId);
            });
        }
    }
}
