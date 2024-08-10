namespace LearningVideoApi.Extensions.JwtHelpers
{
    public class JwtSettings
    {
        public const string SectionName = "Logging";

        public string SecretKey { get; set; }

        public int ExpiryDays { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }
    }
}
