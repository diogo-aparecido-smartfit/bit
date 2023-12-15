using System;
using System.Text;
using System.Security.Claims;
using Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace api.Helpers
{
  public static class JwtAuth
  {
    public static string GenerateToken(User user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();

      //chave secreta, geralmente se coloca em arquivo de configuração
      var key = Encoding.ASCII.GetBytes("4WhSN7AXyhEO8EZxEgKnGL7lQxztJh8R");

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
                    new Claim(ClaimTypes.Name, user.Username.ToString()),
          }),
        Expires = DateTime.UtcNow.AddHours(10),

        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}