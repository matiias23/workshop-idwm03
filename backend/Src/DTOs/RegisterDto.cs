using System.ComponentModel.DataAnnotations;
using backend.Src.DataAnnotations;

namespace backend.Src.DTOs
{
    public class RegisterDto
    {
        [Required]
        [UCNEmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [Rut]
        public string Rut { get; set; } = null!;

        [Required]
        public string Fullname { get; set; } = null!;

        [Required]
        public int BirthYear { get; set; } 
        
    }
}