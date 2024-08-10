using LearningVideoApi.Extensions.JwtHelpers;
using LearningVideoApi.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace LearningVideoApi.Extensions
{
    public static class Extensions
    {
        public static IServiceCollection AddJwtExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<JwtSettings>(configuration.GetSection("Identifier"));
            services.AddSingleton<IJwtExtension, JwtExtension>();
            return services;
        }

        public static IServiceCollection AddForwardHeader(this IServiceCollection services)
        {
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
            return services;
        }

        public static IServiceCollection AddDefaultOpenApi(this IServiceCollection services, IConfiguration configuration)
        {
            var openApi = configuration.GetSection("OpenApi");

            if (!openApi.Exists())
                return services;


            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                var document = openApi.GetRequiredSection("Document");
                var version = document.GetRequiredValue("Version") ?? "v1";
                //  options.OperationFilter<AddAuthHeaderOperationFilter>();
                options.SwaggerDoc(version, new OpenApiInfo
                {
                    Title = document.GetRequiredValue("Title"),
                    Version = version,
                    Description = document.GetRequiredValue("Description")
                });


                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {

                    
                    Description = "Insira o token JWT desta maneira: Bearer {seu token}",
                    Name = "Authorization",
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                      {
                        new OpenApiSecurityScheme
                        {
                          Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
                          new string[] {}
                        }
                    });
                options.OperationFilter<AuthorizeCheckOperationFilter>();
            });
            return services;
        }


        public static IServiceCollection AddDefaultAuthentication(this IServiceCollection services, IConfiguration configuration)
        {

            var identifierSection = configuration.GetSection("Identifier");

            if (!identifierSection.Exists())
                return services;

            services
              .AddAuthentication(option =>
              {
                  option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                  option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                  option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
              })
              .AddJwtBearer(options =>
              {
                  var issuer = identifierSection.GetRequiredValue("Issuer");
                  var audience = identifierSection.GetRequiredValue("Audience");
                  var secretKey = identifierSection.GetRequiredValue("SecretKey");

                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuer = true,
                      ValidateAudience = true,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      ValidIssuer = issuer,
                      ValidAudience = audience,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                  };
              });
            return services;
        }


        public static IServiceCollection AddDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LearningVideoDbContext>(x => x.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
            return services;
        }

        public static IServiceCollection AddLogger(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddLogging(loggingBuilder =>
            //{
            //  loggingBuilder.AddSeq(configuration.GetSection("Seq"));
            //});
            return services;
        }

        public static IServiceCollection AddAutoMapperConfig(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
            return services;
        }
    }
}
