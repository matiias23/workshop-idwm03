using backend.Src.Data;
using backend.Src.Models;
using backend.Src.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;

        public UsersRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Add(User user)
        {
            var createdUser = (await _context.Users.AddAsync(user)).Entity;
            await _context.SaveChangesAsync();
            return createdUser;
        }

        public async Task<List<User>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<bool> IsEmailUnique(string email)
        {
            return await _context.Users.AllAsync(u => u.Email != email);
        }

        public async Task<bool> IsRutUnique(string rut)
        {
            return await _context.Users.AllAsync(u => u.Rut != rut);
        }
        
    }
}