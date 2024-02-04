using Data;
using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
  private readonly BlogContext _context;

  public UsersController(BlogContext context)
  {
    _context = context;
  }

  // GET: /users
  [HttpGet]
  public async Task<ActionResult<IEnumerable<User>>> GetUsers()
  {
    return await _context.Users.ToListAsync();
  }

  // GET: /users/5
  [HttpGet("{id}")]
  public async Task<ActionResult<User>> GetUser(int id)
  {
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
      return NotFound();
    }

    return user;
  }

  // POST: /users
  [HttpPost]
  public async Task<ActionResult<User>> PostUser(User user)
  {
    // encrypt the user password before send to psql db
    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
  }

  // DELETE: /users/5
  [HttpDelete("{id}")]
  // [Authorize]
  public async Task<IActionResult> DeleteUser(int id)
  {
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
      return NotFound();
    }

    _context.Users.Remove(user);
    await _context.SaveChangesAsync();

    return NoContent();
  }

  // endpoint fictício para testar a conexão com o db
  [HttpGet("test")]

  public string Test()
  {
    return "🚀 Hello World";
  }
}