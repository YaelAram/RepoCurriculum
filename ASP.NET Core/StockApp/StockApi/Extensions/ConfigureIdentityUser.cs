using Microsoft.AspNetCore.Identity;
using StockApi.Data.Models;
using StockApi.Data;

namespace StockApi.Extensions;

public static class ConfigureIdentityUser
{
    public static WebApplicationBuilder ConfigureIdentity(this WebApplicationBuilder builder)
    {
        builder.Services.AddIdentity<User, IdentityRole>((options) =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequiredLength = 8;
        }).AddEntityFrameworkStores<StockMarketContext>();

        return builder;
    }
}
