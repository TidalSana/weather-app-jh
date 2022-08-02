describe("homepage", () => {
  context("testing inputs", () => {
    it("should visit the homepage", () => {
      cy.visit("http://localhost:3000/");
      cy.get("h2").should("contain", "Search City");
    });

    it("should toggle city and coordinate searches", () => {
      // click the second switch button on the page
      cy.get(".chakra-switch__thumb").eq(1).click();
      cy.get("h2").should("contain", "Search Coordinates");
    });

    it("test errors and search button", () => {
      cy.get(".chakra-button").contains("Search").click();
      cy.get("h2").should("contain", "Search Coordinates");
    });

    it("input zipcode and US state code", () => {
      cy.get("input").eq(1).click().type("59405");
      cy.get("input").eq(2).click().type("US");
      cy.get(".chakra-button").contains("Find Coords").click();

      cy.get(".chakra-text").should("contain", "Lat: 47.495 & Lon: -111.2502");
    });

    it("input latitude and longitude and search weather", () => {
      cy.get("input").eq(3).click().type("47.495");
      cy.get("input").eq(4).click().type("-111.2502");
      cy.get(".chakra-button").contains("Search").click();

      cy.get("h2").should("contain", "Great Falls, US");
    });

    it("return to search menu and toggle search city", () => {
      cy.get(".chakra-button").contains("Return").click();
      cy.get(".chakra-switch__thumb").eq(1).click();

      cy.get("h2").should("contain", "Search City");
    });

    it("return input into search via city", () => {
      cy.get("input").eq(1).click().type("Los Angeles");
      cy.get(".chakra-button").contains("Search").click();

      cy.get("h2").should("contain", "Los Angeles, US");
    });
  });
});

describe("about page", () => {
  context("testing link and toggle dark mode", () => {
    it("display about me page", () => {
      cy.get(".chakra-button").contains("About").click();

      cy.url().should("include", "/about");
    });

    it("toggle dark mode", () => {
      cy.get(".chakra-switch__thumb").eq(0).click();

      cy.get(".css-1lnqzcn")
        .should("have.css", "background-color")
        .and("eq", "rgb(45, 55, 72)");
    });

    it("return to home", () => {
      cy.get(".chakra-button").contains("Return").click();

      cy.get("h2").should("contain", "Search City");
    });
  });
});
