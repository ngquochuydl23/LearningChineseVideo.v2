using LearningVideoApi.Infrastructure.Entities.SavedVocabularies;
using LearningVideoApi.Infrastructure.Seedworks;
using LearningVideoApi.Migrations;

namespace LearningVideoApi.Infrastructure.Entities.Vocabularies
{
    public class VocabularyEntity: Entity
    {
        public string OriginWord { get; set; }

        public string? VietnameseMean { get; set; }

        public string? WordType { get; set; }

        public string? Pinyin { get; set; }

        public string? SimiliarMeaning { get; set; }

        public string? OppositeMeaning { get; set; }

        public string? Example { get; set; }

        public int? Level { get; set; }

        public string? SinoVietnamese { get; set; }

        public List<SavedVocaEntity>? SavedVocabularies { get; set; }
    }
}
