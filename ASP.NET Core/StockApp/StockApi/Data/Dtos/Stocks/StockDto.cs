namespace StockApi.Data.Dtos.Stocks;

public record StockDto
{
    public required string Id { get; init; }

    public required string Symbol { get; init; }

    public required string CompanyName { get; init; }

    public required decimal Price { get; init; }

    public required decimal LastDiv { get; init; }

    public required string Industry { get; init; }

    public required long MarketCapital { get; init; }
}
