
using Microsoft.AspNetCore.Mvc;

namespace Campus_Bazaar_v1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                status = "Healthy",
                application = "Campus Bazaar"
            });
        }
    }
}

