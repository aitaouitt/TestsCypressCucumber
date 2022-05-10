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
    Then ('Checker si le status de la facture = TO_CHECK dans BO',() => {
        cy.xpath(ObjetBOdata.ongletDocuments).click()
        cy.xpath(ObjetBOdata.checkStatusFacture).should('have.text','                          TO_CHECK\n                                              ')
    })
    And ('Valider le controle de la facture sans l envoie de mail dans BO',() => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet5).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.DisplaySousTraitant).click()
        cy.get(ObjetBOdata.setSameOK).click()
        cy.get(ObjetBOdata.inputRaisonSociale).clear().type('Teksial')
        cy.get('body').then(($body) => {
                cy.get(ObjetBOdata.inputSiretSousTraitant).clear().type(donneesTest.siret)
                if ($body.text().includes('Résistance thermique')) {
                    cy.get(ObjetBOdata.InputRaisistanceThermique).clear().type(3)
                }
                if ($body.text().includes('Surface isolant reel ')) {
                    cy.get(ObjetBOdata.InputSurfaceIsolantReel).clear().type(50)
                }
                if ($body.text().includes('Epaisseur')) {
                    cy.get(ObjetBOdata.InputEpaisseur).clear().type(5)
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
                    cy.get(ObjetBOdata.InputDateDebutTravaux).clear()
                    cy.get(ObjetBOdata.InputDateDebutTravaux).click().type(dateString)
                }

            //couper ici
                if ($body.text().includes('Biomasse ligneuse')) {
                    cy.get(ObjetBOdata.btRadioBiomasseLigneuse).click()
                }
                if ($body.text().includes('Efficacité energitique')) {
                    cy.get(ObjetBOdata.inputEfficaciteEnergitique).clear().type('5')
                }
                if ($body.text().includes('Puissance thermique normale energitique')) {
                    cy.get(ObjetBOdata.inputPuissThermoqueNormale).clear().type('5')
                }
                if ($body.text().includes('regulateur')) {
                    cy.get(ObjetBOdata.inputClassRegulateur).clear().type('5')
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
                    cy.get(ObjetBOdata.inputEfficaciteEnergitiqueSaison).clear().type(109)
                }
                if ($body.text().includes('Surface habitable réelle')) {
                    cy.get(ObjetBOdata.inputSurfHabReelle).clear().type(90)
                }
                if ($body.text().includes('Puissance thermique valide réelle')) {
                    cy.get(ObjetBOdata.selectPuissThermValidReelle).select("Non")
                }
                if ($body.text().includes('Marque de la chaudière')) {
                    cy.get(ObjetBOdata.inputMarqueChaud).clear().type('marque')
                }
                if ($body.text().includes('Référence de la chaudière')) {
                    cy.get(ObjetBOdata.inputRefChaudiere).clear().type(1111)
                }
                if ($body.text().includes('Marque du régulateur')) {
                    cy.get(ObjetBOdata.inputMarqueRegulateur).clear().type('marque')
                }
                if ($body.text().includes('Référence du régulateur')) {
                    cy.get(ObjetBOdata.inputRefRegulateur).clear().type(1111)
                }
                if ($body.text().includes('Classe du régulateur')) {
                    cy.get(ObjetBOdata.selectClasseRegulateur).select("IV")
                }
                if ($body.text().includes('Montant prime payée')) {
                    cy.get(ObjetBOdata.inputMontantPrimePayee).clear().type(1000)
                }
                if ($body.text().includes('N° facture')) {
                    cy.get(ObjetBOdata.inputNumFacture).clear().type(1111)
                }
                if ($body.text().includes('Surface chaufée réelle')) {
                    cy.get(ObjetBOdata.inputSurfaceChauffeeReel).clear().type(50)
                }
                if ($body.text().includes('Type de PAC réel')) {
                    cy.get(ObjetBOdata.SelectTypePompeChaleurReel).select("Basse température")
                }
                if ($body.text().includes('Montant prime payée')) {
                    cy.get(ObjetBOdata.inputMontantPrimePayee).type(OScreesdata.MontantPrime.substring(0,3))
                }    
        })
        cy.wait(1000)
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.wait(1000)
        cy.get(ObjetBOdata.btValideControleFactureSansEnvMail).click({force:true})
    })
    And ('Valider le controle de la facture sans l envoie de mail dans BO sans date de visite',() => {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Un document complémentaire de type')) {
                cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
            }
        })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet5).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.DisplaySousTraitant).click()
        cy.get(ObjetBOdata.setSameOK).click()
        cy.get(ObjetBOdata.inputRaisonSociale).clear().type('Teksial')
        cy.get('body').then(($body) => {
                cy.get(ObjetBOdata.inputSiretSousTraitant).clear().type(donneesTest.siret)
                if ($body.text().includes('Résistance thermique')) {
                    cy.get(ObjetBOdata.InputRaisistanceThermique).clear().type(3)
                }
                if ($body.text().includes('Surface isolant reel ')) {
                    cy.get(ObjetBOdata.InputSurfaceIsolantReel).clear().type(50)
                }
                if ($body.text().includes('Epaisseur')) {
                    cy.get(ObjetBOdata.InputEpaisseur).clear().type(5)
                }
                /*if ($body.text().includes('Date de visite')) {
                    var dateString = moment().add(1, 'days').format('YYYY-MM-DD');
                    cy.get(ObjetBOdata.inputDateVisiteFacture).click().type(dateString)
                }*/
                if ($body.text().includes('Combles perdus')) {
                    cy.get(ObjetBOdata.selectTypePause).select("Combles perdus")
                }
                if ($body.text().includes('Mise en place d’un pare-vapeur ou équivalent')) {
                    cy.get(ObjetBOdata.selectMiseParVapeur).select("Non")
                }
                if ($body.text().includes('Date de début des travaux')) {
                    var dateString = moment().add(8, 'days').format('DD-MM-YYYY')
                    cy.get(ObjetBOdata.InputDateDebutTravaux).clear()
                    cy.get(ObjetBOdata.InputDateDebutTravaux).click().type(dateString)
                }

            //couper ici
                if ($body.text().includes('Biomasse ligneuse')) {
                    cy.get(ObjetBOdata.btRadioBiomasseLigneuse).click()
                }
                if ($body.text().includes('Efficacité energitique')) {
                    cy.get(ObjetBOdata.inputEfficaciteEnergitique).clear().type('5')
                }
                if ($body.text().includes('Puissance thermique normale energitique')) {
                    cy.get(ObjetBOdata.inputPuissThermoqueNormale).clear().type('5')
                }
                if ($body.text().includes('regulateur')) {
                    cy.get(ObjetBOdata.inputClassRegulateur).clear().type('5')
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
                    cy.get(ObjetBOdata.inputEfficaciteEnergitiqueSaison).clear().type(109)
                }
                if ($body.text().includes('Surface habitable réelle')) {
                    cy.get(ObjetBOdata.inputSurfHabReelle).clear().type(90)
                }
                if ($body.text().includes('Puissance thermique valide réelle')) {
                    cy.get(ObjetBOdata.selectPuissThermValidReelle).select("Non")
                }
                if ($body.text().includes('Marque de la chaudière')) {
                    cy.get(ObjetBOdata.inputMarqueChaud).clear().type('marque')
                }
                if ($body.text().includes('Référence de la chaudière')) {
                    cy.get(ObjetBOdata.inputRefChaudiere).clear().type(1111)
                }
                if ($body.text().includes('Marque du régulateur')) {
                    cy.get(ObjetBOdata.inputMarqueRegulateur).clear().type('marque')
                }
                if ($body.text().includes('Référence du régulateur')) {
                    cy.get(ObjetBOdata.inputRefRegulateur).clear().type(1111)
                }
                if ($body.text().includes('Classe du régulateur')) {
                    cy.get(ObjetBOdata.selectClasseRegulateur).select("IV")
                }
                if ($body.text().includes('Montant prime payée')) {
                    cy.get(ObjetBOdata.inputMontantPrimePayee).click({force:true})
                    cy.get(ObjetBOdata.inputMontantPrimePayee).clear().type(1000)
                }
                if ($body.text().includes('N° facture')) {
                    cy.get(ObjetBOdata.inputNumFacture).clear().type(1111)
                }
                if ($body.text().includes('Surface chaufée réelle')) {
                    cy.get(ObjetBOdata.inputSurfaceChauffeeReel).clear().type(50)
                }
                if ($body.text().includes('Type de PAC réel')) {
                    cy.get(ObjetBOdata.SelectTypePompeChaleurReel).select("Basse température")
                }
                if ($body.text().includes('Montant prime payée')) {
                    cy.get(ObjetBOdata.inputMontantPrimePayee).type(OScreesdata.MontantPrime.substring(0,3))
                }    
        })
        cy.wait(1000)
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.wait(1000)
        cy.get(ObjetBOdata.btValideControleFactureSansEnvMail).click({force:true})
    })
    And ('Valider le controle de la facture en KO Definitif pour motif {string} sans l envoie de mail dans BO',(motif) => {
            cy.get('body').then(($body) => {
                if ($body.text().includes('Un document complémentaire de type')) {
                    cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
                }
            })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet5).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.DisplaySousTraitant).click()
        cy.get(ObjetBOdata.setSameOK).click()
        if (motif == 'date edition<1an'){
                cy.get(ObjetBOdata.btKOFacture).each(($el,index) => {
                    if(index == 1){
                        cy.wrap($el).click()
                    }
                })
            cy.get(ObjetBOdata.MotifFactureKODtEditInf1an).click({force:true})
        }else if (motif == 'date facture<devis signé'){
            cy.get(ObjetBOdata.btKOFacture).each(($el,index) => {
               if(index == 3){
                    cy.wrap($el).click()
                }
            })
            cy.get(ObjetBOdata.MotifKoDateFactureInfdevisSigné).click({force:true})
        }
        cy.get(ObjetBOdata.inputRaisonSociale).clear().type('Teksial')
        cy.get('body').then(($body) => {
                cy.get(ObjetBOdata.inputSiretSousTraitant).clear().type(donneesTest.siret)
                if ($body.text().includes('Résistance thermique')) {
                    cy.get(ObjetBOdata.InputRaisistanceThermique).clear().type(3)
                }
                if ($body.text().includes('Surface isolant reel ')) {
                    cy.get(ObjetBOdata.InputSurfaceIsolantReel).clear().type(50)
                }
                if ($body.text().includes('Epaisseur')) {
                    cy.get(ObjetBOdata.InputEpaisseur).clear().type(5)
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
                    cy.get(ObjetBOdata.InputDateDebutTravaux).clear()
                    cy.get(ObjetBOdata.InputDateDebutTravaux).click().type(dateString)
                }

            //couper ici
                if ($body.text().includes('Biomasse ligneuse')) {
                    cy.get(ObjetBOdata.btRadioBiomasseLigneuse).click()
                }
                if ($body.text().includes('Efficacité energitique')) {
                    cy.get(ObjetBOdata.inputEfficaciteEnergitique).clear().type('5')
                }
                if ($body.text().includes('Puissance thermique normale energitique')) {
                    cy.get(ObjetBOdata.inputPuissThermoqueNormale).clear().type('5')
                }
                if ($body.text().includes('regulateur')) {
                    cy.get(ObjetBOdata.inputClassRegulateur).clear().type('5')
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
                    cy.get(ObjetBOdata.inputEfficaciteEnergitiqueSaison).clear().type(109)
                }
                if ($body.text().includes('Surface habitable réelle')) {
                    cy.get(ObjetBOdata.inputSurfHabReelle).clear().type(90)
                }
                if ($body.text().includes('Puissance thermique valide réelle')) {
                    cy.get(ObjetBOdata.selectPuissThermValidReelle).select("Non")
                }
                if ($body.text().includes('Marque de la chaudière')) {
                    cy.get(ObjetBOdata.inputMarqueChaud).clear().type('marque')
                }
                if ($body.text().includes('Référence de la chaudière')) {
                    cy.get(ObjetBOdata.inputRefChaudiere).clear().type(1111)
                }
                if ($body.text().includes('Marque du régulateur')) {
                    cy.get(ObjetBOdata.inputMarqueRegulateur).clear().type('marque')
                }
                if ($body.text().includes('Référence du régulateur')) {
                    cy.get(ObjetBOdata.inputRefRegulateur).clear().type(1111)
                }
                if ($body.text().includes('Classe du régulateur')) {
                    cy.get(ObjetBOdata.selectClasseRegulateur).select("IV")
                }
                if ($body.text().includes('Surface chaufée réelle')) {
                    cy.get(ObjetBOdata.inputSurfaceChauffeeReel).clear().type(50)
                }
                if ($body.text().includes('Type de PAC réel')) {
                    cy.get(ObjetBOdata.SelectTypePompeChaleurReel).select("Basse température")
                }
                if ($body.text().includes('Montant prime payée')) {
                    cy.get(ObjetBOdata.inputMontantPrimePayee).type(OScreesdata.MontantPrime.substring(0,3))
                }    
        })
        cy.wait(1000)
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.wait(1000)
        cy.get(ObjetBOdata.btValideControleFactureSansEnvMail).click({force:true})
    })
    And ('Valider le controle de la facture en KO TEMP pour motif {string} sans l envoie de mail dans BO',(motif) => {
            cy.get('body').then(($body) => {
                if ($body.text().includes('Un document complémentaire de type')) {
                    cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
                }
            })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet5).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.DisplaySousTraitant).click()
        cy.get(ObjetBOdata.setSameKO).click()
        if (motif == 'Artisan different du devis'){
            cy.xpath(ObjetBOdata.btKOArtisan).click()
            cy.xpath(ObjetBOdata.SelectMotifArtisan).click({force:true})
            cy.xpath(ObjetBOdata.MotifArtisanDiffDevis).click({force:true})
        }else if (motif == 'Numero de la facture manquant'){
            cy.xpath(ObjetBOdata.btKOFactureNumFac).click()
            cy.xpath(ObjetBOdata.motifNumFactureManqu).click({force:true})
        }
        cy.get(ObjetBOdata.inputRaisonSociale).clear().type('Teksial')
        cy.get('body').then(($body) => {
                cy.get(ObjetBOdata.inputSiretSousTraitant).clear().type(donneesTest.siret)
                if ($body.text().includes('Résistance thermique')) {
                    cy.get(ObjetBOdata.InputRaisistanceThermique).clear().type(3)
                }
                if ($body.text().includes('Surface isolant reel ')) {
                    cy.get(ObjetBOdata.InputSurfaceIsolantReel).clear().type(50)
                }
                if ($body.text().includes('Epaisseur')) {
                    cy.get(ObjetBOdata.InputEpaisseur).clear().type(5)
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
                    cy.get(ObjetBOdata.InputDateDebutTravaux).clear()
                    cy.get(ObjetBOdata.InputDateDebutTravaux).click().type(dateString)
                }

            //couper ici
                if ($body.text().includes('Biomasse ligneuse')) {
                    cy.get(ObjetBOdata.btRadioBiomasseLigneuse).click()
                }
                if ($body.text().includes('Efficacité energitique')) {
                    cy.get(ObjetBOdata.inputEfficaciteEnergitique).clear().type('5')
                }
                if ($body.text().includes('Puissance thermique normale energitique')) {
                    cy.get(ObjetBOdata.inputPuissThermoqueNormale).clear().type('5')
                }
                if ($body.text().includes('regulateur')) {
                    cy.get(ObjetBOdata.inputClassRegulateur).clear().type('5')
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
                    cy.get(ObjetBOdata.inputEfficaciteEnergitiqueSaison).clear().type(109)
                }
                if ($body.text().includes('Surface habitable réelle')) {
                    cy.get(ObjetBOdata.inputSurfHabReelle).clear().type(90)
                }
                if ($body.text().includes('Puissance thermique valide réelle')) {
                    cy.get(ObjetBOdata.selectPuissThermValidReelle).select("Non")
                }
                if ($body.text().includes('Marque de la chaudière')) {
                    cy.get(ObjetBOdata.inputMarqueChaud).clear().type('marque')
                }
                if ($body.text().includes('Référence de la chaudière')) {
                    cy.get(ObjetBOdata.inputRefChaudiere).clear().type(1111)
                }
                if ($body.text().includes('Marque du régulateur')) {
                    cy.get(ObjetBOdata.inputMarqueRegulateur).clear().type('marque')
                }
                if ($body.text().includes('Référence du régulateur')) {
                    cy.get(ObjetBOdata.inputRefRegulateur).clear().type(1111)
                }
                if ($body.text().includes('Classe du régulateur')) {
                    cy.get(ObjetBOdata.selectClasseRegulateur).select("IV")
                }
                if ($body.text().includes('Surface chaufée réelle')) {
                    cy.get(ObjetBOdata.inputSurfaceChauffeeReel).clear().type(50)
                }
                if ($body.text().includes('Type de PAC réel')) {
                    cy.get(ObjetBOdata.SelectTypePompeChaleurReel).select("Basse température")
                }
                if ($body.text().includes('Montant prime payée')) {
                    cy.get(ObjetBOdata.inputMontantPrimePayee).type(OScreesdata.MontantPrime.substring(0,3))
                }    
        })
        cy.wait(1000)
        cy.get(ObjetBOdata.btSuivant).click()
        cy.wait(1000)
        cy.get(ObjetBOdata.btValideControleFactureSansEnvMail).click({force:true})
        cy.get(ObjetBOdata.os_statut_dossier_title).should('have.text','A_TRAITER')
    })
    And ('Valider le controle de la facture en KO TEMP pour motif {string} sans l envoie de mail dans BO sans date visite',(motif) => {
            cy.get('body').then(($body) => {
                if ($body.text().includes('Un document complémentaire de type')) {
                    cy.xpath(ObjetBOdata.btFermerModal).click({force:true})
                }
            })
        cy.xpath(ObjetBOdata.btControler).click()
        cy.xpath(ObjetBOdata.onglet5).click()
        cy.get(ObjetBOdata.checkAllOK).click()
        cy.get(ObjetBOdata.DisplaySousTraitant).click()
        cy.get(ObjetBOdata.setSameKO).click()
        if (motif == 'Artisan different du devis'){
            cy.xpath(ObjetBOdata.btKOArtisan).click()
            cy.xpath(ObjetBOdata.SelectMotifArtisan).click({force:true})
            cy.xpath(ObjetBOdata.MotifArtisanDiffDevis).click({force:true})
        }else if (motif == 'Numero de la facture manquant'){
            cy.xpath(ObjetBOdata.btKOFactureNumFac).click()
            cy.xpath(ObjetBOdata.motifNumFactureManqu).click({force:true})
        }
        cy.get(ObjetBOdata.inputRaisonSociale).clear().type('Teksial')
        cy.get('body').then(($body) => {
                cy.get(ObjetBOdata.inputSiretSousTraitant).clear().type(donneesTest.siret)
                if ($body.text().includes('Résistance thermique')) {
                    cy.get(ObjetBOdata.InputRaisistanceThermique).clear().type(3)
                }
                if ($body.text().includes('Surface isolant reel ')) {
                    cy.get(ObjetBOdata.InputSurfaceIsolantReel).clear().type(50)
                }
                if ($body.text().includes('Epaisseur')) {
                    cy.get(ObjetBOdata.InputEpaisseur).clear().type(5)
                }
                if ($body.text().includes('Combles perdus')) {
                    cy.get(ObjetBOdata.selectTypePause).select("Combles perdus")
                }
                if ($body.text().includes('Mise en place d’un pare-vapeur ou équivalent')) {
                    cy.get(ObjetBOdata.selectMiseParVapeur).select("Non")
                }
                if ($body.text().includes('Date de début des travaux')) {
                    var dateString = moment().add(8, 'days').format('DD-MM-YYYY')
                    cy.get(ObjetBOdata.InputDateDebutTravaux).clear()
                    cy.get(ObjetBOdata.InputDateDebutTravaux).click().type(dateString)
                }

            //couper ici
                if ($body.text().includes('Biomasse ligneuse')) {
                    cy.get(ObjetBOdata.btRadioBiomasseLigneuse).click()
                }
                if ($body.text().includes('Efficacité energitique')) {
                    cy.get(ObjetBOdata.inputEfficaciteEnergitique).clear().type('5')
                }
                if ($body.text().includes('Puissance thermique normale energitique')) {
                    cy.get(ObjetBOdata.inputPuissThermoqueNormale).clear().type('5')
                }
                if ($body.text().includes('regulateur')) {
                    cy.get(ObjetBOdata.inputClassRegulateur).clear().type('5')
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
                    cy.get(ObjetBOdata.inputEfficaciteEnergitiqueSaison).clear().type(109)
                }
                if ($body.text().includes('Surface habitable réelle')) {
                    cy.get(ObjetBOdata.inputSurfHabReelle).clear().type(90)
                }
                if ($body.text().includes('Puissance thermique valide réelle')) {
                    cy.get(ObjetBOdata.selectPuissThermValidReelle).select("Non")
                }
                if ($body.text().includes('Marque de la chaudière')) {
                    cy.get(ObjetBOdata.inputMarqueChaud).clear().type('marque')
                }
                if ($body.text().includes('Référence de la chaudière')) {
                    cy.get(ObjetBOdata.inputRefChaudiere).clear().type(1111)
                }
                if ($body.text().includes('Marque du régulateur')) {
                    cy.get(ObjetBOdata.inputMarqueRegulateur).clear().type('marque')
                }
                if ($body.text().includes('Référence du régulateur')) {
                    cy.get(ObjetBOdata.inputRefRegulateur).clear().type(1111)
                }
                if ($body.text().includes('Classe du régulateur')) {
                    cy.get(ObjetBOdata.selectClasseRegulateur).select("IV")
                }
                if ($body.text().includes('Surface chaufée réelle')) {
                    cy.get(ObjetBOdata.inputSurfaceChauffeeReel).clear().type(50)
                }
                if ($body.text().includes('Type de PAC réel')) {
                    cy.get(ObjetBOdata.SelectTypePompeChaleurReel).select("Basse température")
                }
                if ($body.text().includes('Montant prime payée')) {
                    cy.get(ObjetBOdata.inputMontantPrimePayee).type(OScreesdata.MontantPrime.substring(0,3))
                }    
        })
        cy.wait(1000)
        cy.get(ObjetBOdata.btSuivant).click({force:true})
        cy.wait(1000)
        cy.get(ObjetBOdata.btValideControleFactureSansEnvMail).click({force:true})
        cy.get(ObjetBOdata.os_statut_dossier_title).should('have.text','A_TRAITER')
    })


