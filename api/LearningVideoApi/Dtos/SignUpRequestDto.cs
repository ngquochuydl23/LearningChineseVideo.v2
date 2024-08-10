using System.ComponentModel.DataAnnotations;

namespace LearningVideoApi.Dtos
{
    public class SignUpRequestDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        [Required]
        public int Gender { get; set; }

        [Required]
        public int Level { get; set; } = 1;
    }
}
