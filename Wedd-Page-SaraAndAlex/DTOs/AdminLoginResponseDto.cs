namespace Wedd_Page_SaraAndAlex.DTOs
{
    public class AdminLoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
    }
}

