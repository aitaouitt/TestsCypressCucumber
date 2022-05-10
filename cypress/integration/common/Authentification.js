import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
const moment = require('moment');

let ObjetBOdata
let OScreesdata
let monExpertData
let donneesTest
let ProCeedata

    beforeEach(() => {
        cy.fixture("ObjetBO.json").then((ObjetBO) => {
            ObjetBOdata = ObjetBO
        })
        cy.fixture("ObjetsProCee.json").then((ObjetsProCee) => {
            ProCeedata = ObjetsProCee
        })
        cy.fixture("OScrees.json").then((OScrees) => {
            OScreesdata = OScrees
        })
        cy.fixture("ObjetsMonExpert.json").then((ObjetsMonExpert) => {
            monExpertData = ObjetsMonExpert
        })
        cy.fixture("dataTest.json").then((dataTest) => {
            donneesTest = dataTest
        })
    })
    Before( ()=> {
        describe('Mon Before Tests', () => {
                Cypress.on('uncaught:exception', (err, runnable) => {
                    debugger
                    return false
                })
        })
    })
    Given('Je me suis connecte au BO',() => {
        let url = Cypress.config().baseUrlBO
        cy.visit(url)
        cy.get('#inputEmail').click().clear().type(donneesTest.user)
        cy.get('#inputPassword').click().clear().type(donneesTest.MDP)
        cy.get('#login').click()
    })
    Given ('Je me connecte à monExpert',()=>{
        let url = Cypress.config().baseUrlMonExpertEclient
        cy.visit(url)
        cy.get('#email').clear().type(donneesTest.user)
        cy.get('#inputPassword').clear().type(donneesTest.MDP)
        cy.xpath('//*[@id="_submit"]').click()
    })
    Given ('Je me connecte à ProCee',()=>{
        let url = Cypress.config().baseUrlProCee
        cy.visit(url)
        cy.get(ProCeedata.inputEmail).clear().type(donneesTest.user)
        cy.get(ProCeedata.inputPassword).clear().type(donneesTest.MDP)
        cy.get(ProCeedata.btLogin).click()
    })