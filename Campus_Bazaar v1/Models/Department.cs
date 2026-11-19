using System.ComponentModel.DataAnnotations;

namespace Campus_Bazaar_v1.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }

        [Required]
        [MaxLength(100)]
        public string DepartmentName { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string DepartmentCode { get; set; } = string.Empty;

        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
