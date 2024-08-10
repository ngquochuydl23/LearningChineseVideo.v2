using AutoMapper;
using LearningVideoApi.Dtos.Vocabulary;
using LearningVideoApi.Infrastructure.Entities.Vocabularies;
using LearningVideoApi.Infrastructure.Exceptions;
using LearningVideoApi.Infrastructure.Seedworks;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Emit;


namespace LearningVideoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VocabularyController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepository<VocabularyEntity> _vocaRepo;
        private readonly IUnitOfWork _unitOfWork;

        public VocabularyController(
            IMapper mapper,
            IRepository<VocabularyEntity> vocaRepo,
            IHttpContextAccessor httpContextAccessor,
            IUnitOfWork unitOfWork) : base(httpContextAccessor)
        {
            _mapper = mapper;
            _vocaRepo = vocaRepo;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetVocabularies()
        {
            var vocas = _vocaRepo
                .GetQueryableNoTracking()
                .OrderBy(x => x.CreatedAt)
                .Where(x => !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAt)
                .ToList();

            return Ok(_mapper.Map<ICollection<VocabularyDto>>(vocas));
        }

        [HttpGet("{originWord}")]
        public IActionResult GetVoca(string originWord)
        {
            var voca = _vocaRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => !x.IsDeleted && x.OriginWord.Equals(originWord))
                    ?? throw new AppException("Vocabulary does not exist");


            return Ok(_mapper.Map<VocabularyDto>(voca));
        }
            
        [HttpPost]
        public IActionResult AddVocabulary([FromBody] AddUpdateVocabularyDto value)
        {
            if (_vocaRepo
                .GetQueryableNoTracking()
                .Where(x => !x.IsDeleted)
                .Where(x => x.OriginWord.Equals(value.OriginWord))
                .Any())
            {
                throw new AppException("Vocabulary is already exist");
            }

            var vocabulary = _vocaRepo.Insert(new VocabularyEntity()
            {
                OriginWord = value.OriginWord,
                VietnameseMean = value.VietnameseMean,
                WordType = value.WordType,
                Pinyin = value.Pinyin,
                SimiliarMeaning = value.SimiliarMeaning,
                OppositeMeaning = value.OppositeMeaning,
                Example = value.Example,
                SinoVietnamese = value.SinoVietnamese,
                Level = value.Level
            });

            return Ok(_mapper.Map<VocabularyDto>(vocabulary));
        }


        [HttpPut("{originWord}")]
        public IActionResult Put(string originWord, [FromBody] AddUpdateVocabularyDto value)
        {
            var voca = _vocaRepo
                .GetQueryable()
                .FirstOrDefault(x => !x.IsDeleted && x.OriginWord.Equals(originWord))
                    ?? throw new AppException("Vocabulary does not exist");

            voca.OppositeMeaning = value.OppositeMeaning;
            voca.VietnameseMean = value.VietnameseMean;
            voca.SimiliarMeaning = value.SimiliarMeaning;
            voca.Pinyin = value.Pinyin;
            voca.Example = value.Example;
            voca.LastUpdated = DateTime.UtcNow;
            voca.SinoVietnamese = value.SinoVietnamese;
            voca.WordType = value.WordType;
            voca.Level = value.Level;


            _vocaRepo.SaveChanges();
            return Ok(_mapper.Map<VocabularyDto>(voca));
        }

        [HttpDelete("{originWord}")]
        public IActionResult Delete(string originWord)
        {
            var voca = _vocaRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => !x.IsDeleted && x.OriginWord.Equals(originWord))
                    ?? throw new AppException("Vocabulary does not exist");

            _vocaRepo.Delete(voca);

            return Ok();
        }
    }
}
