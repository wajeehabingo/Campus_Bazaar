using Microsoft.AspNetCore.Mvc;

namespace Campus_Bazaar_v1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResourcesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetResources()
        {
            return Ok(new
            {
                success = true,
                message = "Resources endpoint is working.",
                data = new List<object>()
            });
        }
    }
}