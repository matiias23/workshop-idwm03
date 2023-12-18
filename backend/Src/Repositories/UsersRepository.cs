using backend.Src.Data;
using backend.Src.Models;
using backend.Src.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Repositories
{
    // Repositorio que implementa la interfaz IUsersRepository para realizar operaciones en la base de datos de usuarios
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;

        // Constructor que recibe una instancia de DataContext para acceder a la base de datos
        public UsersRepository(DataContext context)
        {
            _context = context;
        }

        // Agregar un nuevo usuario a la base de datos
        public async Task<User> Add(User user)
        {
            var createdUser = (await _context.Users.AddAsync(user)).Entity;
            await _context.SaveChangesAsync();
            return createdUser;
        }

        // Obtener todos los usuarios de la base de datos
        public async Task<List<User>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        // Verificar si un correo electrónico ya está en uso por otro usuario
        public async Task<bool> IsEmailUnique(string email)
        {
            return await _context.Users.AllAsync(u => u.Email != email);
        }

        // Verificar si un RUT ya está en uso por otro usuario
        public async Task<bool> IsRutUnique(string rut)
        {
            return await _context.Users.AllAsync(u => u.Rut != rut);
        }

        // Obtener un usuario por su dirección de correo electrónico
        public async Task<User?> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        // Obtener un usuario por su ID
        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        // Actualizar la información de un usuario en la base de datos
        public async Task<bool> UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

        // Obtener un usuario por su RUT
        public async Task<User> GetUserByRut(string rut)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Rut == rut);
        }
    }
}
