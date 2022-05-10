import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
const moment = require('moment');

let ObjetBOdata
let OScreesdata
let monExpertData
let donneesTest
let ProCeedata
let numDepot
let SimulData
let surfaceReelle
let statusReel
let cumacReel
let EnergieReel
var pos = 0
let primeReel

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
    Given('Selection du Depot et telechargement du fichier Emmy',() => {
        cy.task('deleteFolder', "cypress/fixtures/justificatifs/Emmy")
        cy.wait(1000)
        cy.task('createFolder', "cypress/fixtures/justificatifs/Emmy")
        cy.get(ObjetBOdata.Depot).click()
        cy.get(ObjetBOdata.ListDepot).click()
        cy.xpath(ObjetBOdata.ElementLstDepot).invoke('text').then((text) => {
            numDepot = text
            let url = Cypress.config().baseUrlBO
            var posSlach = url.length
            for (let i = 0; i < url.length; i++) {
                if (url.substring(i,i+3)=='fr/'){
                    posSlach = i+3
                }
            }
            let monUrl = url.substring(0,posSlach)
            cy.downloadFile(monUrl+"os/depot/export/"+numDepot,'cypress/fixtures/justificatifs/Emmy','Emmy'+numDepot+".xlsx")        
        })
    })
    And ('Recuperation des infos chantier {string}',(OS)=>{
        cy.get("body").then($body => {
            cy.get("#app_form_backend_"+OS+"_projet_precariteReel").invoke('val').then(valStatus => {
                statusReel = valStatus
            })
            if($body.find("#app_form_backend_"+OS+"_attestationAttachedToCee_partieAs_0_surfaceIsolantReel").is(':visible')){
                cy.get("#app_form_backend_"+OS+"_attestationAttachedToCee_partieAs_0_surfaceIsolantReel").invoke('val').then(valSurface => {
                    surfaceReelle = valSurface
                })
            }else if($body.find("#app_form_backend_"+OS+"surfaceChauffeeReel").is(':visible')){
                cy.get("#app_form_backend_"+OS+"surfaceChauffeeReel").invoke('val').then(valSurface => {
                    surfaceReelle = valSurface
                })
            }
            cy.get("#app_form_backend_"+OS+"_cumacReel").invoke('val').then(valCumacReel => {
                cumacReel = valCumacReel
            })
            if ($body.find("#app_form_backend_"+OS+"_energieReel").is(':visible')){
                cy.get("#app_form_backend_"+OS+"_energieReel").invoke('val').then(valEnergieReel => {
                    EnergieReel = valEnergieReel
                })
            }
            if ($body.find("#app_form_backend_"+OS+"_primeReel").is(':visible')){
                cy.get("#app_form_backend_"+OS+"_primeReel").invoke('text').then(valprimeReel => {
                    primeReel = valprimeReel
                })
            }
        })
        cy.log("statusReelstatusReelstatusReelstatusReelstatusReel            "+statusReel)
        cy.log("surfaceReellesurfaceReellesurfaceReellesurfaceReelle            "+surfaceReelle)
        cy.log("cumacReelcumacReelcumacReelcumacReelcumacReelcumacReel            "+cumacReel)
        cy.log("EnergieReelEnergieReelEnergieReelEnergieReelEnergieReel            "+EnergieReel)
        cy.log("primeReelprimeReelprimeReelprimeReelprimeReelprimeReel            "+primeReel)
    })
    When('Lecture du fichier Emmy {string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',(OS,bucket,adresse,CP,ville,revenus,CDP,logement,surface,chauffageLogement) => {
        cy.task('parseXlsx',"cypress/fixtures/justificatifs/Emmy/Emmy"+numDepot+".xlsx").then( jsonData =>{
            const rowLength = Cypress.$(jsonData[0].data).length
            let nbreCol = jsonData[0].data[0].length
            cy.log("nombre colonne    "+nbreCol)
            expect(nbreCol).to.eq(203)
            var idOS = ""
            if (location.hostname.includes('qatest')){
                idOS = OScreesdata.idOSQA
            }else if (location.hostname.includes('preprod')){
                idOS = OScreesdata.idOSPP
            }        
            for (let index = 1; index < rowLength; index++){ 
                for (let j = 0; j < nbreCol; j++){
                    cy.log("OS_"+index+":  "+jsonData[0].data[0][j]+" : "+jsonData[0].data[index][j])

                    if (jsonData[0].data[0][j] == "Codeequipement"){expect(jsonData[0].data[index][j]).to.eq(OS)}
                    if (jsonData[0].data[0][j] == "Date de début"){expect(jsonData[0].data[index][j]).to.include("-")}
                    if (jsonData[0].data[0][j] == "Date de fin"){expect(jsonData[0].data[index][j]).to.include("-")}
                    if (jsonData[0].data[0][j] == "Date de la facture"){expect(jsonData[0].data[index][j]).to.include("-")}
                    if (jsonData[0].data[0][j] == "Trame champ 1"){expect(jsonData[0].data[index][j].toString()).to.eq(idOS)}
                    if (jsonData[0].data[0][j] == "Trame champ 2"){expect(jsonData[0].data[index][j].toString()).to.eq("TestAuto")}
                    if (jsonData[0].data[0][j] == "Trame champ 3"){expect(jsonData[0].data[index][j].toString()).to.eq("TestAuto")}
                    if (jsonData[0].data[0][j] == "Trame champ 4"){expect(jsonData[0].data[index][j]).to.include(adresse)}
                    if (jsonData[0].data[0][j] == "Trame champ 5"){expect(jsonData[0].data[index][j].toString()).to.eq(CP)}
                    if (jsonData[0].data[0][j] == "Trame champ 6"){expect(jsonData[0].data[index][j]).to.eq(ville)}
                    if (jsonData[0].data[0][j] == "Trame champ 7"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Trame champ 8"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Trame champ 9"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Trame champ 10"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Trame champ 11"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Trame champ 12"){
                        if (bucket == "T2"){
                            expect(jsonData[0].data[index][j].toString()).to.include((donneesTest.siretT2).substring(0,9))
                        }else if (bucket ==  "T5"){
                            expect(jsonData[0].data[index][j].toString()).to.include((donneesTest.siret).substring(0,9))
                        }
                    }
                    if (jsonData[0].data[0][j] == "Trame champ 13"){
                        if (bucket == "T2"){
                            expect(jsonData[0].data[index][j].toString()).to.eq("2JVS")
                        }else if (bucket ==  "T5"){
                            expect(jsonData[0].data[index][j].toString()).to.eq("Teksial")
                        }
                    }
                    if (jsonData[0].data[0][j] == "Trame champ 14"){
                        if (statusReel == "PRECAIRE_ENERGETIQUE" || statusReel == "MODESTE"){
                            expect(jsonData[0].data[index][j].toString()).to.include(donneesTest.refAvisimpots)
                            expect(jsonData[0].data[index][j].toString()).to.include(donneesTest.numFiscal)
                        }else if (statusReel == "STANDARD"){
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                    if (jsonData[0].data[0][j] == "Trame champ 15"){expect(jsonData[0].data[index][j].toString()).to.include((donneesTest.siret).substring(0,9))}
                    if (jsonData[0].data[0][j] == "Trame champ 16"){expect(jsonData[0].data[index][j].toString()).to.eq("Teksial")}
                    if (jsonData[0].data[0][j] == "Trame champ 17"){expect(jsonData[0].data[index][j]).to.not.null}
                    if (jsonData[0].data[0][j] == "SIREN Bureau de contrôle"){
                        expect(jsonData[0].data[index][j]).to.null
                    }
                    if (jsonData[0].data[0][j] == "Raison sociale Bureau de contrôle"){
                        expect(jsonData[0].data[index][j]).to.null
                    }
                    if (jsonData[0].data[0][j] == "Trame champ 20"){
                        if (OS == "BAR-EN-101" || OS == "BAR-EN-102" || OS == "BAR-EN-103" || OS == "BAR-EN-104" || OS == "BAR-EN-105" || OS == "BAR-EN-108"
                            || OS == "BAR-TH-101" || OS == "BAR-TH-104" || OS == "BAR-TH-106" || OS == "BAR-TH-113" || OS == "BAR-TH-143" || OS == "BAR-TH-148"
                            || OS == "BAR-TH-159"){
                            expect(jsonData[0].data[index][j]).to.not.null
                        }else{
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                    if (jsonData[0].data[0][j] == "Trame champ 22"){expect(jsonData[0].data[index][j]).to.eq((donneesTest.user))}
                    if (jsonData[0].data[0][j] == "Trame champ 23"){expect(jsonData[0].data[index][j]).to.include((primeReel))}
                    if (jsonData[0].data[0][j] == "PAEE"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "SME"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Bonus précarité"){
                        if (CDP == "NON"){
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }else{
                            if (OS == "BAR-EN-103"){
                                expect(jsonData[0].data[index][j]).to.eq(4)
                            }else{
                                expect(jsonData[0].data[index][j]).to.eq(3)
                            }
                        }
                    }
                    if (jsonData[0].data[0][j] == "Cas précarité"){
                        if (statusReel == "PRECAIRE_ENERGETIQUE" || statusReel == "MODESTE"){
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }else if (statusReel == "STANDARD"){
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                    if (jsonData[0].data[0][j] == "Nombre total de ménages"){expect(jsonData[0].data[index][j]).to.eq(1)}
                    if (jsonData[0].data[0][j] == "Nombre total de ménages occupant des logements sociaux"){expect(jsonData[0].data[index][j]).to.eq(0)}
                    if (jsonData[0].data[0][j] == "Nombre de ménages en situation de précarité"){
                        if (statusReel == "PRECAIRE_ENERGETIQUE"){
                            expect(jsonData[0].data[index][j]).to.eq(1)
                        }else{
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }
                    }
                    if (jsonData[0].data[0][j] == "Nombre de ménages en situation de grande précarité"){
                        // if (revenus == "PRECAIRE_ENERGETIQUE"){
                        //     expect(jsonData[0].data[index][j]).to.eq(1)
                        // }else{
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        // }
                    }
                    if (jsonData[0].data[0][j] == "Pourcentage de ménages en situation de précarité"){
                        if (statusReel == "PRECAIRE_ENERGETIQUE"){
                            expect(jsonData[0].data[index][j]).to.eq(100)
                        }else{
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }
                    }
                    if (jsonData[0].data[0][j] == "Pourcentage de ménages en situation de grande précarité"){
                        // if (revenus == "PRECAIRE_ENERGETIQUE"){ // precaireenergetique dans les données reelles
                        //     expect(jsonData[0].data[index][j]).to.eq(100)
                        // }else{
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        // }
                    }
                    if (jsonData[0].data[0][j] == "Menage Modeste"){
                        if (statusReel == "MODESTE"){
                            expect(jsonData[0].data[index][j]).to.eq(1)
                        }else{
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }
                    }
                    if (jsonData[0].data[0][j] == "Nombre de Menage Modeste"){expect(jsonData[0].data[index][j]).to.eq(0)}
                    if (jsonData[0].data[0][j] == "Anciennete"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type logement"){
                        if (logement == "maison"){
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }else{
                            expect(jsonData[0].data[index][j]).to.eq(1)
                        }
                    }
                    if (jsonData[0].data[0][j] == "Departement"){expect(jsonData[0].data[index][j].toString()).to.eq(CP.substring(0,2))}
                    if (jsonData[0].data[0][j] == "Altitude"){expect(jsonData[0].data[index][j]).to.not.null}
                    if (jsonData[0].data[0][j] == "Iles"){expect(jsonData[0].data[index][j]).to.not.null}
                    if (jsonData[0].data[0][j] == "Nombre opération"){expect(jsonData[0].data[index][j]).to.eq(1)}
                    if (jsonData[0].data[0][j] == "Résistance Thermique"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Energie de chauffage"){
                        // if (OS == "BAR-EN-102"){
                            if (EnergieReel == 1){
                                expect(jsonData[0].data[index][j]).to.eq(0)
                            }else if(EnergieReel == 2){
                                expect(jsonData[0].data[index][j]).to.eq(1)
                            }
                        // }else{
                        //     expect(jsonData[0].data[index][j]).to.null
                        // }
                    }
                    if (jsonData[0].data[0][j] == "Surface"){
                        if (OS == "BAR-EN-101" || OS == "BAR-EN-102" || OS == "BAR-EN-103" || OS == "BAR-EN-105" ||
                        OS == "BAR-TH-116"){
                            expect(jsonData[0].data[index][j]).to.eq(parseInt(surfaceReelle))
                        }else{
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                    if (jsonData[0].data[0][j] == "PES"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "COP"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre de pieces"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Surface Habitable"){
                        if (OS == "BAR-TH-104" && logement == "appartement"){
                            expect(jsonData[0].data[index][j]).to.eq(1)
                        }else if (OS == "BAR-TH-104" && logement == "maison"){
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }else {
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                    if (jsonData[0].data[0][j] == "USAGE"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "chauffage collectif"){
                        if (OS == "BAR-TH-110" || OS == "BAR-TH-116" || OS == "BAR-TH-117" || OS == "BAR-TH-118"){
                            if (logement == "Appartement" && chauffageLogement == "individuel"){
                                expect(jsonData[0].data[index][j]).to.eq(0)
                            }else if (logement == "Appartement" && chauffageLogement == "collectif"){
                                expect(jsonData[0].data[index][j]).to.eq(1)
                            }else{
                                expect(jsonData[0].data[index][j]).to.null
                            }
                        }else{
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                    if (jsonData[0].data[0][j] == "PTH"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Metre lineaire"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type appareil"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Participation financière"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Secteur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Branche"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Puissance Chaudière"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Application"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Puissance"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "PuissanceBTU"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "PuissanceTube"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Puissance Lampelodure"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "TypeLampe"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Source Energie"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "CRN"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "TypeCanalisation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "DNaller"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Dureemoyen"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Mode fonctionnement"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Puissance_luminaire"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type_moteur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "type_application"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Application_moteur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Combustible"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Longueur_UTI"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "duree_contrat"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "type_autobus"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "type_vehicule"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Longueur_canalisation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Contrat"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "C'ref"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "C'projet"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Shon"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Caisson"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Part des besoins"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "TCB"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Locaux"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Lux"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "nb blocs"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "durée vie"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "réfrigerant"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "C"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type condenseur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Vecs"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type transformateur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Pertes à vide"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Pertes en charge"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre moyen d'utilisateurs"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Activité"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Températeur de la source (en °C)"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "P comp eau/eau"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "P pompe cond"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Dcta"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Delta T°C"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "T Condensation initilale °C"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Production de froid"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Lubrifiant en m3"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == 'Performance "fuel economy"'){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre de pneus"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre de kilomètres"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Classe énergétique"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Delta T Condenseur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Niveau d'évaporation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type d'installation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Somme"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Energy efficiency ratio"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre de capteurs"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre de fenêtres ou porte-fenêtres"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Régulateur de jets"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Cadre de la demande"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Durée de garantie de performance du CPE"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Facteur solaire"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type de transport"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Typologie d'autoroute ferroviaire"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Cef initial"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Cef projet"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Ubât initial"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Ubât projet"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Pourcentage d'économie d'énergie garantie par le CPE"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "T.km"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "P modifiée"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "P installée"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Conso. spécifique"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Production annuelle"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Gain préchauffage"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Ecart de température"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Installation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Récupération pour valorisation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Bassin de navigation fluviale"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Rg à 0°C"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Rg à -20°C"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Hauteur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre d'effets"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Pourcentage"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nb places maternité"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nb places post sevrage"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Versement de fonds"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Facteur de proportionnalité"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type de montage"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Teff"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type de meuble"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Position du groupe de production"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Coefficient de bonification"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nature du fluide distribué"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Année de mise en circulation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Gain dû à l’équipement"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Longueur de meubles frigorifiques équipés de couvercles (m)"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre de points singuliers isolés"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Montant en kW"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type de ventilation"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type de séquenceur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre de compresseurs pilotés"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Durée annuelle d'utilisation du réseau"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre d'appartement"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type ΔT condenseur"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Coefficient"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Volume"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Gain(%)"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Concentration"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "COP"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Multisplit"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Taux(%)"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Efficacité énergétique saisonnière"){
                        if (surface >= 102 && surface < 110 && OS == "BAR-TH-104"){
                            expect(jsonData[0].data[index][j]).to.eq(0)
                        }else if (surface >= 110 && surface < 120 && OS == "BAR-TH-104"){
                            expect(jsonData[0].data[index][j]).to.eq(1)
                        }else if (surface >= 120 && OS == "BAR-TH-104"){
                            expect(jsonData[0].data[index][j]).to.eq(2)
                        }else {
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                    if (jsonData[0].data[0][j] == "CAS"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "R"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "IK"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Système de gestion de l'éclairage"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "dimensions du tube à LED"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Type d''acquisition"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Mode de chauffage"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "moyenne des émissions de CO2 en gCO2/km des véhicules acquis ou loués"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Puissance lampe LED"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Rg pondéré"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Nombre d'entités"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Cefmax : consommation conventionnelle d’énergie maximale"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Cefbat : consommation conventionnelle d’énergie du bâtiment"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Flux lumineux de la lampe en lumens"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Choix 1"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Choix 2"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Choix 3"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Choix 4"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Choix 5"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Choix 6"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Commentaire"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "Numéro d'identification du membre"){expect(jsonData[0].data[index][j]).to.null}
                    if (jsonData[0].data[0][j] == "QPV"){expect(jsonData[0].data[index][j]).to.eq(0)}
                    if (jsonData[0].data[0][j] == "Total précarité"){
                        if (statusReel == "PRECAIRE_ENERGETIQUE"){
                            expect(jsonData[0].data[index][j].toString()).to.eq(cumacReel)
                        }else{
                            expect(jsonData[0].data[index][j]).to.null
                        }              
                    }
                    if (jsonData[0].data[0][j] == "Total classique"){
                        if (statusReel == "standard"){
                            expect(jsonData[0].data[index][j].toString()).to.eq(cumacReel)
                        }else{
                            expect(jsonData[0].data[index][j]).to.null
                        }
                    }
                }
            }
        })
    })