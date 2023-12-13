using Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
  public class PostContext : DbContext
  {
    public PostContext(DbContextOptions<PostContext> options) : base(options) { }




    public DbSet<Post> Posts { get; set; }
  }
}