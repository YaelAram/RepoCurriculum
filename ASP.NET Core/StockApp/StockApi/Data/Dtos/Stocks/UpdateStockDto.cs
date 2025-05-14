using System.ComponentModel.DataAnnotations;

namespace StockApi.Data.Dtos.Stocks;

public class UpdateStockDto
{
    [MinLength(1)]
    [MaxLength(80)]
    public string? CompanyName { get; init; }

    [Range(0.0, double.MaxValue)]
    public decimal? Price { get; init; }

    [Range(0.0, double.MaxValue)]
    public decimal? LastDiv { get; init; }

    [Range(0, long.MaxValue)]
    public long? MarketCapital { get; init; }

    public bool AreAllPropertiesNull()
    {
        return CompanyName is null && Price is null && LastDiv is null && MarketCapital is null;
    }
}
