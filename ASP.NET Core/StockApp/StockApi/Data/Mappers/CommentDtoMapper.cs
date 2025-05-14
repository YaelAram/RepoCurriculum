using Microsoft.Extensions.Options;
using Sqids;
using StockApi.Configuration;
using StockApi.Data.Dtos.Comments;
using StockApi.Data.Models;

namespace StockApi.Data.Mappers;

public class CommentDtoMapper
{
    private readonly SqidsEncoder<int> encoder;

    private readonly StockDtoMapper stockMapper;

    public CommentDtoMapper(IOptions<SqidSettings> options, StockDtoMapper mapper)
    {
        SqidSettings settings = options.Value;
        encoder = new SqidsEncoder<int>(new SqidsOptions{ Alphabet = settings.CommentsAlphabet, MinLength = settings.HashSize });
        stockMapper = mapper;
    }

    public int DecodeId(string hash) => encoder.Decode(hash).Single();

    public CommentDto ToCommentDto(Comment comment)
    {
        return new CommentDto
        {
            Id = encoder.Encode(comment.Id),
            Title = comment.Title,
            Content = comment.Content,
            CreatedAt = comment.CreatedAt,
            StockId = stockMapper.EncodeId(comment.StockId),
        };
    }
}
