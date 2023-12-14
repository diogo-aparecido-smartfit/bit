using System.Text;

namespace api.Middlewares
{
  public class AuthMiddleware
  {
    private readonly RequestDelegate _next;

    public AuthMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      var requestMethod = context.Request.Method.ToUpperInvariant();
      var requestPath = context.Request.Path.Value;

      if (!string.IsNullOrEmpty(requestPath) && requestPath.Contains("posts", StringComparison.OrdinalIgnoreCase) && requestMethod == "GET")
      {
        await _next(context);
        return;
      }


      if (!context.Request.Headers.ContainsKey("Authorization"))
      {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Unauthorized");
        return;
      }

      var header = context.Request.Headers.Authorization.ToString();
      var encodedCreds = header.Substring(6);
      var creds = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCreds));
      string[] uidpwd = creds.Split(":");
      var uid = uidpwd[0];
      var password = uidpwd[1];

      if (uid != "admin" || password != "admin")
      {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Unauthorized");
        return;
      }

      await _next(context);
    }
  }
}