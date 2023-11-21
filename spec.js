describe("Protractor Demo App", function () {
  beforeEach(function () {
    browser.get("https://sakshingp.github.io/assignment/login.html");
    browser.sleep(2000);
  });

  //1 login with valid credentials filling both username and password fields -positive case

  it(" 1 should login by filling both username and password", function () {
    element(by.id("username")).sendKeys("Saurabh");
    element(by.id("password")).sendKeys(123);
    element(by.id("log-in")).click();

    browser.getCurrentUrl().then(function (url) {
      expect(url).toContain("https://sakshingp.github.io/assignment/home.html");

      browser.sleep(1000);
    });
  });

  //   //2 trying login with username only -negative case

  it("2 should fail while logging in using username only", function () {
    element(by.id("username")).sendKeys("Saurabh");
    element(by.id("log-in")).click();
    browser.sleep(2000);
    expect(element(by.css(".alert.alert-warning")).getText()).toContain(
      "Password must be present"
    );
  });

  //   //3 trying login with password only  -negative case

  it("3 should fail while logging in with password only", function () {
    element(by.id("password")).sendKeys("12345678");
    element(by.id("log-in")).click();
    browser.sleep(2000);

    expect(element(by.css(".alert.alert-warning")).getText()).toContain(
      "Username must be present"
    );
  });

  //   //4 trying login with empty fields  -negative case

  it("4 should fail while logging in with both fields empty", function () {
    element(by.id("log-in")).click();
    browser.sleep(2000);
    expect(element(by.css(".alert.alert-warning")).getText()).toContain(
      "Both Username and Password must be present"
    );
  });

  //   //5 login by filling both fields with checking remember me box -positive

  it("5 should login by filling both fields and checking remember me box", function () {
    element(by.id("username")).sendKeys("Saurabh");
    element(by.id("password")).sendKeys(123);
    element(by.css('input[type="checkbox"]')).click();
    element(by.id("log-in")).click();

    browser.getCurrentUrl().then(function (url) {
      expect(url).toContain("https://sakshingp.github.io/assignment/home.html");

      browser.sleep(2000);
    });
  });

  //   //6 trying login with empty fields with remember me checked -negative

  it("6 should fail while logging in with empty fields and remember me checked", function () {
    element(by.css('input[type="checkbox"]')).click();
    element(by.id("log-in")).click();

    expect(element(by.css(".alert.alert-warning")).getText()).toContain(
      "Both Username and Password must be present"
    );

    browser.sleep(2000);
  });

  //7 testing if the amounts are sorted after clicking on AMOUNT -positive

  it("7 should sort the table by clicking AMOUNT header and check it", () => {
    element(by.id("username")).sendKeys("saurabh");
    element(by.id("password")).sendKeys("123");
    element(by.id("log-in")).click();

    //get amounts before clicking AMOUNT header and sorting it
    const amountsBefore = element
      .all(by.css(".text-success,.text-danger"))
      .map((amountElement) => amountElement.getText())
      .then((amounts) =>
        amounts.map((amount) => parseFloat(amount.replace(/[^0-9.-]+/g, "")))
      );
    amountsBefore.then((amounts) => {
      const sortedAmounts = amounts.slice().sort((a, b) => a - b);
      console.log("Original Amounts:", amounts);
      console.log("Sorted Amounts:", sortedAmounts);
    });

    // Click the AMOUNT header to initiate sorting

    element(by.id("amount")).click();

    // Get amounts after clicking AMOUNT header
    const amountsAfter = element
      .all(by.css(".text-success,.text-danger"))
      .map((amountElement) => amountElement.getText())
      .then((amounts) =>
        amounts.map((amount) => parseFloat(amount.replace(/[^0-9.-]+/g, "")))
      );

    // for loop to compare amounts before and after sorting
    for (let i = 0; i < amountsBefore.length; i++) {
      expect(sortedAmounts[i]).toEqual(amountsAfter[i]);
    }

    browser.sleep(1000);
  });
});
