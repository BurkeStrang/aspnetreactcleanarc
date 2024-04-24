namespace aspnetreactcleanarc.Web.AcceptanceTests.Pages;

public class FetchDataPage : BasePage
{
    public FetchDataPage(IBrowser browser, IPage page)
    {
        Browser = browser;
        Page = page;
    }

    public override string PagePath => $"{BaseUrl}/fetch-data";

    public override IBrowser Browser { get; }

    public override IPage Page { get; set; }

    public Task<bool> WeatherForcastIsVisible() =>
        Page.Locator("text=Weather forecast").IsVisibleAsync();
}
