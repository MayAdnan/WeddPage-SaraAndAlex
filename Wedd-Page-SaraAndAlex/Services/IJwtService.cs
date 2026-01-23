namespace Wedd_Page_SaraAndAlex.Services
{
    public interface IJwtService
    {
        string GenerateToken(string username);
        bool ValidateCredentials(string username, string password);
    }
}

