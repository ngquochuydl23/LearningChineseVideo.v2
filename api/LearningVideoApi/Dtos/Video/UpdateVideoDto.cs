using System.ComponentModel.DataAnnotations;

namespace LearningVideoApi.Dtos.Video
{
    public class UpdateVideoDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Level { get; set; }

        public ICollection<UpdateSubtitleDto> Subtitles { get; set; } = new List<UpdateSubtitleDto>();

        public ICollection<string> Topics { get; set; } = new List<string>();
    }
}
