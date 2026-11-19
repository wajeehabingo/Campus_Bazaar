using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Campus_Bazaar_v1.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(150)]
        public string CourseName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string CourseCode { get; set; } = string.Empty;

        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department? Department { get; set; }

        public ICollection<Resource> Resources { get; set; } = new List<Resource>();
    }
}