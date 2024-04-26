namespace aspnetreactcleanarc.Web.AcceptanceTests.StepDefinitions;

[Binding]
public sealed class FetchDataStepDefinitions
{
    private readonly FetchDataPage _fetchDataPage;
    private readonly LoginPage _loginPage;

    public FetchDataStepDefinitions(FetchDataPage fetchDataPage, LoginPage loginPage)
    {
        _fetchDataPage = fetchDataPage;
        _loginPage = loginPage;
    }

    [BeforeFeature("FetchData")]
    public static async Task BeforeLoginScenario(IObjectContainer container)
    {
        var playwright = await Playwright.CreateAsync();

        var options = new BrowserTypeLaunchOptions();

        // can change browser to Firefox or WebKit
        var browser = await playwright.Chromium.LaunchAsync(options);

        var page = await browser.NewPageAsync();

        var loginPage = new LoginPage(browser, page);
        var fetchDataPage = new FetchDataPage(browser, page);

        container.RegisterInstanceAs(playwright);
        container.RegisterInstanceAs(browser);
        container.RegisterInstanceAs(loginPage);
        container.RegisterInstanceAs(fetchDataPage);
    }

    [Given("a user is logged in")]
    public async Task GivenALoggedInUser()
    {
        await _loginPage.GotoAsync();

        await _loginPage.SetEmail("administrator@localhost");
        await _loginPage.SetPassword("Administrator1!");
        await _loginPage.ClickLogin();

        var profileLinkText = await _loginPage.ProfileLinkText();

        profileLinkText.Should().NotBeNull();
        profileLinkText.Should().Be("Account");
    }

    [Given("a user is not logged in")]
    public async Task GivenALoggedOutUser()
    {
        await _loginPage.GotoAsync();
    }

    [When("the user fetches data from the fetch-data page")]
    public async Task WhenTheUserNavigatesToTheFetchDataPage()
    {
        await _fetchDataPage.GotoAsync();
    }

    [Then("weather forecast is visible")]
    public async Task WeatherForcastIsVisible()
    {
        var weatherForcastIsVisible = await _fetchDataPage.WeatherForcastIsVisible();
        weatherForcastIsVisible.Should().BeTrue();
    }

    [Then("weather forecast is not visible")]
    public async Task WeatherForcastIsNotVisible()
    {
        var weatherForcastIsVisible = await _fetchDataPage.WeatherForcastIsVisible();
        weatherForcastIsVisible.Should().BeFalse();
    }

    [AfterFeature]
    public static async Task AfterScenario(IObjectContainer container)
    {
        var browser = container.Resolve<IBrowser>();
        var playright = container.Resolve<IPlaywright>();

        await browser.CloseAsync();
        playright.Dispose();
    }
}
