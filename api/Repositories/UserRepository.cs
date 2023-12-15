using Models;

namespace api.Repositories;

public class UserRepository
{
    public static IList<User> Users = new List<User>
        {

            new User
            {
                Username = "root",
                Password = "root"
            },
        };

    public User GetByUsername(string username)
    {
        return Users.Where(x => x.Username.ToLower() == username.ToLower())
            .FirstOrDefault();
    }
}