using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LearningVideoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly HttpContext _httpContext;

        public BaseController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            _httpContext = httpContextAccessor.HttpContext;
        }


        public override OkObjectResult Ok([ActionResultObjectValue] object value)
        {
            return base.Ok(new
            {
                Result = value,
                StatusCode = StatusCodes.Status200OK
            });
        }

        protected long Id => long.Parse(_httpContext.User.FindFirstValue("id"));
    }
}
