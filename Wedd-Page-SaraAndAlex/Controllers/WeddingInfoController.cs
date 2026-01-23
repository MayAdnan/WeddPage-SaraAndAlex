using Microsoft.AspNetCore.Mvc;
using Wedd_Page_SaraAndAlex.DTOs;
using Wedd_Page_SaraAndAlex.Services;

namespace Wedd_Page_SaraAndAlex.Controllers
{
    [ApiController]
    [Route("api/wedding")]
    public class WeddingInfoController : ControllerBase
    {
        private readonly IWeddingInfoService _weddingInfoService;

        public WeddingInfoController(IWeddingInfoService weddingInfoService)
        {
            _weddingInfoService = weddingInfoService;
        }

        /// <summary>
        /// Get wedding information (public endpoint)
        /// </summary>
        [HttpGet("info")]
        public async Task<ActionResult<WeddingInfoDto>> GetWeddingInfo()
        {
            var info = await _weddingInfoService.GetWeddingInfoAsync();
            
            if (info == null)
            {
                return NotFound(new { message = "Wedding information not available yet" });
            }

            return Ok(info);
        }
    }
}

