using LearningVideoApi.Infrastructure.Entities.SavedVocabularies;
using LearningVideoApi.Infrastructure.Entities.WatchedVideos;
using LearningVideoApi.Infrastructure.Seedworks;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LearningVideoApi.Infrastructure.Entities.Users
{
    public class UserEntity : Entity<long>
    {
        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string HashPassword { get; set; }

        public DateTime Birthday { get; set; }

        public DateTime LastLogin { get; set; }

        public int? Gender { get; set; }

        public string? Avatar { get; set; }


        public int Level { get; set; } = 1;

        public string Role { get; set; } = "User";

        public ICollection<WatchedVideoEntity> WatchedVideos { get; set; } = new List<WatchedVideoEntity>();


        public ICollection<SavedVocaEntity> SavedVocabularies { get; set; } = new List<SavedVocaEntity>();
    }
}
