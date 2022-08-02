describe("testing inputs", () => {
  context("homepage", () => {
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

    it("input latitude and longitude", () => {
      cy.get("input").eq(3).click().type("47.495");
      cy.get("input").eq(4).click().type("-111.2502");
      cy.get(".chakra-button").contains("Search").click();

      cy.get("h2").should("contain", "Great Falls, US");
    });
  });
});
