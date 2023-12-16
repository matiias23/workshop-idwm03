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
    
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Account> Accounts { get; set; } = null!;
}