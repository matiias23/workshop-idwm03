using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Src.Data;
using backend.Src.Interfaces;
using backend.Src.Models;
using backend.Src.DTOs;
using System.Text;
using backend.Src.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAccountService _accountService;

        public UsersController(DataContext context, IAccountService accountService)
        {
            _context = context;
            _accountService = accountService;

        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> AllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(); 
            }

            return user;
        }


        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User newUser)
        {
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            

            if (user == null)
            {
                return NotFound("No se encontro el id"); 
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent(); // Retorna un 204 si la eliminación fue exitosa.
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateUser(int id, User updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(); // Retorna un 404 si el usuario con el ID proporcionado no se encuentra.
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Retorna un 204 si la actualización fue exitosa.
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

    }

}