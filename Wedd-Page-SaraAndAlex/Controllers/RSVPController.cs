using Microsoft.AspNetCore.Mvc;
using Wedd_Page_SaraAndAlex.DTOs;
using Wedd_Page_SaraAndAlex.Services;

namespace Wedd_Page_SaraAndAlex.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RsvpController : ControllerBase
    {
        private readonly IRsvpService _rsvpService;

        public RsvpController(IRsvpService rsvpService)
        {
            _rsvpService = rsvpService;
        }

        /// <summary>
        /// Submit an RSVP response (public endpoint)
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<RsvpResponsDto>> SubmitRsvp([FromBody] RsvpRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _rsvpService.SubmitRsvpAsync(request);
            return CreatedAtAction(nameof(SubmitRsvp), new { id = result.Id }, result);
        }
    }
}
