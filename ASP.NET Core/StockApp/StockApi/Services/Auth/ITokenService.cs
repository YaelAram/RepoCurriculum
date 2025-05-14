using StockApi.Data.Models;

namespace StockApi.Services.Auth;

public interface ITokenService
{
    public string CreateToken(User user, int hoursToExpire, IList<string> roles);

    public string CreateRefreshToken(User user, int hoursToExpire);

    public bool CheckRefreshToken(string token, string email);
}
