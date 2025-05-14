using StockApi.Data.Models;

namespace StockApi.Data.Dtos.Users;

public record UserDto
{
    public required string Id { get; init; }

    public required string Name { get; set; }

    public required string LastName { get; set; }

    public required string? UserName { get; set; }

    public required string? Email { get; set; }
}

public static class UserDtoMapper
{
    public static UserDto ToUserDto(this User user)
    {
        return new UserDto 
        { 
            Id = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            UserName = user.UserName,
            Email = user.Email
        };
    }
}
