using System.ComponentModel.DataAnnotations;
using backend.Src.DataAnnotations;

namespace backend.Src.DTOs
{
    public class UpdateUserDto
    {
        [Required]
        [UCNEmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Fullname { get; set; } = null!;

        [Required]
        public int BirthYear { get; set; } 
        
    }
}