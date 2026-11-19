using System.Collections.Generic;

namespace CampusBazaar.DSA.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Department { get; set; } // e.g., "Data Science", "Computer Engineering"
        public List<ResourceItem> RecentlyViewedResources { get; set; }

        public User(int userId, string name, string department)
        {
            UserId = userId;
            Name = name;
            Department = department;
            RecentlyViewedResources = new List<ResourceItem>();
        }
    }
}