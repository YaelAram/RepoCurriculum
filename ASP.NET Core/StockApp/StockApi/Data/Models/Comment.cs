using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Models;

public class Comment
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(400)]
    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsDeleted { get; set; } = false;

    public DateTime? DeletedAt { get; set; } = null;

    public int StockId { get; set; }

    public virtual Stock Stock { get; set; } = null!;
}
