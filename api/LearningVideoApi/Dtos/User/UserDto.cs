namespace LearningVideoApi.Dtos.User
{
    public class UserDto: BaseDto<long>
    {
        public long Id { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public int Gender { get; set; }

        public DateTime Birthday { get; set; }

        public string Role { get; set; }

        public string? Avatar { get; set; }

        public string Level { get; set; }
    }
}
