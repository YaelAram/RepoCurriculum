using StockApi.Data.Dtos.QueryParams;
using StockApi.Data.Dtos.Stocks;

namespace StockApi.Data.Repositories.Stocks;

public interface IStocksRepository
{
    public Task<List<StockDto>> GetPaginatedStocks(PaginatedStocks paginatedStocks);

    public Task<StockDto?> GetStockById(string hash);

    public Task<StockDto> CreateStock(CreateStockDto dto);

    public Task<StockDto?> UpdateStock(string hash, UpdateStockDto dto);

    public Task<StockDto?> DeleteStock(string hash);
}
