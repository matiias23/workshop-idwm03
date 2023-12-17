using System.ComponentModel.DataAnnotations;
using backend.Src.DataAnnotations;

namespace backend.Src.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }


        public string Email { get; set; } 


        public string Fullname { get; set; } 


        public int BirthYear { get; set; } 
        
    }
}