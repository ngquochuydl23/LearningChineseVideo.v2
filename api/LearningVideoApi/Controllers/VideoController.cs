using AutoMapper;
using LearningVideoApi.Dtos.Video;
using LearningVideoApi.Infrastructure;
using LearningVideoApi.Infrastructure.Entities.SavedVocabularies;
using LearningVideoApi.Infrastructure.Entities.Topics;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Exceptions;
using LearningVideoApi.Infrastructure.Seedworks;
using LearningVideoApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace LearningVideoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepository<VideoEntity> _videoRepo;
        private readonly IRepository<TopicEntity> _topicRepo;
        private readonly IRepository<SavedVocaEntity> _saveVocaRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly LearningVideoDbContext _dbContext;

        public VideoController(
            IMapper mapper,
            IRepository<VideoEntity> videoRepo,
            IRepository<TopicEntity> topicRepo,
            IRepository<SavedVocaEntity> saveVocaRepo,
            LearningVideoDbContext dbContext,
            IHttpContextAccessor httpContextAccessor,
            IUnitOfWork unitOfWork) : base(httpContextAccessor)
        {
            _mapper = mapper;
            _videoRepo = videoRepo;
            _topicRepo = topicRepo;
            _unitOfWork = unitOfWork;
            _saveVocaRepo = saveVocaRepo;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get(
            [FromQuery] FromQueryAsCollection query,
            [FromQuery] string? topic,
            [FromQuery] string? level,
            [FromQuery] string? search)
        {
            var videos = _videoRepo
                .GetQueryableNoTracking()
                .Include(x => x.TopicVideos)
                .ThenInclude(topicVideo => topicVideo.Topic)
                .Include(x => x.Subtitles.OrderBy(sub => sub.Id))
                .OrderByDescending(x => x.CreatedAt)
                .Where(x => !x.IsDeleted)
                .Where(x => !string.IsNullOrEmpty(level)
                    ? (x.Level.Equals(level))
                    : true)
                .Where(p => !string.IsNullOrEmpty(search)
                    ? p.SearchVector.Matches(EF.Functions.ToTsQuery(search + ":*"))
                    : true);

            if (query.Offset.HasValue && query.Limit.HasValue)
            {
                videos = videos
                    .Skip(query.Offset.Value)
                    .Take(query.Limit.Value);
            }

            return Ok(_mapper.Map<ICollection<VideoDto>>(videos.ToList()));
        }


        [HttpGet("{id}")]
        public IActionResult GetVideo(string id)
        {
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(id);
            string chineseId = System.Text.Encoding.UTF8.GetString(buffer);

            var video = _videoRepo
                .GetQueryableNoTracking()
                .Include(x => x.TopicVideos)
                .ThenInclude(topicVideo => topicVideo.Topic)
                .Include(x => x.Subtitles.OrderBy(sub => sub.Id))
                .FirstOrDefault(x => x.Id.Equals(chineseId) && !x.IsDeleted)
                    ?? throw new AppException("Video does not exist");

            return Ok(_mapper.Map<VideoDto>(video));
        }

        //[Authorize]
        [HttpPost]
        public IActionResult AddVideo([FromBody] CreateVideoDto value)
        {
            if (_videoRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Title.Equals(value.Title) && !x.IsDeleted) != null)
                throw new AppException("Video is already created");


            using (_unitOfWork.Begin())
            {
                var video = _videoRepo.Insert(new VideoEntity(
                    value.Title,
                    value.Description,
                    value.VideoUrl,
                    value.Thumbnail,
                    value.MimeType,
                    value.Duration,
                    value.Level));

                video.Subtitles = value.Subtitles.Select(subtitle =>
                    new VideoSubtitleEntity(
                        video.Id,
                        subtitle.Url,
                        subtitle.SrcLang,
                        subtitle.IsDefault,
                        subtitle.FileName))
                    .ToList();

                video.PlainTextWithTopic = string.Join(",", value.Topics);
                video.TopicVideos = value.Topics.Select(topic =>
                        AddTopicToVideo(video, topic))
                    .ToList();

                _videoRepo.SaveChanges();
                _unitOfWork.Complete();

                return Ok(video);
            }
        }

        [HttpPut("{id}")]
        public IActionResult EditVideoInfo(string id, [FromBody] UpdateVideoDto value)
        {
            var video = _videoRepo
                .GetQueryable()
                .Include(x => x.Subtitles)
                .Include(x => x.TopicVideos)
                .FirstOrDefault(x => !x.IsDeleted && x.Id.Equals(id))
                    ?? throw new AppException("Video not found");

            video.Title = value.Title;
            video.Description = value.Description;
            video.LastUpdated = DateTime.Now;

            if (!value.Level.Equals("-1"))
            {
                video.Level = value.Level;
            } 
            else
            {
                video.HasAutoLabeled = true;
                var commonLevel = _saveVocaRepo
                    .GetQueryableNoTracking()
                    .Include(x => x.Vocabulary)
                    .Where(x => !x.IsDeleted)
                    .Where(x => x.UserId == 2)
                    .Where(x => x.Vocabulary != null)
                    .Where(x => x.VideoId.Equals(id))
                    .GroupBy(x => x.Vocabulary.Level)
                    .Select(x => new
                    {
                        Level = x.Key,
                        Count = x.Count(),
                    })
                    .Where(x => x.Level != null)
                    .ToList()
                    .OrderByDescending(x => x.Count)
                    .First();

                video.Level = commonLevel.Level.ToString();
                
            }


            foreach (var updateSubtitleDto in value.Subtitles)
            {
                var subtitle = video.Subtitles.FirstOrDefault(x => !x.IsDeleted && x.Id == updateSubtitleDto.Id);

                subtitle.Url = updateSubtitleDto.Url;

                _dbContext.Entry(subtitle).CurrentValues.SetValues(subtitle);
            }


            if (!value.Topics.Any())
            {
                throw new AppException("Topics must not be empty");
            }

            video.TopicVideos.Clear();
            foreach (var topic in value.Topics)
            {



                video.TopicVideos.Add(AddTopicToVideo(video, topic));
            }

            _videoRepo.SaveChanges();

            return Ok(video);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var video = _videoRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Id.Equals(id) && !x.IsDeleted)
                    ?? throw new AppException("Video does not exist");

            _videoRepo.Delete(video);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("mostPopular")]
        public IActionResult GetMostPopular([FromQuery] FromQueryAsCollection query)
        {
            var videos = _videoRepo
                .GetQueryableNoTracking()
                .Include(x => x.TopicVideos)
                .ThenInclude(topicVideo => topicVideo.Topic)
                .Where(x => !x.IsDeleted);


            if (query.Offset.HasValue && query.Limit.HasValue)
            {
                videos = videos
                    .Skip(query.Offset.Value)
                    .Take(query.Limit.Value);
            }

            videos = videos
                .OrderByDescending(x => x.ViewerCount);

            return Ok(_mapper.Map<ICollection<VideoDto>>(videos.ToList()));
        }

        [AllowAnonymous]
        [HttpGet("recentlyAdded")]
        public IActionResult GetRecentlyAdded([FromQuery] FromQueryAsCollection query)
        {
            var videos = _videoRepo
                .GetQueryableNoTracking()
                .Include(x => x.TopicVideos)
                .ThenInclude(topicVideo => topicVideo.Topic)
                .Where(x => !x.IsDeleted);


            if (query.Offset.HasValue && query.Limit.HasValue)
            {
                videos = videos
                    .Skip(query.Offset.Value)
                    .Take(query.Limit.Value);
            }

            videos = videos.OrderByDescending(x => x.CreatedAt);
            return Ok(_mapper.Map<ICollection<VideoDto>>(videos.ToList()));
        }

        [HttpPost("{id}/view")]
        public IActionResult ViewVideo(string id)
        {
            var video = _videoRepo
                .GetQueryable()
                .FirstOrDefault(x => x.Id.Equals(id) && !x.IsDeleted)
                    ?? throw new AppException("Video does not exist");

            video.ViewerCount++;
            _videoRepo.SaveChanges();

            return Ok();
        }

        [HttpGet("Level/{hskLevel}")]
        public IActionResult GetVideosByLevel(string hskLevel, [FromQuery] FromQueryAsCollection query)
        {
            var videos = _videoRepo
                            .GetQueryableNoTracking()
                            .Include(x => x.TopicVideos)
                            .ThenInclude(topicVideo => topicVideo.Topic)
                            .Where(x => !x.IsDeleted && x.Level.Equals(hskLevel));

            if (query.Offset.HasValue && query.Limit.HasValue)
            {
                videos = videos
                    .Skip(query.Offset.Value)
                    .Take(query.Limit.Value);
            }

            videos = videos
                .OrderByDescending(x => x.ViewerCount);
            return Ok(_mapper.Map<ICollection<VideoDto>>(videos.ToList()));
        }

        private TopicVideoEntity AddTopicToVideo(VideoEntity video, string topicTitle)
        {
            var topic = _topicRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Title.Equals(topicTitle) && !x.IsDeleted);

            if (topic == null)
            {
                return new TopicVideoEntity(video.Id, new TopicEntity(topicTitle));
            }

            var topicVideo = video.TopicVideos
                .FirstOrDefault(x => x.TopicId.Equals(topic.Id) && x.VideoId.Equals(video.Id) && !x.Video.IsDeleted);

            if (topicVideo != null)
            {
                throw new AppException("This topic is already in video");
            }

            return new TopicVideoEntity(video.Id, topic.Id);
        }
    }
}
