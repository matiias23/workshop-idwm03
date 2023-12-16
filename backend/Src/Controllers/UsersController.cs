using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Src.Data;
using backend.Src.Interfaces;
using backend.Src.Models;
using backend.Src.DTOs;
using backend.Src.Repositories;
using System.Text;
using backend.Src.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Src.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAccountService _accountService;
        private readonly IUsersRepository _usersRepository;

        public UsersController(DataContext context, IAccountService accountService, IUsersRepository usersRepository)
        {
            _context = context;
            _accountService = accountService;
            _usersRepository = usersRepository;

        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
        

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            //Console.WriteLine("obj:"+account);
            
            var user= await _accountService.AuthenticateAsync(loginUserDto);
            //Console.WriteLine("user: "+user);
            
            if (user == null )
                return BadRequest("Las credenciales de acceso son incorrectas o el usuario no está registrado en el sistema");
            var token = GenerateJwtToken(user);
            return Ok(new { Usuario = user, Token =token});
        }

        private string GenerateJwtToken(Account user)
        {
            // Implementación de GenerateJwtToken
            var key = Encoding.ASCII.GetBytes("SuperSecretKeyDumbo");
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    // Otros claims según sea necesario
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Ajusta la duración del token según tus necesidades
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<ActionResult<LoginResponseDto>> RegisterClient(RegisterDto registerDto)
        {
            if (!await _usersRepository.IsEmailUnique(registerDto.Email.ToLower()))
                return BadRequest("El correo electrónico ya existe");

            if (!await _usersRepository.IsRutUnique(registerDto.Rut.ToLower()))
                return BadRequest("El Rut ya existe");

            if (registerDto.BirthYear < 1900 || registerDto.BirthYear > DateTime.Now.Year)
                return BadRequest("El año de nacimiento debe estar entre 1900 y el año actual");

            var response = await _accountService.RegisterClient(registerDto);
            return Ok(response);
        }

    }

}