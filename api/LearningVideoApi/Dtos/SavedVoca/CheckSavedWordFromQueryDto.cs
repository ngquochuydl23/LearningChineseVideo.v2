namespace LearningVideoApi.Dtos.SavedVoca
{
    public class CheckSavedWordFromQueryDto
    {
        public string VideoId { get; set; }

        public double ShowedFrom { get; set; }

        public double ShowedTo { get; set; }
    }
}
