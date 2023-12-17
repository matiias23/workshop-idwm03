using System.ComponentModel.DataAnnotations;

namespace backend.Src.DTOs
{
    public class LoginResponseDto
    {   
        public string Token { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Rut { get; set; } = null!;
    }
}