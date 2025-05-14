using Microsoft.Extensions.Options;
using Sqids;
using StockApi.Configuration;
using StockApi.Data.Dtos.Stocks;
using StockApi.Data.Models;

namespace StockApi.Data.Mappers;

public class StockDtoMapper
{
    private readonly SqidsEncoder<int> encoder;

    public StockDtoMapper(IOptions<SqidSettings> options)
    {
        SqidSettings settings = options.Value;
        encoder = new SqidsEncoder<int>(new SqidsOptions { Alphabet = settings.Alphabet, MinLength = settings.HashSize });
    }

    public string EncodeId(int id) => encoder.Encode(id);

    public int DecodeId(string hash) => encoder.Decode(hash).Single();

    public StockDto ToStockDto(Stock stock)
    {
        return new StockDto
        {
            Id = EncodeId(stock.Id),
            Symbol = stock.Symbol,
            CompanyName = stock.CompanyName,
            Price = stock.Price,
            LastDiv = stock.LastDiv,
            Industry = stock.Industry,
            MarketCapital = stock.MarketCapital
        };
    }
}
