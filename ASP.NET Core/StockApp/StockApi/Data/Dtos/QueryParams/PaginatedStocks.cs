using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.QueryParams;

public record PaginatedStocks
{
    [Range(0, 30)]
    public int Limit { get; init; } = 10;

    [Range(0, int.MaxValue)]
    public int Skip { get; init; } = 0;

    [MinLength(1)]
    [MaxLength(80)]
    public string? CompanyName { get; init; }

    [MinLength(1)]
    [MaxLength(80)]
    public string? Industry { get; init; }
}
