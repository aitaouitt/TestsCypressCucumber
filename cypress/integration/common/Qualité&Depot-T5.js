import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";

import faker from 'faker';
let ObjetBOdata;
let OScreesdata;
let monExpertData;
let donneesTest;
    beforeEach(() => {
        cy.fixture("ObjetBO.json").then((ObjetBO) => {
            ObjetBOdata = ObjetBO
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
    Then('Valider le dossier en Qualite OK et passer en {string},{string}',(status,bucket) => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('BAR_EN_101') || $body.text().includes('BAR_EN_102') || $body.text().includes('BAR_EN_103')) {
                let url = location.hostname
                var posSlach = url.length
                for (let i = 0; i < url.length; i++) {
                    if (url.substring(i,i+3)=='fr/'){
                        posSlach = i+3
                    }
                }
                let monUrl = url.substring(0,posSlach)
                cy.visit(monUrl+"/insitu/prepare")
                if (location.hostname.includes('qatest')){
                    cy.get(ObjetBOdata.inputRechInSitu).click().clear().type(OScreesdata.RefOSQA)
                }else if (location.hostname.includes('preprod')){
                    cy.get(ObjetBOdata.inputRechInSitu).click().clear().type(OScreesdata.RefOSPP)
                }
                cy.contains("Filtrer").click()
                cy.xpath(ObjetBOdata.checkBoxAllOSSitu).click()
                cy.xpath(ObjetBOdata.btCreerLotCtrl).click()
                cy.xpath(ObjetBOdata.premierCadena).click()
                cy.get(ObjetBOdata.inputNomLot).type("TestAuto")
                cy.get(ObjetBOdata.selectBureauCtrl).select("Quali Consult")
                cy.get(ObjetBOdata.selectDelaiTrait).select("48 heures")
                cy.get(ObjetBOdata.btEnvoyerInsitu).click()
                cy.xpath(ObjetBOdata.selectStatu).select("Déposable")
                cy.get(ObjetBOdata.btEnregistrer).click()
                cy.get(ObjetBOdata.btConfirmer).click()
            }else{
                cy.get(ObjetBOdata.CtrlQualite).click()
                cy.get('body').then(($body) => {
                    if(bucket == "T5"){
                        cy.contains(ObjetBOdata.MER2020).click()
                    }else if(bucket == "T2"){
                        cy.contains("I2M ENERGY").click()
                    }
                })
                cy.get(ObjetBOdata.ZoneFiltreOS).click()
                if (location.hostname.includes('qatest')){
                    cy.get(ObjetBOdata.ZoneFiltreOS).clear().type(OScreesdata.RefOSQA)
                }else if (location.hostname.includes('preprod')){
                    cy.get(ObjetBOdata.ZoneFiltreOS).clear().type(OScreesdata.RefOSPP)
                }
                cy.get(ObjetBOdata.btFiltreOS).click()
                cy.get(ObjetBOdata.checkBoxVerifie).click()
                cy.get(ObjetBOdata.checkBoxVerifie).click()
                cy.get(ObjetBOdata.checkBoxAllOS).click()
                cy.get('body').then(($body) => {
                    if ($body.find(ObjetBOdata.btSet_deposable).is(':visible')){
                        cy.get(ObjetBOdata.btSet_deposable).click()
                    }else{
                        cy.get(ObjetBOdata.btStatusSuivant).click()
                    }
                })
                cy.get(ObjetBOdata.OSstatusQualite).should('have.text', status)
            }
        })
    })
    And ('Creer un depot avec le dossier et passer en DEPOSE {string}',(bucket) => {
        // cy.get(ObjetBOdata.Depot).click()
        let url = location.hostname
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
            if (url.substring(i,i+3)=='fr/'){
                posSlach = i+3
            }
        }
        let monUrl = url.substring(0,posSlach)
        cy.visit(monUrl+"/os/depot/creer/bucket/")
        cy.get('body').then(($body) => {
            // cy.get(ObjetBOdata.CreerUnDepot).click()
            if(bucket == "T5"){
                cy.contains(ObjetBOdata.MER2020).click()
            }else if(bucket == "T2"){
                cy.contains("I2M ENERGY").click()
            }
        })
        cy.get(ObjetBOdata.selectPeriode).select("P5")
        cy.get(ObjetBOdata.search_os_search).click()
        if (location.hostname.includes('qatest')){
            cy.get(ObjetBOdata.search_os_search).clear().type(OScreesdata.RefOSQA)
        }else if (location.hostname.includes('preprod')){
            cy.get(ObjetBOdata.search_os_search).clear().type(OScreesdata.RefOSPP)
        }
        cy.get(ObjetBOdata.search_os_filtrer).click()
        cy.get(ObjetBOdata.checkBoxAllOS).click()
        cy.get(ObjetBOdata.btCreerDepot).click()
        cy.get(ObjetBOdata.create_depot).click()
    })


