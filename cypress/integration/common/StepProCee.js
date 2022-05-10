import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
const moment = require('moment')

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
    Then ('Checker le status de l OS {string} dans ProCee',(status) =>{
        cy.get(ProCeedata.OsEtat).should('have.text',status)
    })
    Then ('Charger le Devis Signe dans ProCee',() =>{
        cy.get(ProCeedata.btChargerDevisSigne).click()
        cy.get('input[type="file"]').attachFile("justificatifs/devisSigné.png")
        var dateString = moment().format('YYYY-MM-DD');
        cy.get(ProCeedata.inputDtAcceptationDevis).click().type(dateString)
        cy.get(ProCeedata.btEnregistrerDevis).click()
    })
    And ('Supprimer le Devis Signe dans ProCee', ()=>{
        cy.get(ProCeedata.CroixSupprimerDevisSigne).click()

    })
    Then ('Charger la Facture dans ProCee',() =>{
        cy.get(ProCeedata.btChargerFacture).click()
        cy.get('input[type="file"]').attachFile("justificatifs/facture.png")
        var dateString = moment().format('YYYY-MM-DD');
        cy.get(ProCeedata.inputFactureCreationDate).click().type(dateString)
        cy.get(ProCeedata.btEnregistrerFacture).click()
    })
    Then ('Charger l Attestation dans ProCee',() =>{
        cy.get(ProCeedata.btChargerAttestation).click()
        cy.get('input[type="file"]').attachFile("justificatifs/attestation.pdf")
        cy.get(ProCeedata.btEnregistrerAttestation).click()
    })
    Then ('Charger le Cadastre dans ProCee',() =>{
        cy.get(ProCeedata.btChargerCadastre).click()
        cy.get("input[name=\"app_form_procees_upload_0[cadastre][0][file]\"]").attachFile("justificatifs/cadastre.png")
        cy.get(ProCeedata.btEnregistrerCadastre).click()
    })
    Then ('redirection Upload Docuements',() =>{
        let url = Cypress.config().baseUrlProCee
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'app/projet/'+OScreesdata.idOSproCeeQA+'/upload')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'app/projet/'+OScreesdata.idOSproCeePP+'/upload')
        }
    })
    Then ('Charger le Cadre de Contribution dans ProCee',() =>{
        let url = Cypress.config().baseUrlProCee
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach-1)
        cy.get(ProCeedata.LinkTelechargerCadreContribution).should('have.attr', 'href').then((href) => {
            cy.log(monUrl+href)
            if (location.hostname.includes('qatest')){
                cy.downloadFile(monUrl+href,'cypress/fixtures/justificatifs','CadreContribution-'+OScreesdata.RefOSQA+'.pdf')
            }else if (location.hostname.includes('preprod')){
                cy.downloadFile(monUrl+href,'cypress/fixtures/justificatifs','CadreContribution-'+OScreesdata.RefOSPP+'.pdf')
            }
        })
        //let data = cy.task('getPdfContent', 'cypress/fixtures/justificatifs/attestationSignee'+OScreesdata.RefOS+'.pdf')
        cy.get(ProCeedata.btChargerAttestation).click()
        if (location.hostname.includes('qatest')){
            cy.get('input[type="file"]').attachFile("justificatifs/CadreContribution-"+OScreesdata.RefOSQA+".pdf")
        }else if (location.hostname.includes('preprod')){
            cy.get('input[type="file"]').attachFile("justificatifs/CadreContribution-"+OScreesdata.RefOSPP+".pdf")
        }
        cy.get(ProCeedata.btEnregistrerAttestation).click()
    })
    Then ('Telecharger le Cadre de Contribution depuis ProCee',() =>{
        let url = Cypress.config().baseUrlProCee
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach-1)
        cy.get(ProCeedata.LinkTelechargerCadreContribution).should('have.attr', 'href').then((href) => {
            cy.log(monUrl+href)
            if (location.hostname.includes('qatest')){
                cy.downloadFile(monUrl+href,'cypress/fixtures/justificatifs','CadreContribution-'+OScreesdata.RefOSQA+'.pdf')
            }else if (location.hostname.includes('preprod')){
                cy.downloadFile(monUrl+href,'cypress/fixtures/justificatifs','CadreContribution-'+OScreesdata.RefOSPP+'.pdf')
            }
        })
    })
    And ('Chargement de document complementaire sur {string} dans ProCee',(type)=>{
        cy.get(ProCeedata.btChargerAutresDoc).click()
        cy.get(ProCeedata.selectTypeDocComplementaire).click()
        cy.get(ProCeedata.selectTypeDoc).each(($el,index) => {
            if(type == "Facture" && $el.text() == 'Facture'){
                cy.get('input[type="file"]').attachFile("justificatifs/facture.png")
                cy.wrap($el).click()
            }else if(type == "Impots" && $el.text() == 'Impôts'){
                cy.get('input[type="file"]').attachFile("justificatifs/Impots.png")
                cy.wrap($el).click()
            }else if(type == "Cadastre" && $el.text() == 'Cadastre'){
                cy.get('input[type="file"]').attachFile("justificatifs/cadastre.png")
                cy.wrap($el).click()
            }else if(type == "Devis Signe" && $el.text() == 'Devis Signé'){
                cy.get('input[type="file"]').attachFile("justificatifs/devisSigné.png")
                cy.wrap($el).click()
            }else if(type == "Attestation" && $el.text() == 'Attestations'){
                cy.get('input[type="file"]').attachFile("justificatifs/Attestation.pdf")
                cy.wrap($el).click()
            }
        })

        cy.get(ProCeedata.btEnregisterDocSupp).click()
    })


