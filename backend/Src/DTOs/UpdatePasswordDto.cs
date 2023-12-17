using System.ComponentModel.DataAnnotations;
using backend.Src.DataAnnotations;

namespace backend.Src.DTOs
{
    public class UpdatePasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }
        
        [Required]
        public string NewPassword { get; set; }
        
    }
}