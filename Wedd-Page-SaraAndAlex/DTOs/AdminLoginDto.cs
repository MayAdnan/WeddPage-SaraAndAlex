using System.ComponentModel.DataAnnotations;

namespace Wedd_Page_SaraAndAlex.DTOs
{
    public class AdminLoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}

