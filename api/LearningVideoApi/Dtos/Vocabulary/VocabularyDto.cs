namespace LearningVideoApi.Dtos.Vocabulary
{
    public class VocabularyDto: BaseDto
    {
        public string OriginWord { get; set; }

        public string? VietnameseMean { get; set; }

        public string? WordType { get; set; }

        public string? Pinyin { get; set; }

        public string? SimiliarMeaning { get; set; }

        public string? OppositeMeaning { get; set; }

        public string? Example { get; set; }

        public string? SinoVietnamese { get; set; }

        public int? Level { get; set; }
    }
}
