using api.Helpers;
using Models;
using api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [ApiController]
  public class AuthController : ControllerBase
  {
    [HttpPost]
    [AllowAnonymous]
    [Route("/api/v1/auth")]
    public async Task<IActionResult> Auth([FromBody] User user)
    {
      try
      {

        var userExists = new UserRepository().GetByUsername(user.Username);

        if (userExists == null)
          return BadRequest(new { Message = "Email e/ou senha está(ão) inválido(s)." });


        if (userExists.Password != user.Password)
          return BadRequest(new { Message = "Email e/ou senha está(ão) inválido(s)." });


        var token = JwtAuth.GenerateToken(userExists);

        return Ok(new
        {
          Token = token,
          Usuario = userExists
        });

      }
      catch (Exception)
      {
        return BadRequest(new { Message = "Ocorreu algum erro interno na aplicação, por favor tente novamente." });
      }
    }
  }
}