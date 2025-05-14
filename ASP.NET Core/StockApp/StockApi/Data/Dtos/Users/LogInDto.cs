using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.Users;

public class LogInDto
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(8)]
    public required string Password { get; set; }
}
