namespace backend.Src.Models
{
    public class Account
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
        
        public int RoleId { get; set; } 

        public Role Role { get; set; } = null!;
        
    }
}