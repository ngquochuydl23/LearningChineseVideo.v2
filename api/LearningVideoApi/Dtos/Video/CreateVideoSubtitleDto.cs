namespace LearningVideoApi.Dtos.Video
{
    public class CreateVideoSubtitleDto
    {
        public string FileName { get; set; }

        public string Url { get; set; }

        public string SrcLang { get; set; } = "zh";

        public bool IsDefault { get; set; } = false;
    }
}
