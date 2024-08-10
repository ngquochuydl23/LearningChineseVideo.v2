using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.Vocabularies
{
    public static class ConfigureEntity
    {
        public static void AddVocaEntity(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VocabularyEntity>(entity =>
            {
                entity.ToTable("Vocabulary");
                entity.HasKey(x => x.OriginWord);
            });
        }
    }
}
