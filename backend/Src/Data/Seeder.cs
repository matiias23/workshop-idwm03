using System.Text;
using System.Text.Json;
using backend.Src.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Data
{
    public class Seeder
    {
        public static async Task SeedUsers(DataContext dataContext)
    {
        
        var userData = await File.ReadAllTextAsync("Src/Data/Seed/UserSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<User>>(userData, options);

        foreach (var user in users)
        {

            dataContext.Users.Add(user);
        }

        await dataContext.SaveChangesAsync();
    }
    }
}