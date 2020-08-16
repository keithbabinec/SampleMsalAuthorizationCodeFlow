using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MsalAuthorizationCodeFlowApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        // this is a sample endpoint that requires 'AdminUser' role access,
        // as defined in the AAD app registration manifest and assigned via AAD
        // users and groups.
        [HttpGet()]
        [Route("admin")]
        [Authorize(Roles = "MyAppAdministratorsRole")]
        public async Task<ActionResult<string>> AdminRoleGet()
        {
            // simulate some activity then return a result.

            await Task.Delay(TimeSpan.FromMilliseconds(50)).ConfigureAwait(false);
            
            return Ok("Successfully called the api/test/admin endpoint.");
        }

        // this is a sample endpoint that requires 'StandardUser' role access,
        // as defined in the AAD app registration manifest and assigned via AAD
        // users and groups.
        [HttpGet()]
        [Route("standard")]
        [Authorize(Roles = "MyAppUsersRole")]
        public async Task<ActionResult<string>> StandardRoleGet()
        {
            // simulate some activity then return a result.

            await Task.Delay(TimeSpan.FromMilliseconds(50)).ConfigureAwait(false);

            return Ok("Successfully called the api/test/standard endpoint.");
        }

        // this is a sample endpoint that requires no authentication at all.
        // it is wide open to the public internet.
        [HttpGet()]
        [Route("noauth")]
        public async Task<ActionResult<string>> NoAuthGet()
        {
            // simulate some activity then return a result.

            await Task.Delay(TimeSpan.FromMilliseconds(50)).ConfigureAwait(false);

            return Ok("Successfully called the api/test/noauth endpoint.");
        }
    }
}