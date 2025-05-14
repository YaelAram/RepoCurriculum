using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StockApi.Data.Dtos.Comments;
using StockApi.Data.Dtos.QueryParams;
using StockApi.Data.Repositories.Comments;

namespace StockApi.Controllers;

[Route("/api/comments")]
[ApiController]
[EnableRateLimiting("open")]
public class CommentsController(ICommentsRepository repository) : ControllerBase
{
    private readonly ICommentsRepository _repository = repository;

    [HttpGet("stock/{stockId}")]
    public async Task<IActionResult> GetPaginatedComments(string stockId, [FromQuery] PaginatedComments paginatedComments)
    {
        List<CommentDto> comments = await _repository.GetPaginatedComments(stockId, paginatedComments);
        return Ok(new { Comments = comments });
    }

    [HttpGet("{commentId}", Name = "CommentById")]
    public async Task<IActionResult> GetCommentById(string commentId)
    {
        CommentDto? comment = await _repository.GetCommentById(commentId);
        if (comment is null) return Problem(title: "Comment not found", detail: $"ID {commentId} not found", statusCode: 404);

        return Ok(comment);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment(CreateCommentDto dto)
    {
        CommentDto? comment = await _repository.CreateComment(dto);
        if (comment is null) return Problem(title: "No stock related", detail: $"No stock with ID {dto.StockId}", statusCode: 400);

        return CreatedAtRoute("CommentById", new { commentId = comment.Id }, comment);
    }

    [HttpPatch("{commentId}")]
    public async Task<IActionResult> UpdateComment(string commentId, UpdateCommentDto dto)
    {
        if (dto.AreAllPropertiesNull()) return Problem(title: "No props to update", detail: "All properties are null", statusCode: 400);

        CommentDto? comment = await _repository.UpdateComment(commentId, dto);
        if (comment is null) return Problem(title: "Comment not found", detail: $"ID {commentId} not found", statusCode: 404);

        return NoContent();
    }

    [HttpDelete("{commentId}")]
    public async Task<IActionResult> DeleteComment(string commentId)
    {
        CommentDto? comment = await _repository.DeleteComment(commentId);
        if (comment is null) return Problem(title: "Comment not found", detail: $"ID {commentId} not found", statusCode: 404);

        return NoContent();
    }
}
