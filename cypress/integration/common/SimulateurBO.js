import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
const moment = require('moment');

let ObjetBOdata
let OScreesdata
let monExpertData
let donneesTest
let ProCeedata
let reponseSimulateur
let SimulData

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
    Given('Simulation sur l OS {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',(OS,Zone,EnergieChauff,CoupDePouce,Precarite,TypeLogement,ETAS,SCOP,TypeInstall,TypeVMC) => {
        cy.get(ObjetBOdata.DomaineApplication).select('Résidentiel')
        cy.wait(2000)
        cy.get(ObjetBOdata.selectOS).select(OS)
        cy.wait(1000)
        if (Zone == "H1"){
            cy.get(ObjetBOdata.Departement).select('01 - AIN')
        }else if (Zone == "H2"){
            cy.get(ObjetBOdata.Departement).select('04 - ALPES-DE-HAUTE-PROVENCE')
        }else if (Zone == "H3"){
            cy.get(ObjetBOdata.Departement).select('06 - ALPES-MARITIMES')
        }
        if ((OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && CoupDePouce == "OUI")
            || (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && CoupDePouce == "OUI")
            || (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "OUI")
            || (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && CoupDePouce == "OUI")){
            cy.get(ObjetBOdata.selectDaySimul).select("30")
            cy.get(ObjetBOdata.selectMonthSimul).select("03")
            cy.get(ObjetBOdata.selectYearSimul).select("2022")
        }
        if(CoupDePouce == "OUI" || CoupDePouce == "OUI-v2"){
            cy.get(ObjetBOdata.coupDePouceOUI).click()
        }else if(CoupDePouce == "NON"){
            cy.get(ObjetBOdata.coupDePouceNON).click()
        }
        cy.get(ObjetBOdata.inputPrixUniCumac).type('0,5')
        if(EnergieChauff == "Electricite"){
            cy.get(ObjetBOdata.EnergieElectricite).click()
        }else if(EnergieChauff == "Combustible"){
            cy.get(ObjetBOdata.EnergieCombustible).click()
        }
        if(TypeLogement == "Appartement"){
            cy.get(ObjetBOdata.Appartement).click()
        }else if(TypeLogement == "Maison"){
            cy.get(ObjetBOdata.Maison).click()
        }
        cy.get('body').then(($body) => {
            if ($body.text().includes('Surface Habitable')) {
                if (OS == "BAR-TH-106 - Chaudière individuelle à haute performance énergétique" || OS == "BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable"){
                    cy.get(ObjetBOdata.inputSurfaceHabitable).type(95)
                }else{
                    cy.get(ObjetBOdata.inputSurfaceHabitable).type(100)
                }
            }
            if ($body.text().includes('Surface isolant')) {
                cy.get(ObjetBOdata.inputSurfaceIsolant).type(1)
            }
            if ($body.text().includes("Nombre d'appartements (Appartement uniquement)")) {
                cy.get(ObjetBOdata.inputNbrAppart).type(1)
            }
            if ($body.text().includes('ETAS')) {
                cy.get(ObjetBOdata.inputETAS).type(ETAS)
            }
            if ($body.text().includes('SCOP')) {
                cy.get(ObjetBOdata.inputSCOP).type(SCOP)
            }
            if ($body.text().includes('Surface Chauffee')) {
                if (TypeLogement == "Appartement"){
                    cy.get(ObjetBOdata.inputSurfaceChauffee).type(65)
                }else if (TypeLogement == "Maison"){
                    cy.get(ObjetBOdata.inputSurfaceChauffee).type(95)
                }
            }
            if ($body.text().includes('Niveau de consommation du caisson')) {
                cy.get(ObjetBOdata.btBasseConso).click()
            }
            if ($body.text().includes("Nombre de fenêtres ou d'ouvertures")) {
                cy.get(ObjetBOdata.inputNbFenetre).type(1)
            }
        })
        if(TypeInstall == "Individuelle"){
            cy.get(ObjetBOdata.btInstallIndividuel).click()
        }else if (TypeInstall == "Collective"){
            cy.get(ObjetBOdata.btInstallCollective).click()
        }
        if(TypeVMC == "A"){
            cy.get(ObjetBOdata.TypeA).click()
        }else if (TypeVMC == "B"){
            cy.get(ObjetBOdata.TypeB).click()
        }

        cy.get(ObjetBOdata.selectPrecarite).select(Precarite)
        cy.get(ObjetBOdata.btSimuler).click()

        cy.get(ObjetBOdata.reponseSimul).invoke('text').then(text=>{
            reponseSimulateur = text
        })
        cy.fixture("SimulateurData.json").then((SimulateurData) => {
            SimulData = SimulateurData

            //BAR-EN-101 - Isolation des combles ou de toiture
            if (OS == "BAR-EN-101 - Isolation des combles ou de toiture" && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_101_H1)
            }else if (OS == "BAR-EN-101 - Isolation des combles ou de toiture" && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_101_H2)
            }else if (OS == "BAR-EN-101 - Isolation des combles ou de toiture" && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_101_H3)
            }

            //BAR-TH-101 - chauffe eau solaire individuel
            if (OS == "BAR-TH-101 - chauffe eau solaire individuel" && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_101_H1)
            }else if (OS == "BAR-TH-101 - chauffe eau solaire individuel" && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_101_H2)
            }else if (OS == "BAR-TH-101 - chauffe eau solaire individuel" && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_101_H3)
            }

            //BAR-EN-102 - Isolation des murs
            if (OS == "BAR-EN-102 - Isolation des murs" && Zone == "H1" && EnergieChauff == "Electricite"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_102_H1_Electricite)
            }else if (OS == "BAR-EN-102 - Isolation des murs" && Zone == "H1" && EnergieChauff == "Combustible"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_102_H1_Combustible)
            }else if (OS == "BAR-EN-102 - Isolation des murs" && Zone == "H2" && EnergieChauff == "Electricite"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_102_H2_Electricite)
            }else if (OS == "BAR-EN-102 - Isolation des murs" && Zone == "H2" && EnergieChauff == "Combustible"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_102_H2_Combustible)
            }else if (OS == "BAR-EN-102 - Isolation des murs" && Zone == "H3" && EnergieChauff == "Electricite"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_102_H3_Electricite)
            }else if (OS == "BAR-EN-102 - Isolation des murs" && Zone == "H3" && EnergieChauff == "Combustible"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_102_H3_Combustible)
            }

            //BAR-EN-103 - Isolation d'un plancher
            if (OS == "BAR-EN-103 - Isolation d'un plancher" && Zone == "H1" && CoupDePouce == "NON"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_103_H1)
            }else if (OS == "BAR-EN-103 - Isolation d'un plancher" && Zone == "H2" && CoupDePouce == "NON"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_103_H2)
            }else if (OS == "BAR-EN-103 - Isolation d'un plancher" && Zone == "H3" && CoupDePouce == "NON"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_103_H3)
            }

            //BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant
            if (OS == "BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant" && Zone == "H1" && EnergieChauff == "Electricite"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_104_H1_Elect)
            }else if (OS == "BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant" && Zone == "H2" && EnergieChauff == "Electricite"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_104_H2_Elect)
            }else if (OS == "BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant" && Zone == "H3" && EnergieChauff == "Electricite"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_104_H3_Elect)
            }else if (OS == "BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant" && Zone == "H1" && EnergieChauff == "Combustible"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_104_H1_Combust)
            }else if (OS == "BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant" && Zone == "H2" && EnergieChauff == "Combustible"){
                 expect(reponseSimulateur).to.include(SimulData.BAR_EN_104_H2_Combust)
            }else if (OS == "BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant" && Zone == "H3" && EnergieChauff == "Combustible"){
                  expect(reponseSimulateur).to.include(SimulData.BAR_EN_104_H3_Combust)
            }

            //BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau
            if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && Precarite == "Précaire énergétique" && CoupDePouce == "OUI"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_AvecCdPPrecaire)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && Precarite == "Modeste" && CoupDePouce == "OUI"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_AvecCdPModeste)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && Precarite == "Standard" && CoupDePouce == "OUI"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_AvecCdPStandard)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && Precarite == "Précaire énergétique" && CoupDePouce == "OUI-v2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_AvecCdPPrecaire_v2)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && Precarite == "Modeste" && CoupDePouce == "OUI-v2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_AvecCdPModeste_v2)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && Precarite == "Standard" && CoupDePouce == "OUI-v2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_AvecCdPStandard_v2)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 102 && ETAS <110 && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H1_102SupEqalETASinf110)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 102 && ETAS <110 && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H2_102SupEqalETASinf110)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 102 && ETAS <110 && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H3_102SupEqalETASinf110)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 110 && ETAS <120 && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H1_110SupEqalETASinf120)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 110 && ETAS <120 && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H2_110SupEqalETASinf120)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 110 && ETAS <120 && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H3_110SupEqalETASinf120)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 120 && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H1_120SupEqalETAS)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 120 && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H2_120SupEqalETAS)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Appartement" && CoupDePouce == "NON" && ETAS >= 120 && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H3_120SupEqalETAS)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 102 && ETAS <110 && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H1_Maison_102SupEqalETASinf110)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 102 && ETAS <110 && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H2_Maison_102SupEqalETASinf110)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 102 && ETAS <110 && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H3_Maison_102SupEqalETASinf110)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 110 && ETAS <120 && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H1_Maison_110SupEqalETASinf120)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 110 && ETAS <120 && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H2_Maison_110SupEqalETASinf120)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 110 && ETAS <120 && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H3_Maison_110SupEqalETASinf120)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 120 && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H1_Maison_120SupEqalETAS)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 120 && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H2_Maison_120SupEqalETAS)
            }else if (OS == "BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau" && TypeLogement == "Maison" && CoupDePouce == "NON" && ETAS >= 120 && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_104_H3_Maison_120SupEqalETAS)
            }

            //BAR-EN-105 - Isolation des toitures terrasses
            if (OS == "BAR-EN-105 - Isolation des toitures terrasses" && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_105_H1)
            }else if (OS == "BAR-EN-105 - Isolation des toitures terrasses" && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_105_H2)
            }else if (OS == "BAR-EN-105 - Isolation des toitures terrasses" && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_EN_105_H3)
            }

            //BAR-TH-106 - Chaudière individuelle à haute performance énergétique
            if (OS == "BAR-TH-106 - Chaudière individuelle à haute performance énergétique" && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_106_H1_Maison)
            }else if (OS == "BAR-TH-106 - Chaudière individuelle à haute performance énergétique" && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_106_H2_Maison)
            }else if (OS == "BAR-TH-106 - Chaudière individuelle à haute performance énergétique" && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_106_H3_Maison)
            }else if (OS == "BAR-TH-106 - Chaudière individuelle à haute performance énergétique" && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_106_H1_Appart)
            }else if (OS == "BAR-TH-106 - Chaudière individuelle à haute performance énergétique" && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_106_H2_Appart)
            }else if (OS == "BAR-TH-106 - Chaudière individuelle à haute performance énergétique" && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_106_H3_Appart)
            }

            //BAR-TH-112 - Appareil indépendant de chauffage au bois
            if (OS == "BAR-TH-112 - Appareil indépendant de chauffage au bois" && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_112_H1)
            }else if (OS == "BAR-TH-112 - Appareil indépendant de chauffage au bois" && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_112_H2)
            }else if (OS == "BAR-TH-112 - Appareil indépendant de chauffage au bois" && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_112_H3)
            }

            //BAR-TH-113 - Chaudière biomasse individuelle
            if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Precarite == "Précaire énergétique" && CoupDePouce == "OUI"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_AvecCdPPrecaire)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Precarite == "Modeste" && CoupDePouce == "OUI"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_AvecCdPModeste)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Precarite == "Standard" && CoupDePouce == "OUI"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_AvecCdPStandard)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Precarite == "Précaire énergétique" && CoupDePouce == "OUI-v2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_AvecCdPPrecaire_v2)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Precarite == "Modeste" && CoupDePouce == "OUI-v2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_AvecCdPModeste_v2)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Precarite == "Standard" && CoupDePouce == "OUI-v2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_AvecCdPStandard_v2)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Zone == "H1" && CoupDePouce == "NON"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_H1_SansCDP)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Zone == "H2" && CoupDePouce == "NON"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_H2_SansCDP)
            }else if (OS == "BAR-TH-113 - Chaudière biomasse individuelle" && Zone == "H3" && CoupDePouce == "NON"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_113_H3_SansCDP)
            }

            //BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable
            if (OS == "BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable" && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_127_H1_ChauffCollectif)
            }else if (OS == "BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable" && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_127_H2_ChauffCollectif)
            }else if (OS == "BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable" && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_127_H3_ChauffCollectif)
            }else if (OS == "BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable" && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_127_H1_MaisonIndividuelle)
            }else if (OS == "BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable" && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_127_H2_MaisonIndividuelle)
            }else if (OS == "BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable" && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_127_H3_MaisonIndividuelle)
            }

            //BAR-TH-129 - Pompe à chaleur de type air/air
            if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" && Zone == "H1" && TypeLogement == "Appartement" && SCOP >= 3.9){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H1_Appart_SCOPsup3virg9)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" && Zone == "H2" && TypeLogement == "Appartement" && SCOP >= 3.9){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H2_Appart_SCOPsup3virg9)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" && Zone == "H3" && TypeLogement == "Appartement" && SCOP >= 3.9){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H3_Appart_SCOPsup3virg9)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" &&  Zone == "H1" && TypeLogement == "Maison" && SCOP >= 3.9 && SCOP < 4.3){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H1_Maison_SCOPsupEqal3virg9etinf4virg3)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" &&  Zone == "H2" && TypeLogement == "Maison" && SCOP >= 3.9 && SCOP < 4.3){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H2_Maison_SCOPsupEqal3virg9etinf4virg3)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" &&  Zone == "H3" && TypeLogement == "Maison" && SCOP >= 3.9 && SCOP < 4.3){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H3_Maison_SCOPsupEqal3virg9etinf4virg3)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" &&  Zone == "H1" && TypeLogement == "Maison" && SCOP >= 4.3){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H1_Maison_SCOPsupEqal4virg3)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" &&  Zone == "H2" && TypeLogement == "Maison" && SCOP >= 4.3){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H2_Maison_SCOPsupEqal4virg3)
            }else if (OS == "BAR-TH-129 - Pompe à chaleur de type air/air" &&  Zone == "H3" && TypeLogement == "Maison" && SCOP >= 4.3){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_129_H3_Maison_SCOPsupEqal4virg3)
            }

            //BAR-TH-143 - Système solaire combiné (France métropolitaine)
            if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)"  && CoupDePouce == "OUI" && Precarite == "Précaire énergétique"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_Precaire_CDP)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "OUI" && Precarite == "Modeste"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_Modeste_CDP)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "OUI" && Precarite == "Standard"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_Standard_CDP)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)"  && CoupDePouce == "OUI-v2" && Precarite == "Précaire énergétique"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_Precaire_CDP_v2)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "OUI-v2" && Precarite == "Modeste"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_Modeste_CDP_v2)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "OUI-v2" && Precarite == "Standard"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_Standard_CDP_v2)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "NON" && Zone == "H1"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_H1_sansCDP)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "NON" && Zone == "H2"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_H2_sansCDP)
            }else if (OS == "BAR-TH-143 - Système solaire combiné (France métropolitaine)" && CoupDePouce == "NON" && Zone == "H3"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_143_H3_sansCDP)
            }

            //BAR-TH-148 - Chauffe eau thermodynamique à accumulation
            if (OS == "BAR-TH-148 - Chauffe eau thermodynamique à accumulation" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_148_Appart)
            }else if (OS == "BAR-TH-148 - Chauffe eau thermodynamique à accumulation" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_148_Maison)
            }

            //BAR-TH-159 - Pompe à chaleur hybride individuelle
            if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && CoupDePouce == "OUI" && Precarite == "Précaire énergétique"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_Precaire_CDP)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && CoupDePouce == "OUI" && Precarite == "Modeste"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_Modeste_CDP)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && CoupDePouce == "OUI" && Precarite == "Standard"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_Standard_CDP)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && CoupDePouce == "OUI-v2" && Precarite == "Précaire énergétique"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_Precaire_CDP_v2)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && CoupDePouce == "OUI-v2" && Precarite == "Modeste"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_Modeste_CDP_v2)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && CoupDePouce == "OUI-v2" && Precarite == "Standard"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_Standard_CDP_v2)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 111 && ETAS < 120 && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal111inf120Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 111 && ETAS < 120 && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal111inf120Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 111 && ETAS < 120 && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal111inf120Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 120 && ETAS < 130 && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal120inf130Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 120 && ETAS < 130 && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal120inf130Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 120 && ETAS < 130 && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal120inf130Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 130 && ETAS < 140 && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal130inf140Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 130 && ETAS < 140 && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal130inf140Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 130 && ETAS < 140 && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal130inf140Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 140 && ETAS < 150 && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal140inf150Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 140 && ETAS < 150 && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal140inf150Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 140 && ETAS < 150 && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal140inf150Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 150 && ETAS < 160 && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal150inf160Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 150 && ETAS < 160 && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal150inf160Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 150 && ETAS < 160 && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal150inf160Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 160 && Zone == "H1" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal160Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 160 && Zone == "H2" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal160Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 160 && Zone == "H3" && TypeLogement == "Appartement"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal160Appart)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 111 && ETAS < 120 && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal111inf120Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 111 && ETAS < 120 && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal111inf120Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 111 && ETAS < 120 && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal111inf120Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 120 && ETAS < 130 && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal120inf130Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 120 && ETAS < 130 && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal120inf130Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 120 && ETAS < 130 && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal120inf130Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 130 && ETAS < 140 && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal130inf140Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 130 && ETAS < 140 && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal130inf140Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 130 && ETAS < 140 && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal130inf140Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 140 && ETAS < 150 && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal140inf150Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 140 && ETAS < 150 && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal140inf150Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 140 && ETAS < 150 && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal140inf150Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 150 && ETAS < 160 && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal150inf160Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 150 && ETAS < 160 && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal150inf160Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 150 && ETAS < 160 && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal150inf160Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 160 && Zone == "H1" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H1_ETASsupEqal160Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 160 && Zone == "H2" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H2_ETASsupEqal160Maison)
            }else if (OS == "BAR-TH-159 - Pompe à chaleur hybride individuelle" && ETAS >= 160 && Zone == "H3" && TypeLogement == "Maison"){
                expect(reponseSimulateur).to.include(SimulData.BAR_TH_159_H3_ETASsupEqal160Maison)
            }
        })
    })
    Then ('Checker le montant du Cumac estimé pour l OS {string}{string}',(TypeOS,surface) => {
        cy.fixture("SimulateurData.json").then((SimulateurData) => {
            if (TypeOS == "BAR_EN_102_H1_Electricite"){
                var cumacFile = SimulateurData.BAR_EN_102_H1_Electricite
            }else if (TypeOS == "BAR_EN_102_H1_Combustible"){
                var cumacFile = SimulateurData.BAR_EN_102_H1_Combustible
            }else if (TypeOS == "BAR_EN_102_H2_Electricite"){
                 var cumacFile = SimulateurData.BAR_EN_102_H2_Electricite
            }else if (TypeOS == "BAR_EN_102_H2_Combustible"){
                var cumacFile = SimulateurData.BAR_EN_102_H2_Combustible
            }else if (TypeOS == "BAR_EN_102_H3_Electricite"){
                 var cumacFile = SimulateurData.BAR_EN_102_H3_Electricite
            }else if (TypeOS == "BAR_EN_102_H3_Combustible"){
                var cumacFile = SimulateurData.BAR_EN_102_H3_Combustible
            }else if (TypeOS == "BAR_TH_106_H1_Appart"){
                var cumacFile = SimulateurData.BAR_TH_106_H1_Appart
            }else if (TypeOS == "BAR_TH_106_H2_Appart"){
                 var cumacFile = SimulateurData.BAR_TH_106_H2_Appart
            }else if (TypeOS == "BAR_TH_106_H3_Appart"){
                var cumacFile = SimulateurData.BAR_TH_106_H3_Appart
            }else if (TypeOS == "BAR_TH_106_H1_Maison"){
                var cumacFile = SimulateurData.BAR_TH_106_H1_Maison
            }else if (TypeOS == "BAR_TH_106_H2_Maison"){
                 var cumacFile = SimulateurData.BAR_TH_106_H2_Maison
            }else if (TypeOS == "BAR_TH_106_H3_Maison"){
                var cumacFile = SimulateurData.BAR_TH_106_H3_Maison
            }else if (TypeOS == "BAR_TH_112_H1"){
                var cumacFile = SimulateurData.BAR_TH_112_H1
            }else if (TypeOS == "BAR_TH_112_H2"){
                var cumacFile = SimulateurData.BAR_TH_112_H2
            }else if (TypeOS == "BAR_TH_112_H3"){
                var cumacFile = SimulateurData.BAR_TH_112_H3
            }else if (TypeOS == "BAR_EN_101_H1"){
                var cumacFile = SimulateurData.BAR_EN_101_H1
            }else if (TypeOS == "BAR_EN_101_H2"){
                var cumacFile = SimulateurData.BAR_EN_101_H2
            }else if (TypeOS == "BAR_EN_101_H3"){
                var cumacFile = SimulateurData.BAR_EN_101_H3
            }else if (TypeOS == "BAR_TH_104_H1_102SupEqalETASinf110"){
                var cumacFile = SimulateurData.BAR_TH_104_H1_102SupEqalETASinf110
            }else if (TypeOS == "BAR_TH_104_H2_102SupEqalETASinf110"){
                var cumacFile = SimulateurData.BAR_TH_104_H2_102SupEqalETASinf110
            }else if (TypeOS == "BAR_TH_104_H3_102SupEqalETASinf110"){
                var cumacFile = SimulateurData.BAR_TH_104_H3_102SupEqalETASinf110
            }else if (TypeOS == "BAR_TH_104_H1_Maison_102SupEqalETASinf110"){
                var cumacFile = SimulateurData.BAR_TH_104_H1_Maison_102SupEqalETASinf110
            }else if (TypeOS == "BAR_TH_104_H2_Maison_102SupEqalETASinf110"){
                var cumacFile = SimulateurData.BAR_TH_104_H2_Maison_102SupEqalETASinf110
            }else if (TypeOS == "BAR_TH_104_H3_Maison_102SupEqalETASinf110"){
                var cumacFile = SimulateurData.BAR_TH_104_H3_Maison_102SupEqalETASinf110
            }else if (TypeOS == "BAR_TH_104_AvecCdPPrecaire"){
                var cumacFile = SimulateurData.BAR_TH_104_AvecCdPPrecaire_v2
            }else if (TypeOS == "BAR_TH_104_AvecCdPModeste"){
                var cumacFile = SimulateurData.BAR_TH_104_AvecCdPModeste_v2
            }else if (TypeOS == "BAR_TH_104_AvecCdPStandard"){
                var cumacFile = SimulateurData.BAR_TH_104_AvecCdPStandard_v2
            }
            cy.log(cumacFile)
            var position = cumacFile.length
            for (let i = 0; i < position; i++) {
                if (cumacFile.substring(i,i+3)=='kWh'){
                    position = i+3
                }
            }
            cumacFile = cumacFile.substring(0,position)
            let cumac = parseInt(cumacFile)*surface
            cy.get(ObjetBOdata.inputCumacEstime).should('have.value',cumac)
        })
    })