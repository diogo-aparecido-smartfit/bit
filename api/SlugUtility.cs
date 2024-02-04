using System.Text.RegularExpressions;

public static class SlugUtility
{
  public static string GenerateSlug(string input)
  {
    string slug = input.ToLower();
    slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
    slug = slug.Replace(' ', '-');
    slug = Regex.Replace(slug, @"-+", "-");
    if (slug.Length > 50)
    {
      slug = slug.Substring(0, 50);
    }
    slug = slug.Trim('-');
    return slug;
  }
}
