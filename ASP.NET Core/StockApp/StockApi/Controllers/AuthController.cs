using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StockApi.Data.Dtos.Users;
using StockApi.Data.Models;
using StockApi.Filters;
using StockApi.Services.Auth;
using System.Security.Claims;

namespace StockApi.Controllers;

[ApiController]
[Route("/api/auth")]
[EnableRateLimiting("restricted")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    private readonly ITokenService _tokenService;

    private readonly SignInManager<User> _signInManager;

    public AuthController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> CreateUser(CreateUserDto dto)
    {
        try
        {
            User user = dto.ToUser();

            IdentityResult userResult = await _userManager.CreateAsync(user, dto.Password);
            if (!userResult.Succeeded) return BadRequest(userResult.Errors);

            IdentityResult roleResult = await _userManager.AddToRoleAsync(user, "User");
            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return Ok(new { User = user.ToUserDto() });
        }
        catch (Exception ex)
        {
            return Problem(title: "Error while creating user", detail: ex.Message, statusCode: 500);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> LogIn(LogInDto dto)
    {
        User? user = await _userManager.FindByEmailAsync(dto.Email);
        if (user is null) return Problem(title: "User not found", detail: $"Email {dto.Email} not in db", statusCode: 404);

        var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
        if (!result.Succeeded) return Problem(title: "LogIn failed", detail: "Wrong email and password", statusCode: 401);

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new
        {
            User = user.ToUserDto(),
            Token = _tokenService.CreateToken(user, 6, roles),
            RefreshToken = _tokenService.CreateRefreshToken(user, 24)
        });
    }

    [HttpPatch("make-admin/{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> MakeAdmin(string userId)
    {
        User? user = await _userManager.FindByIdAsync(userId);
        if (user is null) return Problem(title: "User not found", detail: $"User {userId} not in db", statusCode: 404);

        IdentityResult roleResult = await _userManager.AddToRoleAsync(user, "Admin");
        if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        return NoContent();
    }

    [HttpPatch("remove-admin/{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RemoveAdmin(string userId)
    {
        User? user = await _userManager.FindByIdAsync(userId);
        if (user is null) return Problem(title: "User not found", detail: $"User {userId} not in db", statusCode: 404);

        IdentityResult roleResult = await _userManager.RemoveFromRoleAsync(user, "Admin");
        if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        return NoContent();
    }

    [HttpGet("refresh")]
    [Authorize]
    [ServiceFilter(typeof(CheckRefreshTokenFilter))]
    public async Task<IActionResult> RefreshToken()
    {
        string? email = User.FindFirstValue(ClaimTypes.Email);
        if (email is null) return Problem(title: "Invalid JWT", detail: "No email", statusCode: 403);

        User? user = await _userManager.FindByEmailAsync(email);
        if (user is null) return Problem(title: "User not found", detail: $"Email {email} not found", statusCode: 404);

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new { Token = _tokenService.CreateToken(user, 6, roles) });
    }
}
