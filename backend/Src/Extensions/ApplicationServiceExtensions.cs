using backend.Src.Data;
using backend.Src.Services;
using backend.Src.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace backend.Src.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)

        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors();
            services.AddScoped<IAccountService, AccountService>();
            


            return services;
        }
}