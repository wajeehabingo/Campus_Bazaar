namespace Campus_Bazaar_v1.DTOs
{
    public class ResourceResponseDto
    {
        public int ResourceId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Course { get; set; } = string.Empty;

        public string FileType { get; set; } = string.Empty;

        public DateTime UploadDate { get; set; }
    }
}