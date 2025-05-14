namespace StockApi.Data.Dtos.Comments;

public record CommentDto
{
    public required string Id { get; init; }

    public required string Title { get; init; }

    public required string Content { get; init; }

    public required DateTime CreatedAt { get; init; }

    public required string StockId { get; init; }
}
