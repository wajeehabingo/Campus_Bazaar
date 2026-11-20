using Campus_Bazaar_v1.DTOs;
using Campus_Bazaar_v1.Data;
using Microsoft.AspNetCore.Mvc;

namespace Campus_Bazaar_v1.Controllers
{
    [ApiController]
    [Route("api/health")]
    public class HealthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HealthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<ApiResponse<object>> GetHealth()
        {
            var data = new { Status = "Healthy", Application = "Campus Bazaar" };
            return Ok(ApiResponse<object>.SuccessResult(data, "System is running normally."));
        }

        [HttpGet("database")]
        public async Task<ActionResult<ApiResponse<object>>> GetDatabaseHealth()
        {
            try
            {
                bool canConnect = await _context.Database.CanConnectAsync();
                if (canConnect)
                {
                    var data = new { Status = "Connected", Database = "CampusBazaarDb" };
                    return Ok(ApiResponse<object>.SuccessResult(data, "Database connection established successfully."));
                }
                return StatusCode(503, ApiResponse<object>.FailureResult("Database connection failed."));
            }
            catch (Exception ex)
            {
                return StatusCode(503, ApiResponse<object>.FailureResult("Database connectivity error.", new List<string> { ex.Message }));
            }
        }
    }
}