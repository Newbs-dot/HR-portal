using Core.Swagger;
using Dal;
using Logic;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true)
    .AddEnvironmentVariables();

builder.Services.AddControllers();
builder.Services.ConfigureSwaggerService();
builder.Services.AddDalService(builder.Configuration.GetConnectionString("DB"));
builder.Services.AddLogicServices();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();