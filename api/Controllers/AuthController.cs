using api.Helpers;
using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Data;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly BlogContext _context;

    public AuthController(BlogContext context)
    {
      _context = context;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("/auth/signin")]
    public async Task<IActionResult> AuthAsync([FromBody] User user)
    {
      try
      {
        var userExists = await _context.Users.FirstOrDefaultAsync(u => u.Name == user.Name);

        if (userExists == null)
          return Unauthorized("Invalid username or password.");

        if (!BCrypt.Net.BCrypt.Verify(user.Password, userExists.Password))
          return Unauthorized("Invalid username or password.");

        var token = JwtAuth.GenerateToken(userExists);

        return Ok(new
        {
          Token = token,
          Username = userExists.Name
        });
      }
      catch (Exception)
      {
        return BadRequest(new { Message = "An internal error occurred in the application, please try again." });
      }
    }
  }
}