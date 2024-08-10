
using LearningVideoApi.Extensions;
using LearningVideoApi.Infrastructure.Seedworks;
using LearningVideoApi.Infrastructure;
using Social_v2.Clothes.Api.Infrastructure;
using LearningVideoApi.Middlewares;
using Newtonsoft.Json;
using FluentValidation.AspNetCore;
using System.Reflection;

namespace LearningVideoApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services
              .AddControllers()   
              .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            builder.Services.AddCors();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddHttpContextAccessor();
            builder.Services
               .AddForwardHeader()
               .AddDefaultOpenApi(builder.Configuration)
               .AddDefaultAuthentication(builder.Configuration)
               .AddDbContext(builder.Configuration)
               .AddLogger(builder.Configuration)
               .AddJwtExtension(builder.Configuration)
               .AddAutoMapperConfig()
               .AddFluentValidation(v =>
               {
                   v.ImplicitlyValidateChildProperties = true;
                   v.ImplicitlyValidateRootCollectionElements = true;
                   v.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
               });

            builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
            builder.Services.AddTransient(typeof(IRepository<>), typeof(Repository<>));

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors(x => x
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials());

            app.UseMiddleware<ErrorHandlingMiddleWare>();

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}