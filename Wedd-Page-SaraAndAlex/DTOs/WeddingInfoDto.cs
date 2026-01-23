namespace Wedd_Page_SaraAndAlex.DTOs
{
    public class WeddingInfoDto
    {
        public string BrideName { get; set; } = string.Empty;
        public string GroomName { get; set; } = string.Empty;
        public DateTime WeddingDate { get; set; }
        public DateTime? CeremonyTime { get; set; }
        public DateTime? ReceptionTime { get; set; }
        public string VenueName { get; set; } = string.Empty;
        public string? VenueAddress { get; set; }
        public string? Description { get; set; }
        public string? DressCode { get; set; }
        public string? ContactEmail { get; set; }
        public string? ContactPhone { get; set; }
    }
}

