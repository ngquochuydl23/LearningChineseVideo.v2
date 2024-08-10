using System.ComponentModel.DataAnnotations;

namespace LearningVideoApi.Dtos.Video
{
    public class CreateVideoDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string VideoUrl { get; set; }

        public string Thumbnail { get; set; }

        [Range(0, long.MaxValue)]
        public long Duration { get; set; }

        public string MimeType { get; set; }

        public string Level { get; set; }

        public ICollection<CreateVideoSubtitleDto> Subtitles { get; set; } = new List<CreateVideoSubtitleDto>();

        public ICollection<string> Topics { get; set; } = new List<string>();
    }
}
