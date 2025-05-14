using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using StockApi.Configuration;
using StockApi.Data;
using StockApi.Data.Mappers;
using StockApi.Data.Repositories.Comments;
using StockApi.Data.Repositories.Stocks;
using StockApi.Extensions;
using StockApi.Filters;
using StockApi.Services.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.Configure<PostgreSqlSettings>(builder.Configuration.GetSection("PostgreSqlSettings"));
builder.Services.AddDbContext<StockMarketContext>((serviceProvider, options) =>
{
    PostgreSqlSettings settings = serviceProvider.GetRequiredService<IOptions<PostgreSqlSettings>>().Value;
    options.UseNpgsql(settings.ConnectionString);
});

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSetting"));
builder.ConfigureIdentity();
builder.ConfigureAuthenticationAndBearerJwt();
builder.Services.AddScoped<ITokenService, JwtService>();

builder.Services.Configure<SqidSettings>(builder.Configuration.GetSection("SqidSettings"));
builder.Services.AddSingleton<StockDtoMapper>();
builder.Services.AddSingleton<CommentDtoMapper>();

builder.Services.AddScoped<IStocksRepository, StocksRepository>();
builder.Services.AddScoped<ICommentsRepository, CommentsRepository>();

builder.Services.AddScoped<CheckRefreshTokenFilter>();
builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; });

builder.ConfigureRateLimit();
builder.ConfigureCors();

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.UseHttpsRedirection();

app.UseRateLimiter();
app.UseCors(app.Environment.IsDevelopment() ? "open" : "restricted");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
