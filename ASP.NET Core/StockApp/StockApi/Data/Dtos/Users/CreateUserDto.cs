using StockApi.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.Users;

public record CreateUserDto
{
    [Required]
    public required string UserName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(8)]
    public required string Password { get; set; }

    [Required]
    [StringLength(50)]
    public required string Name { get; set; }

    [Required]
    [StringLength(50)]
    public required string LastName { get; set; }
}

public static class CreateUserDtoMapper
{
    public static User ToUser(this CreateUserDto dto)
    {
        return new User()
        {
            UserName = dto.UserName,
            Email = dto.Email,
            Name = dto.Name,
            LastName = dto.LastName,
        };
    }
}
