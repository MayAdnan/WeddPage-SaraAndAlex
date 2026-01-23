using System.ComponentModel.DataAnnotations;

namespace Wedd_Page_SaraAndAlex.Models
{
    public class Rsvp
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;
        
        public bool IsAttending { get; set; }
        
        public int NumberOfGuests { get; set; }
        
        [MaxLength(500)]
        public string? DietaryRestrictions { get; set; }
        
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
