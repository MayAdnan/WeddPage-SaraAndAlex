using Microsoft.EntityFrameworkCore;
using Wedd_Page_SaraAndAlex.Data;
using Wedd_Page_SaraAndAlex.DTOs;
using Wedd_Page_SaraAndAlex.Models;

namespace Wedd_Page_SaraAndAlex.Services
{
    public class RsvpService : IRsvpService
    {
        private readonly WeddingDbContext _context;

        public RsvpService(WeddingDbContext context)
        {
            _context = context;
        }

        public async Task<RsvpResponsDto> SubmitRsvpAsync(RsvpRequestDto request)
        {
            var rsvp = new Rsvp
            {
                Id = Guid.NewGuid().ToString(),
                FullName = request.FullName,
                Email = request.Email,
                IsAttending = request.IsAttending,
                NumberOfGuests = request.NumberOfGuests,
                DietaryRestrictions = request.DietaryRestrictions,
                SubmittedAt = DateTime.UtcNow
            };

            _context.Rsvps.Add(rsvp);
            await _context.SaveChangesAsync();

            return MapToDto(rsvp);
        }

        public async Task<IEnumerable<RsvpResponsDto>> GetAllRsvpsAsync()
        {
            var rsvps = await _context.Rsvps
                .OrderByDescending(r => r.SubmittedAt)
                .ToListAsync();

            return rsvps.Select(MapToDto);
        }

        public async Task<RsvpStatsDto> GetRsvpStatsAsync()
        {
            var rsvps = await _context.Rsvps.ToListAsync();

            return new RsvpStatsDto
            {
                TotalResponses = rsvps.Count,
                AttendingCount = rsvps.Count(r => r.IsAttending),
                NotAttendingCount = rsvps.Count(r => !r.IsAttending),
                TotalGuests = rsvps.Where(r => r.IsAttending).Sum(r => r.NumberOfGuests)
            };
        }

        private static RsvpResponsDto MapToDto(Rsvp rsvp)
        {
            return new RsvpResponsDto
            {
                Id = rsvp.Id,
                FullName = rsvp.FullName,
                Email = rsvp.Email,
                IsAttending = rsvp.IsAttending,
                NumberOfGuests = rsvp.NumberOfGuests,
                DietaryRestrictions = rsvp.DietaryRestrictions,
                SubmittedAt = rsvp.SubmittedAt
            };
        }
    }
}
