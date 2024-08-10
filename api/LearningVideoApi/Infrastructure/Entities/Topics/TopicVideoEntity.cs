using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Seedworks;

namespace LearningVideoApi.Infrastructure.Entities.Topics
{
    public class TopicVideoEntity: Entity<long>
    {
        public string VideoId { get; set; }

        public string TopicId { get; set; }

        public VideoEntity Video { get; set; }

        public TopicEntity Topic { get; set; }

        public TopicVideoEntity(string videoId, string topicId)
        {
            VideoId = videoId;
            TopicId = topicId;
        }

        public TopicVideoEntity(string videoId, TopicEntity topic)
        {
            VideoId = videoId;
            Topic = topic;
        }
    }
}
