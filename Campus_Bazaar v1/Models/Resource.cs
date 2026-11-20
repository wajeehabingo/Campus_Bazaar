using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Campus_Bazaar_v1.Models
{
    public class Resource
    {
        [Key]
        public int ResourceId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string FileType { get; set; } = string.Empty;

        [Required]
        public string FilePath { get; set; } = string.Empty;

        public long FileSizeBytes { get; set; }

        public int UploadedByUserId { get; set; }
        [ForeignKey("UploadedByUserId")]
        public User? Uploader { get; set; }

        public int CourseId { get; set; }
        [ForeignKey("CourseId")sssss]
        public Course? Course { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Published";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}