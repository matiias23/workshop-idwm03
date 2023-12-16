using backend.Src.Models;
using backend.Src.DTOs;

namespace backend.Src.Interfaces;

public interface IAccountService
{
    Task<Account> AuthenticateAsync(LoginUserDto loginUserDto);

    Task<LoginResponseDto?> RegisterClient(RegisterDto registerDto);
}
