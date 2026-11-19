using System;

namespace CampusBazaar.DSA.Models
{
    public class ResourceItem
    {
        public int Id { get; set; }
        public string Title { get; set; }          // e.g., "Data Structures Final Exam Notes"
        public string Description { get; set; }    // Brief summary of what's inside
        public string CourseCode { get; set; }     // e.g., "CS-201", "DS-301"
        public string FileType { get; set; }       // e.g., "PDF", "Manual", "TXT"
        public string UploaderName { get; set; }   // Student who uploaded it
        public int DownloadCount { get; set; }     // Track popularity for sorting algorithms
        public DateTime UploadDate { get; set; }

        public ResourceItem(int id, string title, string description, string courseCode, string fileType, string uploaderName)
        {
            Id = id;
            Title = title;
            Description = description;
            CourseCode = courseCode;
            FileType = fileType;
            UploaderName = uploaderName;
            DownloadCount = 0;
            UploadDate = DateTime.Now;
        }

        public override string ToString()
        {
            return $"[{CourseCode}] {Title} ({FileType}) - Uploaded by {UploaderName} | Downloads: {DownloadCount}";
        }
    }
}