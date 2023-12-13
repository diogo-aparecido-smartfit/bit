using Data;
using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class PostsController : ControllerBase
{
  readonly PostContext _context;

  public PostsController(PostContext context)
  {
    _context = context;
  }

  // GET: api/posts
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
  {
    return await _context.Posts.ToListAsync();
  }

  // GET: api/posts/5
  [HttpGet("{id}")]
  public async Task<ActionResult<Post>> GetPost(int id)
  {
    var post = await _context.Posts.FindAsync(id);

    if (post == null)
    {
      return NotFound();
    }

    return post;
  }

  // POST: api/posts
  [HttpPost]
  public async Task<ActionResult<Post>> PostPost(Post post)
  {
    _context.Posts.Add(post);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
  }

  // PUT: api/posts/5
  [HttpPut("{id}")]
  public async Task<IActionResult> PutPost(int id, Post post)
  {
    if (id != post.Id)
    {
      return BadRequest();
    }

    _context.Entry(post).State = EntityState.Modified;
    await _context.SaveChangesAsync();

    return NoContent();
  }

  // DELETE: api/posts/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeletePost(int id)
  {
    var post = await _context.Posts.FindAsync(id);

    if (post == null)
    {
      return NotFound();
    }

    _context.Posts.Remove(post);
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