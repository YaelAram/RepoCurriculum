using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.Comments;

public class UpdateCommentDto
{
    [MinLength(1)]
    [MaxLength(100)]
    public string? Title { get; init; }

    [MinLength(1)]
    [MaxLength(400)]
    public string? Content { get; init; }

    public bool AreAllPropertiesNull()
    {
        return Title is null && Content is null;
    }
}
