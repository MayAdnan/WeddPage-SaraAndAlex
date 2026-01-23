using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wedd_Page_SaraAndAlex.DTOs;
using Wedd_Page_SaraAndAlex.Services;

namespace Wedd_Page_SaraAndAlex.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IRsvpService _rsvpService;
        private readonly IWeddingInfoService _weddingInfoService;

        public AdminController(
            IJwtService jwtService,
            IRsvpService rsvpService,
            IWeddingInfoService weddingInfoService)
        {
            _jwtService = jwtService;
            _rsvpService = rsvpService;
            _weddingInfoService = weddingInfoService;
        }

        /// <summary>
        /// Admin login to get JWT token
        /// </summary>
        [HttpPost("login")]
        public ActionResult<AdminLoginResponseDto> Login([FromBody] AdminLoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_jwtService.ValidateCredentials(loginDto.Username, loginDto.Password))
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var token = _jwtService.GenerateToken(loginDto.Username);
            var expiresAt = DateTime.UtcNow.AddMinutes(60);

            return Ok(new AdminLoginResponseDto
            {
                Token = token,
                ExpiresAt = expiresAt
            });
        }

        /// <summary>
        /// Get all RSVP responses (admin only)
        /// </summary>
        [HttpGet("rsvps")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<RsvpResponsDto>>> GetAllRsvps()
        {
            var rsvps = await _rsvpService.GetAllRsvpsAsync();
            return Ok(rsvps);
        }

        /// <summary>
        /// Get RSVP statistics (admin only)
        /// </summary>
        [HttpGet("rsvps/stats")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<RsvpStatsDto>> GetRsvpStats()
        {
            var stats = await _rsvpService.GetRsvpStatsAsync();
            return Ok(stats);
        }

        /// <summary>
        /// Get wedding information (admin only)
        /// </summary>
        [HttpGet("wedding/info")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<WeddingInfoDto>> GetWeddingInfoAdmin()
        {
            var info = await _weddingInfoService.GetWeddingInfoAsync();
            if (info == null)
            {
                return NotFound(new { message = "Wedding information not configured yet" });
            }
            return Ok(info);
        }

        /// <summary>
        /// Update wedding information (admin only)
        /// </summary>
        [HttpPut("wedding/info")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<WeddingInfoDto>> UpdateWeddingInfo([FromBody] WeddingInfoUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _weddingInfoService.UpdateWeddingInfoAsync(updateDto);
            return Ok(result);
        }
    }
}

