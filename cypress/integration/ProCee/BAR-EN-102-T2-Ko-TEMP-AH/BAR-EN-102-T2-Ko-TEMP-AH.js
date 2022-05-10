import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";

Before( ()=> {
    describe('Mon Before Tests', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                debugger
                return false
            })
    })
})

