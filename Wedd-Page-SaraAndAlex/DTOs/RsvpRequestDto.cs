using System.ComponentModel.DataAnnotations;

namespace Wedd_Page_SaraAndAlex.DTOs
{
    public class RsvpRequestDto
    {
        [Required]
        [MaxLength(100)]
        [Display(Name = "Full Name")]
        public string FullName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string Email { get; set; } = string.Empty;
        public bool IsAttending { get; set; }
        [Required]
        [Range(0, 10)]
        [Display(Name = "Number of Guests Attending")]
        public int NumberOfGuests { get; set; }

        [MaxLength(500)]
        [Display(Name = "Dietary Restrictions")]
        public string? DietaryRestrictions { get; set; }
    }
}
