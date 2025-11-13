import { errorMessages } from "../../components/errors"

describe('Login page', () => {
beforeEach (() => {
  cy.visit("http://localhost:5174/")
})

describe('Success Test', () => {
  it('passes', () => {
    cy.get('[data-cy="email-input"]').type("asdasd@asd.com.tr");
    cy.get('[data-cy="password-input"]').type("@Aa123");
    cy.get('[data-cy="terms-input"]').check();
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    cy.get('[data-cy="submit-button"]').click();
  })


  describe('Error Messages', () => {
 
 
    it("email hata mesajı", () => {
    cy.get('[data-cy="email-input"]').type("asd@asd");
    cy.contains(errorMessages.email);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })
   
  
  it("password hata mesajı", () => {
    cy.get('[data-cy="password-input"]').type("123123");
    cy.contains(errorMessages.password);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })
   
  
  it("şartlar hata mesajı", () => {
    cy.get('[data-cy="terms-input"]').uncheck();
    cy.contains(errorMessages.terms);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })
  
  
  it("email ve password hata mesajı", () => {
    cy.get('[data-cy="email-input"]').type("asd@asd");
    cy.contains(errorMessages.email);
    cy.get('[data-cy="password-input"]').type("123abc");
    cy.contains(errorMessages.password);
    cy.get('[data-cy="terms-input"]').check();
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    
  })
  
  
  it("email ve password true şartlar false mesajı", () => {
    cy.get('[data-cy="email-input"]').type("asdasd@asd.com.tr");
    cy.get('[data-cy="password-input"]').type("@Aa123");
    cy.get('[data-cy="terms-input"]').uncheck();
    cy.contains(errorMessages.terms);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  }) 
  
  
  it("email ve şartlar true password false mesajı", () => {
    cy.get('[data-cy="email-input"]').type("asdasd@asd.com.tr");
    cy.get('[data-cy="password-input"]').type("aAa123");
        cy.contains(errorMessages.password);
    cy.get('[data-cy="terms-input"]').check();
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })
})
})
})