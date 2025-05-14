using StockApi.Data.Dtos.Comments;
using StockApi.Data.Dtos.QueryParams;

namespace StockApi.Data.Repositories.Comments;

public interface ICommentsRepository
{
    public Task<List<CommentDto>> GetPaginatedComments(string hashStockId, PaginatedComments paginatedComments);

    public Task<CommentDto?> GetCommentById(string hash);

    public Task<CommentDto?> CreateComment(CreateCommentDto dto);

    public Task<CommentDto?> UpdateComment(string hash, UpdateCommentDto dto);

    public Task<CommentDto?> DeleteComment(string hash);
}
