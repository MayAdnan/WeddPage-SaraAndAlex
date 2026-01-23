using Microsoft.EntityFrameworkCore;
using Wedd_Page_SaraAndAlex.Data;
using Wedd_Page_SaraAndAlex.DTOs;
using Wedd_Page_SaraAndAlex.Models;

namespace Wedd_Page_SaraAndAlex.Services
{
    public class WeddingInfoService : IWeddingInfoService
    {
        private readonly WeddingDbContext _context;

        public WeddingInfoService(WeddingDbContext context)
        {
            _context = context;
        }

        public async Task<WeddingInfoDto?> GetWeddingInfoAsync()
        {
            var info = await _context.WeddingInfo.FirstOrDefaultAsync();
            
            if (info == null)
                return null;

            return MapToDto(info);
        }

        public async Task<WeddingInfoDto> UpdateWeddingInfoAsync(WeddingInfoUpdateDto updateDto)
        {
            var info = await _context.WeddingInfo.FirstOrDefaultAsync();

            if (info == null)
            {
                info = new WeddingInfo();
                _context.WeddingInfo.Add(info);
            }

            info.BrideName = updateDto.BrideName;
            info.GroomName = updateDto.GroomName;
            info.WeddingDate = updateDto.WeddingDate;
            info.CeremonyTime = updateDto.CeremonyTime;
            info.ReceptionTime = updateDto.ReceptionTime;
            info.VenueName = updateDto.VenueName;
            info.VenueAddress = updateDto.VenueAddress;
            info.Description = updateDto.Description;
            info.DressCode = updateDto.DressCode;
            info.ContactEmail = updateDto.ContactEmail;
            info.ContactPhone = updateDto.ContactPhone;
            info.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToDto(info);
        }

        private static WeddingInfoDto MapToDto(WeddingInfo info)
        {
            return new WeddingInfoDto
            {
                BrideName = info.BrideName,
                GroomName = info.GroomName,
                WeddingDate = info.WeddingDate,
                CeremonyTime = info.CeremonyTime,
                ReceptionTime = info.ReceptionTime,
                VenueName = info.VenueName,
                VenueAddress = info.VenueAddress,
                Description = info.Description,
                DressCode = info.DressCode,
                ContactEmail = info.ContactEmail,
                ContactPhone = info.ContactPhone
            };
        }
    }
}

