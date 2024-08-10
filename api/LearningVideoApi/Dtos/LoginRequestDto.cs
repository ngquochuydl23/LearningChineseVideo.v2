using System.ComponentModel.DataAnnotations;

namespace LearningVideoApi.Dtos
{
    public class LoginRequestDto
    {
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
