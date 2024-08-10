namespace LearningVideoApi.Dtos
{
    public class BaseDto<IdType>: BaseDto
    {
        public IdType Id { get; set; }
    }

    public class BaseDto
    {
        public DateTime CreatedAt { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
