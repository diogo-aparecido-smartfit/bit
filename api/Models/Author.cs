using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
  [Table("authors")]
  public class Author
  {
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public required string Name { get; set; }
  }
}