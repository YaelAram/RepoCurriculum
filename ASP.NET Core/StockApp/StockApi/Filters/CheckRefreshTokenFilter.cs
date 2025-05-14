using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using StockApi.Services.Auth;
using System.Security.Claims;

namespace StockApi.Filters;

public class CheckRefreshTokenFilter(ITokenService tokenService) : IAuthorizationFilter
{
    private readonly ITokenService _tokenService = tokenService;

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        HttpRequest request = context.HttpContext.Request;
        string? token = request.Headers["RefreshToken"];
        string? email = context.HttpContext.User.FindFirstValue(ClaimTypes.Email);

        if (
            token is null ||
            string.IsNullOrEmpty(token) ||
            string.IsNullOrWhiteSpace(token) ||
            email is null ||
            !_tokenService.CheckRefreshToken(token, email))
        {
            ProblemDetails details = new()
            {
                Status = StatusCodes.Status401Unauthorized,
                Title = "No refresh token",
                Detail = "Token is null or empty or not valid",
            };

            context.Result = new ObjectResult(details) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}
