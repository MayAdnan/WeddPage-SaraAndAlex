namespace Wedd_Page_SaraAndAlex.DTOs
{
    public class RsvpResponsDto
    {
        public string Id { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool IsAttending { get; set; }
        public int NumberOfGuests { get; set; }
        public string? DietaryRestrictions { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}
