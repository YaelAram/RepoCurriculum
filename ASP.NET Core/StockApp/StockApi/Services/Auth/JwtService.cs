using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StockApi.Configuration;
using StockApi.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StockApi.Services.Auth;

public class JwtService(IOptions<JwtSettings> options) : ITokenService
{
    private readonly JwtSettings settings = options.Value;

    private readonly SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(options.Value.SigningKey));

    private readonly SymmetricSecurityKey refreshTokenSecurityKey = new(Encoding.UTF8.GetBytes(options.Value.RefreshTokenSigningKey));

    public bool CheckRefreshToken(string token, string email)
    {
        JwtSecurityTokenHandler handler = new();
        TokenValidationParameters validationParameters = new()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = refreshTokenSecurityKey,
            ValidateIssuer = true,
            ValidIssuer = settings.Issuer,
            ValidateAudience = false,
            ValidAudience = settings.Audience
        };

        try
        {
            var principal = handler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
            Console.WriteLine(string.Join(" - ", principal.Claims));
            Console.WriteLine($"Is token: {validatedToken is JwtSecurityToken}");
            Console.WriteLine($"Email refresh token: {email} Email token: {principal.FindFirstValue(ClaimTypes.Email)}");

            return validatedToken is JwtSecurityToken && principal.FindFirstValue(ClaimTypes.Email) == email;
        }
        catch (Exception) { return false; }
    }

    public string CreateRefreshToken(User user, int hoursToExpire)
    {
        List<Claim> claims = [
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.GivenName, user.UserName!),
        ];

        SigningCredentials credentials = new(refreshTokenSecurityKey, SecurityAlgorithms.HmacSha512Signature);
        SecurityTokenDescriptor descriptor = new()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(hoursToExpire),
            SigningCredentials = credentials,
            Issuer = settings.Issuer,
            Audience = settings.Audience,
        };
        JwtSecurityTokenHandler handler = new();

        var token = handler.CreateToken(descriptor);

        return handler.WriteToken(token);
    }

    public string CreateToken(User user, int hoursToExpire, IList<string> roles)
    {
        List<Claim> claims = [
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.GivenName, user.UserName!),
        ];

        foreach (var role in roles) { claims.Add(new Claim(ClaimTypes.Role, role)); }

        SigningCredentials credentials = new (securityKey, SecurityAlgorithms.HmacSha512Signature);
        SecurityTokenDescriptor descriptor = new() { 
            Subject = new ClaimsIdentity(claims), 
            Expires = DateTime.UtcNow.AddHours(hoursToExpire),
            SigningCredentials = credentials,
            Issuer = settings.Issuer,
            Audience = settings.Audience,
        };
        JwtSecurityTokenHandler handler = new();

        var token = handler.CreateToken(descriptor);

        return handler.WriteToken(token);
    }
}
