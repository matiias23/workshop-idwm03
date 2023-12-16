using backend.Src.Models;
using backend.Src.Interfaces;
using backend.Src.Data;
using backend.Src.DTOs;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using BCrypt;


namespace backend.Src.Services;

public class AccountService : IAccountService
{
    private readonly DataContext _context;
    private readonly IUsersRepository _usersRepository;

    public AccountService(DataContext context, IUsersRepository usersRepository)
    {
        _context = context;
        _usersRepository = usersRepository;
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

    public async Task<LoginResponseDto> RegisterClient(RegisterDto registerDto)
    {
        // Utilizar el RUT como contraseña
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Rut.Replace(".", "").Replace("-", ""), 12);

        // Crear un objeto de usuario 
        var user = new User
        {
            Rut = registerDto.Rut,
            Email = registerDto.Email,
            Fullname = registerDto.Fullname,
            BirthYear = registerDto.BirthYear,
            Password = passwordHash,
        };

        // Agregar el usuario a través del repositorio de usuarios 
        var addedUser = await _usersRepository.Add(user);

        // Crear un token JWT para el usuario recién registrado
        var token = CreateToken(addedUser);

        // Devolver un objeto de respuesta con el token y el nombre de usuario
        return new LoginResponseDto
        {
            Token = token,
            Email = addedUser.Email,
        };
    }

         private string CreateToken(User user)
        {
            // Implementación de GenerateJwtToken
            var key = Encoding.ASCII.GetBytes("SuperSecretKeyWorkshop");
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    // Otros claims según sea necesario
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Ajusta la duración del token según tus necesidades
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }


