using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Src.Models
{
    [Table("Users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("Rut")]
        public string Rut { get; set; }
        [Column("Name")]     
        public string Name { get; set; }
        [Column("LastName")]
        public string LastName { get; set; }
        [Column("Email")]
        public string Email { get; set; }
        [Column("Points")]
        public int Points { get; set; }
   
    }
}