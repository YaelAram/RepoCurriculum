using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using StockApi.Configuration;

namespace StockApi.Extensions;

public static class ConfigureAuthJwt
{
    public static WebApplicationBuilder ConfigureAuthenticationAndBearerJwt(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme =
            options.DefaultChallengeScheme =
            options.DefaultForbidScheme =
            options.DefaultScheme =
            options.DefaultSignInScheme =
            options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer((options) =>
        {
            JwtSettings? settings = builder.Configuration.GetSection("JwtSetting").Get<JwtSettings>();
            options.TokenValidationParameters = settings is null ?
                throw new Exception("JwtSettings") :
                new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = settings.Issuer,
                    ValidateAudience = false,
                    ValidAudience = settings.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(settings.SigningKey))
                };
        });

        return builder;
    }
}
