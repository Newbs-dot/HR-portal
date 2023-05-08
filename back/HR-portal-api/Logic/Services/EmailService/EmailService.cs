using Logic.Settings;
using Microsoft.Extensions.Options;

namespace Logic.Services.EmailService;

public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;

    public EmailService(IOptions<EmailSettings> options)
    {
        _emailSettings = options.Value;
    }

    public async Task SendToEmail(string sendToEmail, string mailText)
    {
    }
}