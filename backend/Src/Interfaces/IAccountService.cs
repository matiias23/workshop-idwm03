using backend.Src.Models;
using backend.Src.DTOs;

namespace backend.Src.Interfaces;

public interface IAccountService
{
    Task<LoginResponseDto?> Login(LoginUserDto loginUserDto);

    Task<LoginResponseDto?> RegisterClient(RegisterDto registerDto);

    Task UpdatePassword(User user, string newPassword);

    Task<bool> VerifyPassword(User user, string currentPassword);
}
