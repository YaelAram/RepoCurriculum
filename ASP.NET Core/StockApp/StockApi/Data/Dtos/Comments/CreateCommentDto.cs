using StockApi.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.Comments;

public record CreateCommentDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(100)]
    public required string Title { get; init; }

    [Required]
    [MinLength(1)]
    [MaxLength(400)]
    public required string Content { get; init; }

    [Required]
    [Range(0, int.MaxValue)]
    public required int StockId { get; init; }
}

public static class CreateCommentDtoMapper
{
    public static Comment ToComment(this CreateCommentDto dto)
    {
        return new Comment
        {
            Title = dto.Title,
            Content = dto.Content,
            StockId = dto.StockId,
        };
    }
}
