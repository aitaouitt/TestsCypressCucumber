import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
const moment = require('moment');

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
    And ('Chargement du justificatif des impots dans monExpert',() => {
        cy.get('body').then(($body) => {

            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
        })
        cy.get('body').then((body) => {
            if (body.find(monExpertData.btModalChargerDocDevisSigne).length > 0) {
                cy.get(monExpertData.btModalChargerDocDevisSigne).click()
            }
        })
        cy.xpath(monExpertData.buttonRenseignInfo).click()
                cy.wait(1000)
        cy.xpath(monExpertData.btContinuerModalImpots).click()
                cy.wait(1000)
        cy.xpath(monExpertData.btAjoutDocImpots).click()
        cy.get(monExpertData.numFiscal).click()
        cy.get(monExpertData.numFiscal).type(donneesTest.numFiscal)
        cy.get(monExpertData.refFiscal).click()
        cy.get(monExpertData.refFiscal).type(donneesTest.refAvisimpots)
        //cy.get('input[type="file"]').attachFile("justificatifs/Impots.png")
        cy.get('input[type="file"]').each((el,index) => {
            if (index == 0){
                cy.wrap(el).attachFile("justificatifs/Impots.png")
            }
        })
        cy.wait(1000)
        cy.xpath(monExpertData.btEnvoyerDocImpots).click()
    })
   And ('Chargement ducument complementaire impots',() => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
        })
        cy.get('body').then((body) => {
            if (body.find(monExpertData.btModalChargerDocDevisSigne).length > 0) {
                cy.get(monExpertData.btModalChargerDocDevisSigne).click()
            }
        })
        cy.xpath(monExpertData.buttonRenseignInfo).click()
        cy.xpath(monExpertData.btContinuerModalImpots).click()
        cy.xpath(monExpertData.btAjoutDocImpots).click()
        cy.get(monExpertData.numFiscal).click()
        cy.get(monExpertData.numFiscal).type(donneesTest.numFiscal)
        cy.get(monExpertData.refFiscal).click()
        cy.get(monExpertData.refFiscal).type(donneesTest.refAvisimpots)
        cy.get('input[type="file"]').attachFile("justificatifs/Impots.png")
        cy.wait(1000)
        cy.xpath(monExpertData.btEnvoyerDocImpots).click()
    })
    And ('Chargement du devis non signé dans monExpert',() => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
            if ($body.find(monExpertData.btModalChargerDocDevisSigne).length > 0) {
                cy.get(monExpertData.btModalChargerDocDevisSigne).click()
            }
        })
        cy.get(monExpertData.chargDocDevis).click()
        cy.wait(1000)
        cy.xpath(monExpertData.btContinuerModalDevis).click()
        cy.get(monExpertData.inputSiret).click()
        cy.get(monExpertData.inputSiret).type(donneesTest.siret)
        cy.get(monExpertData.inputRaisonSociale).click()
        cy.get(monExpertData.inputRaisonSociale).type(donneesTest.raisonSociale)
        cy.get(monExpertData.inputDevis_rgeAddress).type('4 Rue Lucien Sampaix, Paris, France')
        cy.xpath(monExpertData.SousTraitantNON).click()
        cy.get('input[type="file"]').each((el,index) => {
            // if (index == 1){
                cy.wrap(el).attachFile("justificatifs/devis.png")
            // }
        })
        cy.xpath(monExpertData.btEnvoyerDocDevis).click()
        cy.wait(1000)
    })
    And ('Supprimer le devis non signé',() => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
            if ($body.find(monExpertData.btModalChargerDocDevisSigne).length > 0) {
                cy.get(monExpertData.btModalChargerDocDevisSigne).click()
            }
        })
                cy.wait(1000)
        cy.get(monExpertData.chargDocDevis).click()
                cy.wait(1000)
        cy.xpath(monExpertData.btContinuerModalDevis).click()
                cy.wait(1000)
        cy.get(monExpertData.SuppDevisNonSigne).each(($el,index) => {
                cy.wrap($el).click({force:true})
        })
        cy.get(monExpertData.btRetour).click()
    })
    Then ('Charger le devis signe et saisir la date dans monExpert {string}',(etatImpos) => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
        })
        if (etatImpos == 'Attente de correction'){
                cy.xpath(monExpertData.statusImpots).should('have.class','status waiting orange')
        }else if (etatImpos == 'En attente'){
                cy.xpath(monExpertData.statusImpots).should('have.class','status traitement blue')
        }else if (etatImpos == "Pas d Impots"){
                cy.log("Pas d Impots")
        }else{
                cy.xpath(monExpertData.statusImpots).should('have.class','status valide green')
        }
        if (etatImpos != "Pas d Impots"){
            cy.xpath(monExpertData.statusDevis).should('have.class','status valide green')
        }
        cy.wait(1000)
        if (etatImpos != "Recharge doc"){
            cy.get(monExpertData.btModalChargerDocDevisSigne).click()
        }
        cy.get(monExpertData.btChargeDevisSigne).click()
        cy.wait(1000)
        cy.xpath(monExpertData.btModalContinuerDevisSigne).click()
        var dateString = moment().format('YYYY-MM-DD');
        cy.get(monExpertData.inputDateSignDevis).click().type(dateString)
        cy.xpath(monExpertData.btRadioVersementAccompteNON).click()
        // cy.xpath(monExpertData.btAjoutDocDevisSigne).click()
        cy.get('input[type="file"]').each((el,index) => {
            if (index == 1){
                cy.wrap(el).attachFile("justificatifs/devisSigné.png")
            }
        })
        cy.get('input[type="file"]').attachFile("justificatifs/devisSigné.png")
        cy.wait(1000)
        cy.xpath(monExpertData.btEnvoyerDevisSigné).click()
    })
    Then ('Chargement cadastre en document completementaire dans monExpert {string}',(status) => {
        if(status == 'À corriger'){
            cy.xpath(monExpertData.OS-Status).should('have.class','orange')
        }
        cy.get('body').then(($body) => {
            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
        })

    })
    Then ('Charger la Facture et saisir les données obligatoires dans monExpert',() => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
        })
        cy.get(monExpertData.btChargeFacture).click()
        cy.xpath(monExpertData.btModalChargerFacture).click()
        var dateString = moment().add(1, 'days').format('YYYY-MM-DD');
        cy.get(monExpertData.inputDateEditFacture).click().type(dateString)
        cy.xpath(monExpertData.btRadionAccompteNON).click()
        cy.xpath(monExpertData.btAjoutDocFacture).click()
        cy.get('input[type="file"]').attachFile("justificatifs/facture.png")
        cy.get('input[type="file"]').each((el,index) => {
            if (index == 2 || index == 3){
                cy.wrap(el).attachFile("justificatifs/facture.png")
            }
        })
        cy.wait(1000)
        cy.xpath(monExpertData.btEnvoyerFacture).click()
    })
    Then ('Charger l attestation sur l honneur et charger la version signee dans monExpert',() => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Projets en cours')) {
                cy.xpath(monExpertData.openProjet).click()
            }
        })
        let url = Cypress.config().baseUrlMonExpertEclient
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach-1)
        cy.get(monExpertData.LinkTelechargerAttestationSurHonneur).should('have.attr', 'href').then((href) => {
            cy.log(monUrl+href)
            if (location.hostname.includes('qatest')){
                cy.downloadFile(monUrl+href,'cypress/fixtures/justificatifs','attestationSignee'+OScreesdata.RefOSQA+'.pdf')
            }else if (location.hostname.includes('preprod')){
                cy.downloadFile(monUrl+href,'cypress/fixtures/justificatifs','attestationSignee'+OScreesdata.RefOSPP+'.pdf')
            }
        })
        //let data = cy.task('getPdfContent', 'cypress/fixtures/justificatifs/attestationSignee'+OScreesdata.RefOS+'.pdf')
        cy.get(monExpertData.btChargeDocAttestationSurHonneur).click()
        cy.xpath(monExpertData.btModalChargerAttestation).click()
        cy.xpath(monExpertData.btAjoutDocAttestation).click()
        if (location.hostname.includes('qatest')){
            //cy.get('input[type="file"]').attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSQA+".pdf")
            cy.get('input[type="file"]').each((el,index) => {
                if (index == 4){
                    cy.wrap(el).attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSQA+".pdf")
                }
            })    
        }else if (location.hostname.includes('preprod')){
            //cy.get('input[type="file"]').attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSPP+".pdf")
            cy.get('input[type="file"]').each((el,index) => {
                if (index == 4){
                    cy.wrap(el).attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSPP+".pdf")
                }
            })
    
        }
        cy.xpath(monExpertData.btEnvoyerAttestation).click()
        cy.wait(1000)
        cy.get("body").then($body => {
            if ($body.find(monExpertData.ErreurChargeAH).is(':visible')){
                if (location.hostname.includes('qatest')){
                    //cy.get('input[type="file"]').attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSQA+".pdf")
                    cy.get('input[type="file"]').each((el,index) => {
                        if (index == 5){
                            cy.wrap(el).attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSQA+".pdf")
                        }
                    })    
                }else if (location.hostname.includes('preprod')){
                    //cy.get('input[type="file"]').attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSPP+".pdf")
                    cy.get('input[type="file"]').each((el,index) => {
                        if (index == 5){
                            cy.wrap(el).attachFile("justificatifs/attestationSignee"+OScreesdata.RefOSPP+".pdf")
                        }
                    })
            
                }   
                cy.xpath(monExpertData.btEnvoyerAttestation).click()     
            }
        })
    })
    Then ('Consulter la liste des projets',()=>{
        cy.get(monExpertData.LienProjets).click()
    })