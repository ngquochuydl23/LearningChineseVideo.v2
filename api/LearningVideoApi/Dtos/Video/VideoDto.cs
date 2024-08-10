using LearningVideoApi.Dtos.Comment;
using LearningVideoApi.Infrastructure.Entities.Topics;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Entities.WatchedVideos;

namespace LearningVideoApi.Dtos.Video
{
    public class VideoDto: BaseDto<string>
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool HasAutoLabeled { get; set; } = false;

        public long ViewerCount { get; set; } = 0;

        public long CommentCount { get; set; } = 0;

        public long LikeCount { get; set; } = 0;
        public string VideoUrl { get; set; }

        public string Thumbnail { get; set; }

        public long Duration { get; set; }

        public string MimeType { get; set; }

        public string Level { get; set; }

        public ICollection<SubtitleDto> Subtitles { get; set; } = new List<SubtitleDto>();

        public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();

        public ICollection<string> Topics { get; set; } = new List<string>();
    }
}
