using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LearningVideoApi.Extensions.JwtHelpers
{
    public class JwtExtension : IJwtExtension
    {
        private readonly JwtSettings _jwtSettings;

        public JwtExtension(IOptions<JwtSettings> jwtSettingOptions)
        {
            _jwtSettings = jwtSettingOptions.Value;
        }

        public IEnumerable<Claim> DecodeToken(string token)
        {
            var obj = new JwtSecurityToken(token);
            return obj.Claims;
        }

        public string GenerateToken(long id, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var signingCredentials = new SigningCredentials(
              new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey)),
              SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("id", id.ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddDays(_jwtSettings.ExpiryDays),
                SigningCredentials = signingCredentials,
                Audience = _jwtSettings.Audience,
                Issuer = _jwtSettings.Issuer
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateTokenForInvitation(string email, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var signingCredentials = new SigningCredentials(
              new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey)),
              SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("email", email),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.Now.AddDays(10),
                SigningCredentials = signingCredentials,
                Audience = _jwtSettings.Audience,
                Issuer = _jwtSettings.Issuer
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
