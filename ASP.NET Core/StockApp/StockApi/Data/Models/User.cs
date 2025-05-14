using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Models;

public class User : IdentityUser
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string LastName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsDeleted { get; set; } = false;

    public DateTime? DeletedAt { get; set; } = null;
}
