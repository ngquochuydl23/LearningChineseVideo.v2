using LearningVideoApi.Dtos.User;

namespace LearningVideoApi.Dtos
{
    public class LoginResponseDto
    {
        public string Token { get; set; }

        public UserDto User { get; set; }

        public LoginResponseDto(string token, UserDto user)
        {
            Token = token;
            User = user;
        }
    }
}
