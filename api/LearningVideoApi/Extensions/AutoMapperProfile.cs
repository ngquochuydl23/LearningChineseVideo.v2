using AutoMapper;
using LearningVideoApi.Dtos.Comment;
using LearningVideoApi.Dtos.MyFavourite;
using LearningVideoApi.Dtos.SavedVoca;
using LearningVideoApi.Dtos.User;
using LearningVideoApi.Dtos.Video;
using LearningVideoApi.Dtos.Vocabulary;
using LearningVideoApi.Infrastructure.Entities.SavedVocabularies;
using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Entities.Vocabularies;

namespace LearningVideoApi.Extensions
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserEntity, UserDto>();
            CreateMap<VideoEntity, VideoDto>()
                 .ForMember(dest => dest.Topics, act => act.MapFrom(src => src.TopicVideos.Select(x => x.Topic.Title)));

            CreateMap<VideoSubtitleEntity, SubtitleDto>();

            CreateMap<VocabularyEntity, VocabularyDto>();
            CreateMap<SavedVocaEntity, SavedVocaDto>();
        }
    }
}
