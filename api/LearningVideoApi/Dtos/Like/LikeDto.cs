using LearningVideoApi.Dtos.Video;

namespace LearningVideoApi.Dtos.MyFavourite
{
    public class LikeDto: BaseDto<long>
    {
        public VideoDto Video { get; set; }
    }
}
