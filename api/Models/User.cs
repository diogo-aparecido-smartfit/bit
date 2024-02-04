using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
  [Table("users")]
  public class User
  {
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public required string Name { get; set; }

    [Column("password")]
    public required string Password { get; set; }

  }
}