using backend.Src.Models;

namespace backend.Src.Interfaces
{
    public interface IUsersRepository
    {
        public Task<List<User>> GetAll();

        public Task<User> Add(User user);

        public Task<bool> IsEmailUnique(string email);

        public Task<bool> IsRutUnique(string rut);

        public Task<User?> GetByEmail(string email);
    }
}