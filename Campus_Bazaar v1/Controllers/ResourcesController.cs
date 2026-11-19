using Campus_Bazaar_v1.Data;
using Campus_Bazaar_v1.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Campus_Bazaar_v1.Controllers
{
    [ApiController]
    [Route("api/resources")]
    public class ResourcesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResourcesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<ResourceResponseDto>>>> GetResources()
        {
            var resources = await _context.Resources
                .Include(r => r.Course)
                .Where(r => r.Status == "Published")
                .Select(r => new ResourceResponseDto
                {
                    ResourceId = r.ResourceId,
                    Title = r.Title,
                    Course = r.Course != null ? r.Course.CourseName : "Unassigned",
                    FileType = r.FileType,
                    UploadDate = r.CreatedAt
                })
                .ToListAsync();

            return Ok(ApiResponse<List<ResourceResponseDto>>.SuccessResult(
                resources,
                "Resources retrieved successfully from database."
            ));
        }
    }
}