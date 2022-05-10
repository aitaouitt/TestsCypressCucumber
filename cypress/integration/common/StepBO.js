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
    Then ('Valider le controle de devis non signe et impots avec l envoie de mail dans BO',() =>{
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet1).click() // click sur l onglet Devis
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.wait(1000)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleDevisAvecMail).click()
        cy.xpath(ObjetBOdata.onglet3).click() // click sur l onglet Impots
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Revenus fiscal de référence 1')) {
                cy.get(ObjetBOdata.inputRevenusFisaclRef1).click().clear().type(3000)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleImpotsAvecMail).click()
    })
    Then ('Valider le controle de l impots {string} sans l envoie de mail',(revenus) =>{
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet3).click() // click sur l onglet Impots
        cy.get(ObjetBOdata.checkAllOK).click()
        if (revenus != 'STANDARD'){
            cy.get(ObjetBOdata.inputRevenusFisaclRef1).click().clear().type(10000)
        }
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleImpotsSansMail).click()
    })
    Then ('Mettre les impots en KO TEMP sans envoi de mail',() =>{
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet3).click() // click sur l onglet Impots
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.btKOImpots).each(($el,index) => {
            if(index == 0){
                cy.wrap($el).click()
            }
        })
        cy.xpath(ObjetBOdata.motifKOImptsAnneesRev).click({force:true})
        cy.xpath(ObjetBOdata.MotifKOAnneeImpots).click({force:true})
        cy.get('body').then(($body) => {
            if ($body.text().includes('Revenus fiscal de référence 1')) {
                cy.get(ObjetBOdata.inputRevenusFisaclRef1).click().clear().type(10000)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleImpotsSansMail).click()
        cy.wait(2000)
    })
    Then ('Checker le status {string} de l OS dans BO',(status) => {
        cy.wait(1000)
        cy.get(ObjetBOdata.os_statut_dossier_title).should('have.text',status)
    })
    Then ('Checker si le status du Devis = OK , Devis Signé = TO_CHECK et Impots=OK dans BO',() => {
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.checkStatusDevis).should('have.text','                            OK\n                                                  ')
        cy.xpath(ObjetBOdata.checkStatusDevisSigne).should('have.text','                          TO_CHECK\n                                              ')
        cy.xpath(ObjetBOdata.checkStatusImpots).should('have.text','                            OK\n                                                  ')
    })
    Then ('Checker le chargement de l attestation sur l honneur = TO_CHECK dans BO',() => {
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.checkStatusAttestation).should('have.text','                           TO_CHECK\n                                              ')
    })
    And ('Redirection info beneficiaire',()=>{
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/info-beneficiaire')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/info-beneficiaire')
        }
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
    })
    And ('Redirection info Chantier',()=>{
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/info-chantier')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/info-chantier')
        }
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
    })
    And ('Valider le controle de devis {string} sans l envoie de mail dans BO',(typeOS) => {
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet4).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        if (typeOS == 'T5'){
            cy.get(ObjetBOdata.setSameOK).click()
        }
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Date de visite')) {
                var dateString = moment().add(1, 'days').format('YYYY-MM-DD')
                cy.get(ObjetBOdata.inputDateVisite).click().clear().type(dateString)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleDevisSigneSansEnvMail).click()
    })
    And ('Valider le controle de Devis Signé en KO TEMP pour motif {string} sans l envoie de mail dans BO',(motif) => {
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet4).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        if (motif != 'Absence Classe'){
            cy.get(ObjetBOdata.setSameKO).click()
            cy.get(ObjetBOdata.btKODevisSigne).each(($el,index) => {
                if(index == 1){
                    cy.wrap($el).click()
                }
            })
            cy.xpath(ObjetBOdata.selectMotifKODevisSigne).click({force:true})
            cy.get(ObjetBOdata.MotifKODevisSigneCoordonneesBeneficiaire).click({force:true})
        }else {
            cy.get(ObjetBOdata.btKODevisSigne1).each(($el,index) => {
                if(index == 2){
                    cy.wrap($el).click()
                }
            })
            cy.xpath(ObjetBOdata.selectMotifKODevisSigne).click({force:true})
            cy.get(ObjetBOdata.MotifKODevisSigneCoordonneesBeneficiaire).click({force:true})
        }
        var dateString = moment().add(1, 'days').format('YYYY-MM-DD')
        cy.get('body').then(($body) => {
            if ($body.text().includes('Date de visite')) {
                var dateString = moment().add(1, 'days').format('YYYY-MM-DD')
                cy.get(ObjetBOdata.inputDateVisite).click().clear().type(dateString)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.get(ObjetBOdata.btValideControleDevisSigneSansEnvMail).click()
    })
    And ('Valider le controle de l attestation sur l honneur sans l envoie de mail dans BO',() => {
        let url = Cypress.config().baseUrlBO
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/attestation')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/attestation')
        }
        cy.get(ObjetBOdata.checkAllOK).click()
        var dateString = moment().add(8, 'days').format('DD-MM-YYYY');
        cy.get(ObjetBOdata.InputDateSignaturePartieB).click().type(dateString)
        cy.get(ObjetBOdata.InputDateSignaturePartieC).click().type(dateString)
        cy.get(ObjetBOdata.inputNomArtisan).click().clear().type('Nom')
        cy.get(ObjetBOdata.inputPrenomArtisan).click().clear().type('Prenom')
        cy.get(ObjetBOdata.inputFonctionArtisan).click().clear().type('Fonction')
        cy.get(ObjetBOdata.inputTelArtisan).click().clear().type('0677889966')
        cy.get('body').then(($body) => {
            if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                cy.get(ObjetBOdata.inputNomSousTraitantA).click().clear().type('Nom sous traitant')
            }else{
                cy.get(ObjetBOdata.inputNomSousTraitant).click().clear().type('Nom sous traitant')
            }
            if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                cy.get(ObjetBOdata.inputPrenomSousTraitantA).click().clear().type('Prenom sous traitant')
            }else{
                cy.get(ObjetBOdata.inputPrenomSousTraitant).click().clear().type('Prenom sous traitant')
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleAttestationSansEnvMail).click()
    })
    And ('Valider le controle de l attestation sur l honneur avec l envoie de mail dans BO',() => {
        let url = Cypress.config().baseUrlBO
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/attestation')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/attestation')
        }
        cy.get(ObjetBOdata.checkAllOK).click()
        var dateString = moment().add(8, 'days').format('DD-MM-YYYY');
        cy.get(ObjetBOdata.InputDateSignaturePartieB).click().type(dateString)
        cy.get(ObjetBOdata.InputDateSignaturePartieC).click().type(dateString)
        cy.get(ObjetBOdata.inputNomArtisan).click().clear().type('Nom')
        cy.get(ObjetBOdata.inputPrenomArtisan).click().clear().type('Prenom')
        cy.get(ObjetBOdata.inputFonctionArtisan).click().clear().type('Fonction')
        cy.get(ObjetBOdata.inputTelArtisan).click().clear().type('0677889966')
        cy.get('body').then(($body) => {
            if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                cy.get(ObjetBOdata.inputNomSousTraitantA).click().clear().type('Nom sous traitant')
            }else{
                cy.get(ObjetBOdata.inputNomSousTraitant).click().clear().type('Nom sous traitant')
            }
            if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                cy.get(ObjetBOdata.inputPrenomSousTraitantA).click().clear().type('Prenom sous traitant')
            }else{
                cy.get(ObjetBOdata.inputPrenomSousTraitant).click().clear().type('Prenom sous traitant')
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleAttestationAvecEnvMail).click()
    })
    And ('Valider le controle de l attestation en KO TEMP pour motif {string} sans l envoie de mail dans BO',(motif) => {
        let url = Cypress.config().baseUrlBO
        //cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/attestation')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/attestation')
        }
        cy.get(ObjetBOdata.checkAllOK).click()
        if (motif == 'Date d engagement absente'){
            cy.get(ObjetBOdata.btKOAttestation).each(($el,index) => {
                if(index == 4){
                    cy.wrap($el).click()
                }
            })
            cy.xpath(ObjetBOdata.selectMotifKOAttestation).click({force:true})
            cy.xpath(ObjetBOdata.MotifKOAttestationDateEnregAbst).click({force:true})
        }else if (motif == 'Reference facture absente'){
            cy.get(ObjetBOdata.btKOAttestation).each(($el,index) => {
                if(index == 5){
                    cy.wrap($el).click()
                }
            })
            cy.xpath(ObjetBOdata.selectMotifKOAttestationFac).click({force:true})
            cy.xpath(ObjetBOdata.MotifKOAttestationRefFactureAbst).click({force:true})
        }else if (motif == "Ratures présentes"){
            cy.get(ObjetBOdata.btKOAttestation).each(($el,index) => {
                if(index == 3){
                    cy.wrap($el).click()
                }
            })
            cy.get(ObjetBOdata.MotifKOAHRaturesPresentes).click({force:true})
        }
        var dateString = moment().add(8, 'days').format('DD-MM-YYYY');
        cy.get(ObjetBOdata.InputDateSignaturePartieB).click().type(dateString)
        cy.get(ObjetBOdata.InputDateSignaturePartieC).click().type(dateString)
        cy.get(ObjetBOdata.inputNomArtisan).click().clear().type('Nom')
        cy.get(ObjetBOdata.inputPrenomArtisan).click().clear().type('Prenom')
        cy.get(ObjetBOdata.inputFonctionArtisan).click().clear().type('Fonction')
        cy.get(ObjetBOdata.inputTelArtisan).click().clear().type('0677889966')
        cy.get('body').then(($body) => {
            if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                cy.get(ObjetBOdata.inputNomSousTraitantA).click().clear().type('Nom sous traitant')
            }else{
                cy.get(ObjetBOdata.inputNomSousTraitant).click().clear().type('Nom sous traitant')
            }
            if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                cy.get(ObjetBOdata.inputPrenomSousTraitantA).click().clear().type('Prenom sous traitant')
            }else{
                cy.get(ObjetBOdata.inputPrenomSousTraitant).click().clear().type('Prenom sous traitant')
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleAttestationAvecEnvMail).click()
        cy.get(ObjetBOdata.os_statut_dossier_title).should('have.text','A_TRAITER')
    })
    And ('Checker l affichage du message Document imposition manquant',() => {
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet6).click()
        cy.xpath(ObjetBOdata.msgAlertDocImpotManquant).should('have.text',"Un document d'imposition doit avoir été chargé avant de procéder à la vérification de l'attestation ")
    })
    And ('Ajouter et valider le controle du Cadastre avec l envoie de mail dans BO et cloturer l OS',() => {
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.btChargeDocCadastre).click()
        cy.xpath(ObjetBOdata.btParcourir).click()
        cy.xpath('//*[@id="cadastre"]').attachFile("justificatifs/cadastre.jpg")
        cy.xpath(ObjetBOdata.btValider).click()
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
        }
        cy.xpath(ObjetBOdata.onglet2).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click()
        cy.get(ObjetBOdata.statusOSValide).should('have.text','Ce dossier passe au statut VALIDE_CC suite à vos actions.')
        // Cloture de l OS
        cy.get(ObjetBOdata.btModifStatut).click()
        cy.get(ObjetBOdata.selectModifStatut).select('CLOSED')
        cy.get(ObjetBOdata.selectRaisonModifStatut).select('Dossier test')
        cy.get(ObjetBOdata.inputCommentModifStatut).type('Dossier test')
        cy.get(ObjetBOdata.btSaveModifStatut).click()
    })
    And ('Valider le controle du Cadastre en NA sans document sans l envoie de mail dans BO',() => {
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
        }
        cy.xpath(ObjetBOdata.onglet2).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.btNAcadastre).each(($el,index) => {
            if (index == 0){
                cy.wrap($el).click()
            }
        })
        cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreSansEnvMail).click()
    })
     And ('Valider le controle du Cadastre en NA sans document avec l envoie de mail dans B0',() => {
            let url = Cypress.config().baseUrlBO
            cy.visit(url);
            var posSlach = url.length
            for (let i = 0; i < url.length; i++) {
              if (url.substring(i,i+3)=='fr/'){
                posSlach = i+3
              }
            }
            let monUrl = url.substring(0,posSlach)
            if (location.hostname.includes('qatest')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
            }else if (location.hostname.includes('preprod')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
            }
            cy.xpath(ObjetBOdata.onglet2).click()
            cy.get(ObjetBOdata.checkAllOK).click()
            cy.get(ObjetBOdata.btNAcadastre).each(($el,index) => {
                if (index == 0){
                    cy.wrap($el).click()
                }
            })
            cy.get(ObjetBOdata.inputParcelleCadastrale).clear().type(110)
            cy.get(ObjetBOdata.inputSurfaceCadastrale).clear().type(110)
            cy.get(ObjetBOdata.btSuivant).click()
            cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click()
        })


    And ('Valider le cadastre sans document pour checker le message d erreur',() => {
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
        }
        cy.xpath(ObjetBOdata.onglet2).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click()
        cy.xpath(ObjetBOdata.msgAlertDocImpotManquant).should('have.text','Ce document est absent, vous ne pouvez pas le valider sans le charger ')
    })
    And ('Changer le status de l OS en {string} dans BO',(status)=>{
        cy.get(ObjetBOdata.btModifStatut).click()
        cy.get(ObjetBOdata.selectModifStatut).select('CLOSED')
        cy.get(ObjetBOdata.selectRaisonModifStatut).select('Dossier test')
        cy.get(ObjetBOdata.inputCommentModifStatut).type('Dossier test')
        cy.get(ObjetBOdata.btSaveModifStatut).click()
    })
    And ('Ajouter et valider le controle du Cadastre avec l envoie de mail dans BO et sans cloturer l OS',() => {
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.btChargeDocCadastre).click()
        cy.xpath(ObjetBOdata.btParcourir).click()
        cy.xpath('//*[@id="cadastre"]').attachFile("justificatifs/cadastre.jpg")
        cy.xpath(ObjetBOdata.btValider).click()
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
        }
        cy.xpath(ObjetBOdata.onglet2).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click()
    })
    And ('Valider le controle du Cadastre dans BO en OK sans l envoie de mail et sans cloture OS',() => {
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.btChargeDocCadastre).click()
        cy.xpath(ObjetBOdata.btParcourir).click()
        cy.xpath('//*[@id="cadastre"]').attachFile("justificatifs/cadastre.jpg")
        cy.xpath(ObjetBOdata.btValider).click()
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
        }
        cy.xpath(ObjetBOdata.onglet2).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreSansEnvMail).click()
    })
    And ('Valider le controle du Cadastre dans BO en OK sans l envoie de mail',() => {
        /*let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        cy.visit(monUrl+'os/'+OScreesdata.idOS+'/lideo/cadastre')*/
        cy.xpath(ObjetBOdata.onglet2).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreSansEnvMail).click()
    })
    And ('Corriger et valider le controle du Cadastre avec l envoie de mail dans BO',() =>{
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.btChargeDocCadastre).click()
        cy.xpath(ObjetBOdata.btParcourir).click()
        cy.xpath('//*[@id="cadastre"]').attachFile("justificatifs/cadastre.jpg")
        cy.xpath(ObjetBOdata.btValider).click()
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
        }
        cy.xpath(ObjetBOdata.onglet2).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click()
    })
    And ('Controle Cadastre KO TEMP pour raison {string} et checker statut {string}',(raison,status) => {
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModalInfoDos).click({force:true})
            }
        })
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        if (location.hostname.includes('qatest')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
        }else if (location.hostname.includes('preprod')){
            cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
        }
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.xpath(ObjetBOdata.btKOCadastre).click()
        cy.xpath(ObjetBOdata.SelectMotifKOCadastre).click({force:true})
        cy.xpath(ObjetBOdata.MotifNontrouve).click({force:true}) // raison Cadastre non trouvé
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click()
        cy.get(ObjetBOdata.os_statut_dossier_title).should('have.text',status)
    })
    Then ('Valider le controle de devis non signe avec All OK et impots avec KO Temp dans BO et envoie de mail',() =>{
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet1).click() // click sur l onglet Devis
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleDevisAvecMail).click()
        cy.xpath(ObjetBOdata.onglet3).click() // click sur l onglet Impots
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.xpath(ObjetBOdata.KOAdresseImpots).click()
        cy.wait(1000)
        cy.xpath(ObjetBOdata.SelectMotifKOImpots).click({force:true})
        cy.xpath(ObjetBOdata.MotifAdresseImpotsDiff).click({force:true}) //Adresse impots différente
        cy.get('body').then(($body) => {
            if ($body.text().includes('Revenus fiscal de référence 1')) {
                cy.get(ObjetBOdata.inputRevenusFisaclRef1).click().clear().type(40000)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleImpotsAvecMail).click()
    })
    Then ('Valider le controle de devis non signe sans l envoie de mail',() =>{
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet1).click() // click sur l onglet Devis
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleDevisSansMail).click()
    })
    Then ('Valider le controle de devis non signe avec l envoie de mail',() =>{
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet1).click() // click sur l onglet Devis
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.wait(1000)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleDevisAvecMail).click()
    })
    And ('Verification documents generes Preuve Antéiorité et Cadre Contribution',() => {
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.get(ObjetBOdata.ongletCadreContribution).click()
        cy.get(ObjetBOdata.btTelechargerCadre_contribution).should('be.visible')
        cy.get(ObjetBOdata.ongletPreuveAnteriorite).click()
        cy.get(ObjetBOdata.btTelechargerAnteriorite).should('be.visible')

    })
    And ('Valider le contrôle de devis non signé en KO TEMP pour le motif {string} dans format et checker le statut de l OS {string}',(motif,status) =>{
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet1).click() // click sur l onglet Devis
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.btKODevis).each(($el,index) => {
            if(index == 0){
                cy.wrap($el).click()
            }
        })
        cy.xpath(ObjetBOdata.SelectMotifFormatDevis).click({force:true})
        cy.xpath(ObjetBOdata.MotifDevisKODateDevis).click({force:true})
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleDevisAvecMail).click()
        cy.get(ObjetBOdata.os_statut_dossier_title).should('have.text',status)
    })
    Then ('Validation de toutes les pieces dans BO',() => {
                cy.wait(2000)
                cy.get('body').then(($body) => {
                    if ($body.text().includes('Un document complémentaire de type')) {
                        cy.xpath(ObjetBOdata.btFermerModalInfoDos).click({force:true})
                    }
                })
                cy.xpath(ObjetBOdata.btControler).click()
                 // click sur l onglet Devis
                cy.xpath(ObjetBOdata.onglet1).click()
                cy.get(ObjetBOdata.checkAllOK).click()
                cy.get(ObjetBOdata.btSuivant).click()
                cy.get(ObjetBOdata.btValideControleDevisAvecMail).click()
                 // click sur l onglet Impots
                cy.xpath(ObjetBOdata.onglet3).click()
                cy.get(ObjetBOdata.checkAllOK).click()
                cy.get('body').then(($body) => {
                    if ($body.text().includes('Revenus fiscal de référence 1')) {
                        cy.get(ObjetBOdata.inputRevenusFisaclRef1).click().clear().type(40000)
                    }
                })
                cy.get(ObjetBOdata.btSuivant).click()
                cy.get(ObjetBOdata.btValideControleImpotsAvecMail).click()
                  // click sur l onglet Devis Signé
                cy.xpath(ObjetBOdata.onglet4).click()
                cy.get(ObjetBOdata.checkAllOK).click()
                cy.get(ObjetBOdata.setSameOK).click()
                cy.wait(1000)
                cy.get('body').then(($body) => {
                    if ($body.text().includes('Date de visite')) {
                        var dateString = moment().add(1, 'days').format('YYYY-MM-DD')
                        cy.get(ObjetBOdata.inputDateVisite).click().clear().type(dateString)
                    }
                })
                cy.get(ObjetBOdata.btSuivant).click()
                cy.get(ObjetBOdata.btValideControleDevisSigneSansEnvMail).click()
                // click sur l onglet facture
                cy.xpath(ObjetBOdata.onglet5).click()
                cy.get(ObjetBOdata.checkAllOK).click()
                cy.get(ObjetBOdata.DisplaySousTraitant).click()
                cy.get(ObjetBOdata.setSameOK).click()
                cy.get(ObjetBOdata.inputRaisonSociale).click().clear().type('Teksial')
                cy.get('body').then(($body) => {
                    cy.get(ObjetBOdata.inputSiretSousTraitant).click().clear()
                    cy.get(ObjetBOdata.inputSiretSousTraitant).type(donneesTest.siret)
                    if ($body.text().includes('Résistance thermique')) {
                        cy.get(ObjetBOdata.InputRaisistanceThermique).click().clear().type(3)
                    }
                    if ($body.text().includes('Surface isolant reel ')) {
                        cy.get(ObjetBOdata.InputSurfaceIsolantReel).click().clear().type(50)
                    }
                    if ($body.text().includes('Epaisseur')) {
                        cy.get(ObjetBOdata.InputEpaisseur).click().clear().type(5)
                    }
                    if ($body.text().includes('Date de visite')) {
                        var dateString = moment().add(1, 'days').format('YYYY-MM-DD');
                        cy.get(ObjetBOdata.inputDateVisiteFacture).click().type(dateString)
                    }
                    if ($body.text().includes('Combles perdus')) {
                        cy.get(ObjetBOdata.selectTypePause).select("Combles perdus")
                    }
                    if ($body.text().includes('Mise en place d’un pare-vapeur ou équivalent')) {
                        cy.get(ObjetBOdata.selectMiseParVapeur).select("Non")
                    }
                    if ($body.text().includes('Date de début des travaux')) {
                        var dateString = moment().add(8, 'days').format('DD-MM-YYYY')
                        cy.get(ObjetBOdata.InputDateDebutTravaux).click().clear()
                        cy.get(ObjetBOdata.InputDateDebutTravaux).click().type(dateString)
                    }
                //couper ici
                    if ($body.text().includes('Biomasse ligneuse')) {
                        cy.get(ObjetBOdata.btRadioBiomasseLigneuse).click()
                    }
                    if ($body.text().includes('Efficacité energitique')) {
                        cy.get(ObjetBOdata.inputEfficaciteEnergitique).click().clear().type('5')
                    }
                    if ($body.text().includes('Puissance thermique normale energitique')) {
                        cy.get(ObjetBOdata.inputPuissThermoqueNormale).click().clear().type('5')
                    }
                    if ($body.text().includes('regulateur')) {
                        cy.get(ObjetBOdata.inputClassRegulateur).click().clear().type('5')
                    }
                    if ($body.text().includes('automatique')) {
                        cy.get(ObjetBOdata.btRadioAuto).click()
                    }
                    if ($body.text().includes('silo')) {
                        cy.get(ObjetBOdata.btRadioSilo).click()
                    }
                    if ($body.text().includes('Flamme verte')) {
                        cy.get(ObjetBOdata.btRadioFlammeVerte).click()
                    }
                    if ($body.text().includes('Energie réelle')) {
                        cy.get(ObjetBOdata.inputSelectEnergiereelle).select("ÉLECTRICITÉ")
                    }
                    if ($body.text().includes('Efficacité énergétique saisonnière')) {
                        cy.get(ObjetBOdata.inputEfficaciteEnergitiqueSaison).click().clear().type(5)
                    }
                    if ($body.text().includes('Surface habitable réelle')) {
                        cy.get(ObjetBOdata.inputSurfHabReelle).click().clear().type(90)
                    }
                    if ($body.text().includes('Puissance thermique valide réelle')) {
                        cy.get(ObjetBOdata.selectPuissThermValidReelle).select("Non")
                    }
                    if ($body.text().includes('Marque de la chaudière')) {
                        cy.get(ObjetBOdata.inputMarqueChaud).click().clear().type('marque')
                    }
                    if ($body.text().includes('Référence de la chaudière')) {
                        cy.get(ObjetBOdata.inputRefChaudiere).click().clear().type(1111)
                    }
                    if ($body.text().includes('Marque du régulateur')) {
                        cy.get(ObjetBOdata.inputMarqueRegulateur).click().clear().type('marque')
                    }
                    if ($body.text().includes('Référence du régulateur')) {
                        cy.get(ObjetBOdata.inputRefRegulateur).click().clear().type(1111)
                    }
                    if ($body.text().includes('Classe du régulateur')) {
                        cy.get(ObjetBOdata.selectClasseRegulateur).select("IV")
                    }

            })
            cy.wait(1000)
            cy.get(ObjetBOdata.btSuivant).click()
            cy.get(ObjetBOdata.btValideControleFactureSansEnvMail).click()
            // Validation de l attestation sur l honneur
            var url = Cypress.config().baseUrlBO
            var posSlach = url.length
            for (let i = 0; i < url.length; i++) {
              if (url.substring(i,i+3)=='fr/'){
                posSlach = i+3
              }
            }
            var monUrl = url.substring(0,posSlach)
            if (location.hostname.includes('qatest')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/attestation')
            }else if (location.hostname.includes('preprod')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/attestation')
            }
            cy.get(ObjetBOdata.checkAllOK).click()
            var dateString = moment().add(8, 'days').format('DD-MM-YYYY');
            cy.get(ObjetBOdata.InputDateSignaturePartieB).click().type(dateString)
            cy.get(ObjetBOdata.InputDateSignaturePartieC).click().type(dateString)
            cy.get(ObjetBOdata.inputNomArtisan).click().clear().type('Nom')
            cy.get(ObjetBOdata.inputPrenomArtisan).click().clear().type('Prenom')
            cy.get(ObjetBOdata.inputFonctionArtisan).click().clear().type('Fonction')
            cy.get(ObjetBOdata.inputTelArtisan).click().clear().type('0677889966')
            cy.get('body').then(($body) => {
                if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                    cy.get(ObjetBOdata.inputNomSousTraitantA).click().clear().type('Nom sous traitant')
                }else{
                    cy.get(ObjetBOdata.inputNomSousTraitant).click().clear().type('Nom sous traitant')
                }
                if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
                    cy.get(ObjetBOdata.inputPrenomSousTraitantA).click().clear().type('Prenom sous traitant')
                }else{
                    cy.get(ObjetBOdata.inputPrenomSousTraitant).click().clear().type('Prenom sous traitant')
                }
            })
            cy.get(ObjetBOdata.btSuivant).click()
            cy.get(ObjetBOdata.btValideControleAttestationSansEnvMail).click()
            // Ajout du document dacastre et validation
            cy.xpath(ObjetBOdata.ongletDocuments).click()
            cy.xpath(ObjetBOdata.ongletDocuments).click()
            cy.xpath(ObjetBOdata.btChargeDocCadastre).click()
            cy.xpath(ObjetBOdata.btParcourir).click()
            cy.xpath('//*[@id="cadastre"]').attachFile("justificatifs/cadastre.jpg")
            cy.xpath(ObjetBOdata.btValider).click()
            url = Cypress.config().baseUrlBO
            cy.visit(url);
            var posSlach = url.length
            for (let i = 0; i < url.length; i++) {
              if (url.substring(i,i+3)=='fr/'){
                posSlach = i+3
              }
            }
            monUrl = url.substring(0,posSlach)
            if (location.hostname.includes('qatest')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
            }else if (location.hostname.includes('preprod')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
            }
            cy.xpath(ObjetBOdata.onglet2).click()
            cy.get(ObjetBOdata.checkAllOK).click()
            cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
            cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
            cy.get(ObjetBOdata.btSuivant).click()
            cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click()
    })
    And ('Cloturer l OS',()=>{
        cy.get(ObjetBOdata.os_statut_dossier_title).then((title)=>{
            if (title.text() != 'CLOSED'){
                    cy.get(ObjetBOdata.btModifStatut).click()
                    cy.get(ObjetBOdata.selectModifStatut).select('CLOSED')
                    cy.get(ObjetBOdata.selectRaisonModifStatut).select('Dossier test')
                    cy.get(ObjetBOdata.inputCommentModifStatut).type('Dossier test')
                    cy.get(ObjetBOdata.btSaveModifStatut).click()
                    cy.get('.alert-close-info').should('be.visible')
            }else{
                cy.log(title.text())
            }
        })
    })
    And ('Checker le chargement du nouveau Cadre de Contrinution dans BO',()=>{
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.get(ObjetBOdata.ongletCadreContribution).click()
        if (location.hostname.includes('qatest')){
            cy.get(ObjetBOdata.NomPDFCadreContribution).should('contain', 'CADRE_CONTRIBUTION-'+OScreesdata.idOSQA+'_')
        }else if (location.hostname.includes('preprod')){
            cy.get(ObjetBOdata.NomPDFCadreContribution).should('contain', 'CADRE_CONTRIBUTION-'+OScreesdata.idOSPP+'_')
        }
    })
    And ('Valider le controle du Devis signe sans devis non signé dans BO sans l envoie de mail',()=>{
        cy.xpath(ObjetBOdata.onglet4).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get('body').then(($body) => {
            if ($body.text().includes('Date de visite')) {
                var dateString = moment().add(1, 'days').format('YYYY-MM-DD')
                cy.get(ObjetBOdata.inputDateVisite).click().clear().type(dateString)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.get(ObjetBOdata.btValideControleDevisSigneSansEnvMail).click()
    })
    And ('Valider le controle du Cadre de Contribution dans BO sans l envoie de mail',()=>{
        cy.xpath(ObjetBOdata.onglet1).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.get(ObjetBOdata.btValideCtrlCadreContribSansMail).click()
    })
        Then ('Telecharger le PDF {string}', (typePDF) =>{
            let url = Cypress.config().baseUrlBO
            cy.visit(url);
            var posSlach = url.length
            for (let i = 0; i < url.length; i++) {
              if (url.substring(i,i+3)=='fr/'){
                posSlach = i+3
              }
            }
            let monUrl = url.substring(0,posSlach)
            if (location.hostname.includes('qatest')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/info-beneficiaire')
            }else if (location.hostname.includes('preprod')){
                cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/info-beneficiaire')
            }
            cy.xpath(ObjetBOdata.ongletDocuments).click()
            if (typePDF == "CDC"){
                cy.get(ObjetBOdata.ongletCadreContribution).click()
                cy.get(ObjetBOdata.NomPDFCadreContribution).should('have.attr', 'href').then((href) => {
                    if (location.hostname.includes('qatest')){
                        cy.downloadFile(monUrl+href.substring(1,href.length),'cypress/fixtures/justificatifs','CadreContribution-'+OScreesdata.RefOSQA+'.pdf')
                    }else if (location.hostname.includes('preprod')){
                        cy.downloadFile(monUrl+href.substring(1,href.length),'cypress/fixtures/justificatifs','CadreContribution-'+OScreesdata.RefOSPP+'.pdf')
                    }
                })
            }
            if (typePDF == "PA"){
                cy.get(ObjetBOdata.ongletPreuveAnteriorite).click()
                cy.get(ObjetBOdata.NomPDFPreuveAnteriorite).should('have.attr', 'href').then((href) => {
                    if (location.hostname.includes('qatest')){
                        cy.downloadFile(monUrl+href.substring(1,href.length),'cypress/fixtures/justificatifs','PreuveAnteriorite-'+OScreesdata.RefOSQA+'.pdf')
                    }else if (location.hostname.includes('preprod')){
                        cy.downloadFile(monUrl+href.substring(1,href.length),'cypress/fixtures/justificatifs','PreuveAnteriorite-'+OScreesdata.RefOSPP+'.pdf')
                    }
                })
            }
        })
    Then ('Ckecker le PDf {string},{string},{string},{string},{string}', (typePDF,adresseTravaux,CP,ville,coupDePouce) =>{
    var RefOS = ""
    if (location.hostname.includes('qatest')){
        RefOS = OScreesdata.RefOSQA
    }else if (location.hostname.includes('preprod')){
        RefOS = OScreesdata.RefOSPP
    }
    if (typePDF == "CDCT5"){
        cy.task('getPdfContent', "cypress/fixtures/justificatifs/CadreContribution-"+RefOS+".pdf").then(content => {
            if (typePDF == "CDCT5"){
                expect(content.text).to.include('\n\nLe dispositif national des certificats d’économies d’énergie (CEE) mis en place par le Ministère en charge de l’énergie impose à\nl’ensemble des fournisseurs d’énergie (électricité, gaz, fioul domestique, chaleur ou froid, carburants automobiles), de réaliser\ndes économies et de promouvoir les comportements vertueux auprès des consommateurs d’énergie.\n')
                expect(content.text).to.include('Dans ce cadre, TEKSIAL SASU s’engage à vous apporter:')
                var poseuros = 0
                for (let i = 0; i < OScreesdata.MontantPrime.length; i++) {
                    if (OScreesdata.MontantPrime.substring(i,i+1)=='€'){
                        poseuros = i+1
                    }
                }
                let prime = OScreesdata.MontantPrime.substring(0,poseuros-1)
                let MyPrime = ""
                for (let i = 0; i < prime.length; i++) {
                    if (prime.substring(i,i+1)==','){
                        MyPrime = MyPrime+'.'
                    }else{
                        MyPrime = MyPrime+prime.substring(i,i+1)
                    }
                }
                expect(content.text).to.include('une prime d’un montant de '+MyPrime+'euros ;')
                expect(content.text).to.include('au bénéfice de : TestAuto TestAuto '+adresseTravaux+' '+CP+' '+ville)
                var dateString = moment().format('DD/MM/YYYY')
                expect(content.text).to.include('Date de cette proposition : '+dateString)
            }
        })
      }else if (typePDF == "PAT5"){
        cy.task('getPdfContent', "cypress/fixtures/justificatifs/PreuveAnteriorite-"+RefOS+".pdf").then(content => {
            if (typePDF == "PAT5"){
                var dateString = moment().format('DD/MM/YYYY')
                expect(content.text).to.include('Le '+dateString+', à Colombes')
                expect(content.text).to.include('A destination de M. TestAuto TestAuto')
                expect(content.text).to.include(adresseTravaux+' '+CP+' '+ville)
                expect(content.text).to.include("Vous avez indiqué vouloir réaliser ces travaux à l'adresse ci-dessous :")
                expect(content.text).to.include('D’après les éléments transmis, le montant estimé de votre prime est de '+OScreesdata.MontantPrime)
            }
        })
      }else if (typePDF == "CDCT2"){
        cy.task('getPdfContent', "cypress/fixtures/justificatifs/CadreContribution-"+RefOS+".pdf").then(content => {
            if (typePDF == "CDCT2"){
                            var poseuros = 0
                            for (let i = 0; i < OScreesdata.MontantPrime.length; i++) {
                                if (OScreesdata.MontantPrime.substring(i,i+1)=='€'){
                                    poseuros = i+1
                                }
                            }
                            let prime = OScreesdata.MontantPrime.substring(0,poseuros-1)
                            let MyPrime = ""
                            for (let i = 0; i < prime.length; i++) {
                                if (prime.substring(i,i+1)==','){
                                    MyPrime = MyPrime+'.'
                                }else{
                                    MyPrime = MyPrime+prime.substring(i,i+1)
                                }
                            }
                            cy.log(MyPrime)
            if (coupDePouce == 'Oui'){
                expect(content.text).to.include('\n\nLe dispositif national des certificats d’économies d’énergie (CEE) mis en place par le Ministère de l’environnement, de l’énergie et de la mer impose à\nl’ensemble des fournisseurs d’énergie (électricité, gaz, fioul domestique, chaleur ou froid, carburants automobiles), de réaliser des économies et de\npromouvoir les comportements vertueux auprès des consommateurs d’énergie.')
                //expect(content.text).to.include('Dans le cadre de son partenariat avec TEKSIAL, 2JVS s’engage à vous apporter une prime d’un montant de 4 073.00 € euros dans le cadre des\ntravaux suivants (1 ligne par opération) :')
            }else{
                expect(content.text).to.include('\n\nLe dispositif national des certificats d’économies d’énergie (CEE) mis en place par le Ministère en charge de l’énergie impose à\nl’ensemble des fournisseurs d’énergie (électricité, gaz, fioul domestique, chaleur ou froid, carburants automobiles), de réaliser\ndes économies et de promouvoir les comportements vertueux auprès des consommateurs d’énergie')
                expect(content.text).to.include('Dans le cadre de son partenariat avec TEKSIAL, 2JVS s’engage à vous apporter:')
                expect(content.text).to.include('une prime d’un montant de '+MyPrime+'euros ;')
            }
                expect(content.text).to.include('au bénéfice de : TestAuto TestAuto '+adresseTravaux+' '+CP+' '+ville)
                var dateString = moment().format('DD/MM/YYYY')
                expect(content.text).to.include('Date de cette proposition : '+dateString)
            }
        })
      }
    })
    And ('Checker le Coupe de pouce à {string}',(coupDePouce)=>{
        if (coupDePouce == "Oui"){
            cy.get(ObjetBOdata.ImagePouce).should('be.visible')
        }else{
            cy.get(ObjetBOdata.ImagePouce).should('not.exist')
        }
    })
    When ('Redirection Simulateur',()=>{
        let url = Cypress.config().baseUrlBO
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
          if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
          }
        }
        let monUrl = url.substring(0,posSlach)
        cy.visit(monUrl+'simulateur/os')
    })
    When ('Redirection vers Simulateur ProCee',()=>{
        let url = Cypress.config().baseUrlProCee
        cy.visit(url);
        var posSlach = url.length
        for (let i = 0; i < url.length; i++) {
        if (url.substring(i,i+3)=='fr/'){
            posSlach = i+3
        }
        }
        let monUrl = url.substring(0,posSlach)
        cy.visit(monUrl+'simulateur/os')
    })
    Then ('Validation des pieces dans BO sans Devis non signé',() => {
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModalInfoDos).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()

        // Validation du Cadre de Contribution
        cy.xpath(ObjetBOdata.onglet1).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.get(ObjetBOdata.btValideCtrlCadreContribSansMail).click({force:true})
         // click sur l onglet Impots
        cy.xpath(ObjetBOdata.onglet3).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get('body').then(($body) => {
            if ($body.find(ObjetBOdata.inputRevenusFisaclRef1).is(':visible')){
                cy.get(ObjetBOdata.inputRevenusFisaclRef1).click().clear().type(40000)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click()
        cy.get(ObjetBOdata.btValideControleImpotsAvecMail).click()
          // click sur l onglet Devis Signé
        cy.xpath(ObjetBOdata.onglet4).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        // cy.get(ObjetBOdata.setSameOK).click()
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Date de visite')) {
                var dateString = moment().add(1, 'days').format('DD-MM-YYYY')
                cy.get(ObjetBOdata.inputDateVisite).click().clear().type(dateString)
            }
        })
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.get(ObjetBOdata.btValideControleDevisSigneSansEnvMail).click()
        // click sur l onglet facture
        cy.xpath(ObjetBOdata.onglet5).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.DisplaySousTraitant).click()
        cy.get(ObjetBOdata.setSameOK).click()
        cy.get(ObjetBOdata.inputRaisonSociale).click().clear().type('Teksial')
        cy.get('body').then(($body) => {
            cy.get(ObjetBOdata.inputSiretSousTraitant).click().clear()
            cy.get(ObjetBOdata.inputSiretSousTraitant).type(donneesTest.siret)
            if ($body.text().includes('Résistance thermique')) {
                cy.get(ObjetBOdata.InputRaisistanceThermique).click().clear().type(3)
            }
            if ($body.text().includes('Surface isolant reel ')) {
                cy.get(ObjetBOdata.InputSurfaceIsolantReel).click().clear().type(50)
            }
            if ($body.text().includes('Epaisseur')) {
                cy.get(ObjetBOdata.InputEpaisseur).click().clear().type(5)
            }
            cy.get('body').then(($body) => {
                if ($body.find(ObjetBOdata.inputDateVisiteFacture).is(':visible')){
                    var dateString = moment().add(1, 'days').format('DD-MM-YYYY');
                    cy.get(ObjetBOdata.inputDateVisiteFacture).click().type(dateString)
                }
            })
            var dateString = moment().add(15, 'days').format('DD-MM-YYYY') /////////////////////////////////////////////////////
            cy.get(ObjetBOdata.inputDateIntervention).click().clear()
            cy.get(ObjetBOdata.inputDateIntervention).click().type(dateString)
            if ($body.text().includes('Combles perdus')) {
                cy.get(ObjetBOdata.selectTypePause).select("Combles perdus")
            }
            if ($body.text().includes('Mise en place d’un pare-vapeur ou équivalent')) {
                cy.get(ObjetBOdata.selectMiseParVapeur).select("Non")
            }
            if ($body.text().includes('Montant prime payée')) {
                cy.get(ObjetBOdata.inputMontantPrimePayee).click().clear().type(OScreesdata.MontantPrime.substring(0,3))
            }
            if ($body.text().includes('Date de début des travaux')) {
                var dateString = moment().add(8, 'days').format('DD-MM-YYYY')
                cy.get(ObjetBOdata.InputDateDebutTravaux).click().clear()
                cy.get(ObjetBOdata.InputDateDebutTravaux).click().type(dateString)
            }            
        //couper ici
            if ($body.text().includes('Biomasse ligneuse')) {
                cy.get(ObjetBOdata.btRadioBiomasseLigneuse).click()
            }
            if ($body.text().includes('Efficacité energitique')) {
                cy.get(ObjetBOdata.inputEfficaciteEnergitique).click().clear().type('5')
            }
            if ($body.text().includes('Puissance thermique normale energitique')) {
                cy.get(ObjetBOdata.inputPuissThermoqueNormale).click().clear().type('5')
            }
            if ($body.text().includes('regulateur')) {
                cy.get(ObjetBOdata.inputClassRegulateur).click().clear().type('5')
            }
            if ($body.text().includes('automatique')) {
                cy.get(ObjetBOdata.btRadioAuto).click()
            }
            if ($body.text().includes('silo')) {
                cy.get(ObjetBOdata.btRadioSilo).click()
            }
            if ($body.text().includes('Flamme verte')) {
                cy.get(ObjetBOdata.btRadioFlammeVerte).click()
            }
            if ($body.text().includes('Energie réelle')) {
                cy.get(ObjetBOdata.inputSelectEnergiereelle).select("ÉLECTRICITÉ")
            }
            if ($body.text().includes('Efficacité énergétique saisonnière')) {
                cy.get(ObjetBOdata.inputEfficaciteEnergitiqueSaison).click().clear().type(5)
            }
            if ($body.text().includes('Surface habitable réelle')) {
                cy.get(ObjetBOdata.inputSurfHabReelle).click().clear().type(90)
            }
            if ($body.text().includes('Puissance thermique valide réelle')) {
                cy.get(ObjetBOdata.selectPuissThermValidReelle).select("Non")
            }
            if ($body.text().includes('Marque de la chaudière')) {
                cy.get(ObjetBOdata.inputMarqueChaud).click().clear().type('marque')
            }
            if ($body.text().includes('Référence de la chaudière')) {
                cy.get(ObjetBOdata.inputRefChaudiere).click().clear().type(1111)
            }
            if ($body.text().includes('Marque du régulateur')) {
                cy.get(ObjetBOdata.inputMarqueRegulateur).click().clear().type('marque')
            }
            if ($body.text().includes('Référence du régulateur')) {
                cy.get(ObjetBOdata.inputRefRegulateur).click().clear().type(1111)
            }
            if ($body.text().includes('Classe du régulateur')) {
                cy.get(ObjetBOdata.selectClasseRegulateur).select("IV")
            }
            if ($body.text().includes('N° facture')) {
                cy.get(ObjetBOdata.inputNumFacture).clear().type(1111)
            }
    })
    cy.get(ObjetBOdata.btSuivant).click({force:true})
    cy.get(ObjetBOdata.btValideControleFactureSansEnvMail).click({force:true})
    // Validation de l attestation sur l honneur
    cy.xpath(ObjetBOdata.onglet6).click()
    var url = Cypress.config().baseUrlBO
    var posSlach = url.length
    for (let i = 0; i < url.length; i++) {
      if (url.substring(i,i+3)=='fr/'){
        posSlach = i+3
      }
    }
    var monUrl = url.substring(0,posSlach)
    // if (location.hostname.includes('qatest')){
    //     cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/attestation')
    // }else if (location.hostname.includes('preprod')){
    //     cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/attestation')
    // }
    cy.get(ObjetBOdata.checkAllOK).click()
    var dateStringAH = moment().add(15, 'days').format('DD-MM-YYYY');//////////////////////////////////////////////////////////
    cy.get(ObjetBOdata.InputDateSignaturePartieB).click().clear().type(dateStringAH)
    cy.get(ObjetBOdata.InputDateSignaturePartieC).click().clear().type(dateStringAH)
    cy.get(ObjetBOdata.inputNomArtisan).click().clear().type('Nom')
    cy.get(ObjetBOdata.inputPrenomArtisan).click().clear().type('Prenom')
    cy.get(ObjetBOdata.inputFonctionArtisan).click().clear().type('Fonction')
    cy.get(ObjetBOdata.inputTelArtisan).click().clear().type('0677889966')
    cy.get('body').then(($body) => {
        if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
            cy.get(ObjetBOdata.inputNomSousTraitantA).click().clear().type('Nom sous traitant')
        }else{
            cy.get(ObjetBOdata.inputNomSousTraitant).click().clear().type('Nom sous traitant')
        }
        if ($body.text().includes('BAR_TH_106 - ') || $body.text().includes('BAR_TH_104 - ')) {
            cy.get(ObjetBOdata.inputPrenomSousTraitantA).click().clear().type('Prenom sous traitant')
        }else{
            cy.get(ObjetBOdata.inputPrenomSousTraitant).click().clear().type('Prenom sous traitant')
        }
    })
    cy.get(ObjetBOdata.btSuivant).click({force:true})
    cy.get(ObjetBOdata.btValideControleAttestationSansEnvMail).click({force:true})
    // Ajout du document dacastre et validation
    cy.xpath(ObjetBOdata.ongletDocuments).click()
    cy.xpath(ObjetBOdata.ongletDocuments).click()
    cy.xpath(ObjetBOdata.btChargeDocCadastre).click()
    cy.xpath(ObjetBOdata.btParcourir).click()
    cy.xpath('//*[@id="cadastre"]').attachFile("justificatifs/cadastre.jpg")
    cy.xpath(ObjetBOdata.btValider).click()
    url = Cypress.config().baseUrlBO
    cy.visit(url);
    var posSlach = url.length
    for (let i = 0; i < url.length; i++) {
      if (url.substring(i,i+3)=='fr/'){
        posSlach = i+3
      }
    }
    monUrl = url.substring(0,posSlach)
    if (location.hostname.includes('qatest')){
        cy.visit(monUrl+'os/'+OScreesdata.idOSQA+'/lideo/cadastre')
    }else if (location.hostname.includes('preprod')){
        cy.visit(monUrl+'os/'+OScreesdata.idOSPP+'/lideo/cadastre')
    }
    cy.xpath(ObjetBOdata.onglet2).click()
    cy.get(ObjetBOdata.checkAllOK).click()
    cy.get(ObjetBOdata.inputParcelleCadastrale).click().clear().type(110)
    cy.get(ObjetBOdata.inputSurfaceCadastrale).click().clear().type(110)
    cy.get(ObjetBOdata.btSuivant).click({force:true})
    cy.get(ObjetBOdata.btValideControleCadastreAvecEnvMail).click({force:true})
})
