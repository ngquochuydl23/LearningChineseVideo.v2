namespace LearningVideoApi.Dtos.User
{
    public class UpdateInfoDto
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public DateTime Birthday { get; set; }

        public int Gender { get; set; }

        public string PhoneNumber { get; set; }

        public string? Avatar { get; set; }

        public int Level { get; set; }
    }
}
