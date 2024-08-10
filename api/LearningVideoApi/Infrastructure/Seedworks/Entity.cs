using System.Text.RegularExpressions;

namespace LearningVideoApi.Infrastructure.Seedworks
{
    public abstract class Entity : IDeleteEntity, IHasCreationTime, ILastUpdatedTime
    {
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }


        public Entity()
        {
            CreatedAt = DateTime.Now;
        }

        protected string GenerateStringId(string text)
        {
            string stringId = text.ToLower();
            stringId = Regex.Replace(stringId, "à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|/g", "a");
            stringId = Regex.Replace(stringId, "è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|/g", "e");
            stringId = Regex.Replace(stringId, "ì|í|ị|ỉ|ĩ|/g", "i");
            stringId = Regex.Replace(stringId, "ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|/g", "o");
            stringId = Regex.Replace(stringId, "ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|/g", "u");
            stringId = Regex.Replace(stringId, "ỳ|ý|ỵ|ỷ|ỹ|/g", "y");
            stringId = Regex.Replace(stringId, "đ", "d");

            return Regex.Replace(stringId, @"[^A-Za-z0-9_\.~]+", "-");
        }
    }


    public abstract class Entity<TKey> : Entity
    {
        public TKey Id { get; set; }
    }
}
