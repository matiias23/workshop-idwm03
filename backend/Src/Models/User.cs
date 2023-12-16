using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Src.Models
{
    [Table("Users")]
    public class User
    {
        public int Id { get; set; }


        public string Rut { get; set; }


        public string Email { get; set; }

        [StringLength(150, MinimumLength = 10, ErrorMessage = "La longitud del campo Fullname debe estar entre 10 y 150 caracteres.")]
        public string Fullname { get; set; }


        public int BirthYear { get; set; }


        public string Password { get; set; } = string.Empty;

        
    }
}