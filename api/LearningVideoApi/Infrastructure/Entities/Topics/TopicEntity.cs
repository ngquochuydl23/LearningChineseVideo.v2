using LearningVideoApi.Infrastructure.Seedworks;

namespace LearningVideoApi.Infrastructure.Entities.Topics
{
    public class TopicEntity: Entity
    {

        public string Id { get; set; }

        public string Title { get; set; }

        public ICollection<TopicVideoEntity> TopicVideos { get; set; } = new List<TopicVideoEntity>();

        public TopicEntity(string title)
        {
            Id = Guid.NewGuid().ToString();
            Title = title;
        }
    }
}
