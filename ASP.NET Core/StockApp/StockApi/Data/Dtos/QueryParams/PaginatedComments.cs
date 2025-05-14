using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.QueryParams;

public class PaginatedComments
{
    [Range(0, 30)]
    public int Limit { get; init; } = 10;

    [Range(0, int.MaxValue)]
    public int Skip { get; init; } = 0;
}
