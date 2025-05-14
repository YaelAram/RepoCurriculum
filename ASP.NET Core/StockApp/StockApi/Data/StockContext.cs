using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StockApi.Data.Models;

namespace StockApi.Data;

public class StockMarketContext : IdentityDbContext<User>
{
    public StockMarketContext(DbContextOptions<StockMarketContext> options) : base(options) { }

    public virtual DbSet<Stock> Stocks { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        List<IdentityRole> roles = [
            new IdentityRole { Id = "f320fa4d-7629-4239-9c49-e02515f1c7f4", Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Id = "923b1851-bd7e-4f9d-9bf4-79292be1cdca", Name = "User", NormalizedName = "USER" }
        ];

        builder.Entity<IdentityRole>().HasData(roles);
    }
}
