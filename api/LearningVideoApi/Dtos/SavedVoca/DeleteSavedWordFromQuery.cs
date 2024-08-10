namespace LearningVideoApi.Dtos.SavedVoca
{
    public class DeleteSavedWordFromQuery
    {
        public string VideoId { get; set; }

        public double ShowedFrom { get; set; }

        public double ShowedTo { get; set; }
    }
}
