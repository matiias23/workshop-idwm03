namespace backend.Src.Models
{
    public class Role
    {     
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        
        public List<Account> Accounts { get; set; } = new();
    }
}