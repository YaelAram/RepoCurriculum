using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

namespace StockApi.Extensions;

public static class ConfigureRateLimitPolicies
{
    public static WebApplicationBuilder ConfigureRateLimit(this WebApplicationBuilder builder)
    {
        builder.Services.AddRateLimiter(options =>
        {
            options.AddFixedWindowLimiter("open", policy =>
            {
                policy.PermitLimit = 5;
                policy.Window = TimeSpan.FromSeconds(10);
                policy.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                policy.QueueLimit = 1;
            });

            options.AddFixedWindowLimiter("restricted", policy =>
            {
                policy.PermitLimit = 2;
                policy.Window = TimeSpan.FromSeconds(10);
                policy.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                policy.QueueLimit = 1;
            });
        });

        return builder;
    }
}
