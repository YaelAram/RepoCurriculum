using StockApi.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.Stocks;

public record CreateStockDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(60)]
    public required string Symbol { get; init; }

    [Required]
    [MinLength(1)]
    [MaxLength(80)]
    public required string CompanyName { get; init; }

    [Required]
    [Range(0.0, double.MaxValue)]
    public required decimal Price { get; init; }

    [Required]
    [Range(0.0, double.MaxValue)]
    public required decimal LastDiv { get; init; }

    [Required]
    [MinLength(1)]
    [MaxLength(80)]
    public required string Industry { get; init; }

    [Required]
    [Range(0, long.MaxValue)]
    public required long MarketCapital { get; init; }
}

public static class CreateStockDtoMapper
{
    public static Stock ToStock(this CreateStockDto dto)
    {
        return new Stock
        {
            Symbol = dto.Symbol,
            CompanyName = dto.CompanyName,
            Price = dto.Price,
            LastDiv = dto.LastDiv,
            Industry = dto.Industry,
            MarketCapital = dto.MarketCapital,
        };
    }
}
