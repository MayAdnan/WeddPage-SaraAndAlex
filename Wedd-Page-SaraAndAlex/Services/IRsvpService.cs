using Wedd_Page_SaraAndAlex.DTOs;

namespace Wedd_Page_SaraAndAlex.Services
{
    public interface IRsvpService
    {
        Task<RsvpResponsDto> SubmitRsvpAsync(RsvpRequestDto request);
        Task<IEnumerable<RsvpResponsDto>> GetAllRsvpsAsync();
        Task<RsvpStatsDto> GetRsvpStatsAsync();
    }
}
