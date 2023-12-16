using System.ComponentModel.DataAnnotations;

namespace backend.Src.DTOs
{
    public class RepositoryDto
    {
        
        public string Name { get; set; } = null!;

        public DateTimeOffset CreatedAt { get; set; } = DateTime.Now;

        public DateTimeOffset UpdatedAt { get; set; } = DateTime.Now;

        public int CommitsAmount { get; set; }
        
    }
}