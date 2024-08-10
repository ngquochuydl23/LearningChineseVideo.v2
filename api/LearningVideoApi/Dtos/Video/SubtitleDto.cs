namespace LearningVideoApi.Dtos.Video
{
    public class SubtitleDto
    {
        public long Id {  get; set; }

        public string Url { get; set; }

        public string SrcLang { get; set; } = "zh";

        public bool IsDefault { get; set; } = false;
    }
}
