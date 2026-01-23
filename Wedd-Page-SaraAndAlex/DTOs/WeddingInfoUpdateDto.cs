using System.ComponentModel.DataAnnotations;

namespace Wedd_Page_SaraAndAlex.DTOs
{
    public class WeddingInfoUpdateDto
    {
        [Required]
        [MaxLength(100)]
        public string BrideName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string GroomName { get; set; } = string.Empty;

        [Required]
        public DateTime WeddingDate { get; set; }

        public DateTime? CeremonyTime { get; set; }

        public DateTime? ReceptionTime { get; set; }

        [Required]
        [MaxLength(200)]
        public string VenueName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? VenueAddress { get; set; }

        [MaxLength(2000)]
        public string? Description { get; set; }

        [MaxLength(100)]
        public string? DressCode { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? ContactEmail { get; set; }

        [MaxLength(20)]
        public string? ContactPhone { get; set; }
    }
}

