using backend.Src.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public void InitializeData()
    {
        if (!Roles.Any())
        {
            var adminRole = new Role { Name = "Admin" };
            var userRole = new Role { Name = "User" };

            Roles.Add(adminRole);
            Roles.Add(userRole);

            SaveChanges();
        }

        if (!Accounts.Any())
        {
            var adminUser = new Account
            {
                Username = "Ochietto",
                Password = "Jaqamain3pals",
                RoleId = Roles.Single(r => r.Name == "Admin").Id
            };

            Accounts.Add(adminUser);

            SaveChanges();
        }
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<Role> Roles { get; set; } = null!;
}