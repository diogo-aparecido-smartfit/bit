using Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
  public class BlogContext : DbContext
  {
    public BlogContext(DbContextOptions<BlogContext> options) : base(options)
    {

    }

    public DbSet<Post> Posts { get; set; }
  }
}