using Core.Swagger;
using Dal;
using Logic;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(options => { options.SetDescriptions(); });
builder.Services.AddDalService();
builder.Services.AddLogicServices();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();