using Microsoft.EntityFrameworkCore;
using StockApi.Data.Dtos.Comments;
using StockApi.Data.Dtos.QueryParams;
using StockApi.Data.Mappers;
using StockApi.Data.Models;

namespace StockApi.Data.Repositories.Comments;

public class CommentsRepository(
    StockMarketContext context, CommentDtoMapper commentMapper, StockDtoMapper stockMapper
) : ICommentsRepository
{
    private readonly StockMarketContext _context = context;

    private readonly CommentDtoMapper _commentMapper = commentMapper;

    private readonly StockDtoMapper _stockMapper = stockMapper;

    public async Task<List<CommentDto>> GetPaginatedComments(string hashStockId, PaginatedComments paginatedComments)
    {
        int stockId = _stockMapper.DecodeId(hashStockId);

        List<CommentDto> comments = await _context.Comments
            .Where((comment) => comment.StockId == stockId)
            .Where((comment) => !comment.IsDeleted)
            .OrderBy((comment) => comment.Id)
            .Skip(paginatedComments.Skip)
            .Take(paginatedComments.Limit)
            .Select((comment) => _commentMapper.ToCommentDto(comment))
            .ToListAsync();

        return comments;
    }

    public async Task<CommentDto?> GetCommentById(string hash)
    {
        int id = _commentMapper.DecodeId(hash);

        CommentDto? comment = await _context.Comments
            .Where((comment) => comment.Id == id)
            .Select((comment) => _commentMapper.ToCommentDto(comment))
            .FirstOrDefaultAsync();

        return comment;
    }

    public async Task<CommentDto?> CreateComment(CreateCommentDto dto)
    {
        Stock? stock = await _context.Stocks.FirstOrDefaultAsync((stock) => stock.Id == dto.StockId);
        if (stock is null) return null;

        Comment comment = dto.ToComment();
        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();

        return _commentMapper.ToCommentDto(comment);
    }

    public async Task<CommentDto?> UpdateComment(string hash, UpdateCommentDto dto)
    {
        int id = _commentMapper.DecodeId(hash);

        Comment? comment = await _context.Comments.FirstOrDefaultAsync((comment) => comment.Id == id);
        if (comment is null) return null;

        if (dto.Title is not null) comment.Title = dto.Title;
        if (dto.Content is not null) comment.Content = dto.Content;

        await _context.SaveChangesAsync();

        return _commentMapper.ToCommentDto(comment);
    }

    public async Task<CommentDto?> DeleteComment(string hash)
    {
        int id = _commentMapper.DecodeId(hash);

        Comment? comment = await _context.Comments.FirstOrDefaultAsync((comment) => comment.Id == id);
        if (comment is null) return null;

        comment.IsDeleted = true;
        comment.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _commentMapper.ToCommentDto(comment);
    }
}
