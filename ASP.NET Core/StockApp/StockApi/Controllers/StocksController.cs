using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StockApi.Data.Dtos.QueryParams;
using StockApi.Data.Dtos.Stocks;
using StockApi.Data.Repositories.Stocks;

namespace StockApi.Controllers;

[Authorize]
[Route("/api/stocks")]
[ApiController]
[EnableRateLimiting("open")]
public class StocksController(IStocksRepository repository) : ControllerBase
{
    private readonly IStocksRepository _repository = repository;

    [HttpGet]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> GetAllStocks([FromQuery] PaginatedStocks paginatedStocks)
    {
        List<StockDto> stocks = await _repository.GetPaginatedStocks(paginatedStocks);
        return Ok(new { Stocks = stocks });
    }

    [HttpGet("{stockId}", Name = "StockById")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetStockById(string stockId)
    {
        StockDto? stock = await _repository.GetStockById(stockId);

        return (stock is null) ? 
            Problem(title: "Stock not found", detail: $"ID {stockId} not found", statusCode: 404) : 
            Ok(new { Stock = stock });
    }

    [HttpPost]
    public async Task<IActionResult> CreateStock(CreateStockDto dto)
    {
        StockDto stock = await _repository.CreateStock(dto);
        return CreatedAtRoute("StockById", new { stockId =  stock.Id }, stock);
    }

    [HttpPatch("{stockId}")]
    public async Task<IActionResult> UpdateStock(string stockId, UpdateStockDto dto)
    {
        if (dto.AreAllPropertiesNull()) return Problem(title: "No props to update", detail: "All properties are null", statusCode: 400);

        StockDto? stock = await _repository.UpdateStock(stockId, dto);
        if (stock is null) return Problem(title: "Stock not found", detail: $"ID {stockId} not found", statusCode: 404);

        return NoContent();
    }

    [HttpDelete("{stockId}")]
    public async Task<IActionResult> DeleteStock(string stockId)
    {
        StockDto? stock = await _repository.DeleteStock(stockId);
        if (stock is null) return Problem(title: "Stock not found", detail: $"ID {stockId} not found", statusCode: 404);

        return NoContent();
    }
}
