using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockApi.Data.Models;

public class Stock
{
    public int Id { get; set; }

    [Required]
    [StringLength(60)]
    public string Symbol { get; set; } = string.Empty;

    [Required]
    [StringLength(80)]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal LastDiv { get; set; }

    [Required]
    [StringLength(80)]
    public string Industry { get; set; } = string.Empty;

    [Required]
    public long MarketCapital { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsDeleted { get; set; } = false;

    public DateTime? DeletedAt { get; set; } = null;

    public ICollection<Comment> Comments { get; set; } = [];
}
