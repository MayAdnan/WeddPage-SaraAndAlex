using Wedd_Page_SaraAndAlex.DTOs;

namespace Wedd_Page_SaraAndAlex.Services
{
    public interface IWeddingInfoService
    {
        Task<WeddingInfoDto?> GetWeddingInfoAsync();
        Task<WeddingInfoDto> UpdateWeddingInfoAsync(WeddingInfoUpdateDto updateDto);
    }
}

