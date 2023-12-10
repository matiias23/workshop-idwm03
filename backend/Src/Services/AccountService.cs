using backend.Src.Models;
using backend.Src.Interfaces;
using backend.Src.Data;
using backend.Src.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Services;

public class AccountService : IAccountService
{
    private readonly DataContext _context;

    public AccountService(DataContext context)
    {
        _context = context;
    }

    public async Task<Account> AuthenticateAsync(LoginUserDto loginUserDto)
    {
        // Lógica de autenticación, por ejemplo, acceder a la base de datos para verificar las credenciales
        var user = await _context.Accounts.SingleOrDefaultAsync(x => x.Username == loginUserDto.Username && x.Password == loginUserDto.Password);

        if (user != null && user.Password == loginUserDto.Password)
        {
            return user;
        }

        return null;
    }
}

