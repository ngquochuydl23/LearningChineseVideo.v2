using LearningVideoApi.Dtos.Video;
using LearningVideoApi.Dtos.Vocabulary;

namespace LearningVideoApi.Dtos.SavedVoca
{
    public class SavedVocaDto: BaseDto<string>
    {
        public double ShowedFrom { get; set; }

        public double ShowedTo { get; set; }

        public VideoDto Video { get; set; }

        public VocabularyDto Vocabulary { get; set; }
    }
}
