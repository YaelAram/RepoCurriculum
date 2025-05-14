using Microsoft.EntityFrameworkCore;
using StockApi.Data.Dtos.QueryParams;
using StockApi.Data.Dtos.Stocks;
using StockApi.Data.Mappers;
using StockApi.Data.Models;

namespace StockApi.Data.Repositories.Stocks;

public class StocksRepository(StockMarketContext context, StockDtoMapper stockMapper) : IStocksRepository
{
    private readonly StockMarketContext _context = context;

    private readonly StockDtoMapper _stockMapper = stockMapper;

    public async Task<List<StockDto>> GetPaginatedStocks(PaginatedStocks paginatedStocks)
    {
        IQueryable<Stock> stocksQuery = _context.Stocks
            .Where((stock) => !stock.IsDeleted);
        
        if (!string.IsNullOrEmpty(paginatedStocks.CompanyName))
            stocksQuery = stocksQuery.Where((stock) => stock.CompanyName.Contains(paginatedStocks.CompanyName));
        
        if (!string.IsNullOrEmpty(paginatedStocks.Industry))
            stocksQuery = stocksQuery.Where((stock) => stock.Industry.Contains(paginatedStocks.Industry));

        List<StockDto> stocks = await stocksQuery
            .OrderBy((stock) => stock.Id)
            .Skip(paginatedStocks.Skip)
            .Take(paginatedStocks.Limit)
            .Select((stock) => _stockMapper.ToStockDto(stock))
            .ToListAsync();

        return stocks;
    }

    public async Task<StockDto?> GetStockById(string hash)
    {
        int id = _stockMapper.DecodeId(hash);

        StockDto? stock = await _context.Stocks
            .Where((stock) => stock.Id == id)
            .Select(stock => _stockMapper.ToStockDto(stock))
            .FirstOrDefaultAsync();

        return stock;
    }

    public async Task<StockDto> CreateStock(CreateStockDto dto)
    {
        Stock stock = dto.ToStock();

        await _context.Stocks.AddAsync(stock);
        await _context.SaveChangesAsync();

        return _stockMapper.ToStockDto(stock);
    }

    public async Task<StockDto?> UpdateStock(string hash, UpdateStockDto dto)
    {
        int id = _stockMapper.DecodeId(hash);

        Stock? stock = await _context.Stocks.FirstOrDefaultAsync((stock) => stock.Id == id);
        if (stock is null) return null;

        if (dto.CompanyName is not null) stock.CompanyName = dto.CompanyName;
        if (dto.Price is not null) stock.Price = (decimal)dto.Price;
        if (dto.LastDiv is not null) stock.LastDiv = (decimal)dto.LastDiv;
        if (dto.MarketCapital is not null) stock.MarketCapital = (long)dto.MarketCapital;

        await _context.SaveChangesAsync();

        return _stockMapper.ToStockDto(stock);
    }

    public async Task<StockDto?> DeleteStock(string hash)
    {
        int id = _stockMapper.DecodeId(hash);

        Stock? stock = await _context.Stocks.FirstOrDefaultAsync((stock) => stock.Id == id);
        if (stock is null) return null;

        stock.IsDeleted = true;
        stock.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _stockMapper.ToStockDto(stock);
    }
}
