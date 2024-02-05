using Data;
using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class PostsController : ControllerBase
{
  private readonly BlogContext _context;

  public PostsController(BlogContext context)
  {
    _context = context;
  }

  // GET: /posts
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
  {
    return await _context.Posts.ToListAsync();
  }

  // GET: /posts/5
  [HttpGet("{slug}")]
  public async Task<ActionResult<Post>> GetPost(string slug)
  {
    // var post = await _context.Posts.FindAsync(slug);
    var post = await _context.Posts.FirstOrDefaultAsync(post => post.Slug == slug);

    if (post == null)
    {
      return NotFound();
    }

    return post;
  }

  // POST: /posts
  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Post>> PostPost(Post post)
  {
    post.Slug = SlugUtility.GenerateSlug(post.Title);

    _context.Posts.Add(post);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
  }

  // PUT: /posts/5
  [HttpPut("{id}")]
  [Authorize]
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

  // DELETE: /posts/5
  [HttpDelete("{id}")]
  [Authorize]
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

}