﻿namespace StockApi.Configuration;

public class JwtSettings
{
    public required string Issuer { get; set; }

    public required string Audience { get; set; }

    public required string SigningKey { get; set; }

    public required string RefreshTokenSigningKey { get; set; }
}
