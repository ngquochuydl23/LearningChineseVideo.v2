namespace LearningVideoApi.Dtos.SavedVoca
{
    public class CreateSavedVoca
    {
        public string VideoId { get; set; }

        public string VocabularyId { get; set; }


        public double ShowedFrom { get; set; }

        public double ShowedTo { get; set; }

        public string? Sentence { get; set; }
    }
}
