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
    Given('Je cree mon OS sur ProCee {string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',(
                renovation,logement,chauffageActuel,chauffageLogement,typeTravaux,
                surface,revenus,adresseTravaux,CP,ville,methode,coupDePouce) => {

        cy.get(ProCeedata.LinkNvProjet).click()
        cy.get(ProCeedata.selectPrjOrganiz).select('2JVS')
        cy.wait(2000)
        cy.get(ProCeedata.select1).select(renovation)
        cy.wait(3000)
        cy.get(ProCeedata.select2).select(typeTravaux)
        cy.wait(2000)
        cy.get(ProCeedata.select3).select(methode)
        cy.wait(2000)
        if (methode ==  "Pompe à chaleur air/eau"){
            cy.get(ProCeedata.inputSurfaceChauffee).type(surface)
            cy.get(ProCeedata.inputSurfaceHabitable).type(surface)
            cy.get(ProCeedata.inputEfficcaciteEnergitique).type(surface)
            cy.get(ProCeedata.BasseTemperature).each(($el,index) => { // Basse Temperature
               if(index == 0){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })
            cy.get(ProCeedata.coupDePouce).each(($el,index) => {
               if(index == 0 && coupDePouce == "Oui"){ // Coup de pouce Oui
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if(index == 1 && coupDePouce == "Non"){ // coup de pouce Non
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })
            cy.get(ProCeedata.EmplacementChaudiere).each(($el,index) => { // Emplacement chaudiere Oui
               if(index == 0){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })
        }else{
            cy.get(ProCeedata.inputSurface).type(surface)
            cy.get(ProCeedata.inputResistThermique).type(50)
        }
        cy.get(ProCeedata.dosANAH).each(($el,index) => { // dossier ANAH Non
           if(index == 1){
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        var dateString = moment().format('YYYY-MM-DD');
        cy.get(ProCeedata.inputDateSigneDevis).click().type(dateString)

        cy.get(ProCeedata.logement).each(($el,index) => { // Logement
           if(index == 0 && logement == 'maison'){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 1 && logement == 'appartement'){
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        if (logement == 'appartement'){
            cy.get(ProCeedata.chauffageLogement).each(($el,index) => { // type de chauffage du logement
               if(index == 0 && chauffageLogement == 'individuel'){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index == 1 && chauffageLogement == 'collectif'){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })
        }
        cy.get(ProCeedata.MethodeChauffage).each(($el,index) => { // la méthode de chauffage principale du logement
           if(index == 0 && chauffageActuel == 'electricite'){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 1 && chauffageActuel == 'gaz'){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 2 && chauffageActuel == 'fioul'){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 3 && chauffageActuel == 'bois'){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 4 && chauffageActuel == 'charbon'){
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.get(ProCeedata.constrictionPlus2ans).each(($el,index) => { // construction plus de 2 ans
           if(index == 0){ // Oui
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.get(ProCeedata.inputAdresseTravaux).type(adresseTravaux+", "+ville+", "+CP)
        cy.get(ProCeedata.propriotaireLoc).each(($el,index) => { // proprietaire ou locataire
           if(index == 1){ // proprietaire
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.get(ProCeedata.civilite).each(($el,index) => {
           if(index == 0){ // Monsieur
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.get(ProCeedata.inputNom).clear().type('TestAuto')
        cy.get(ProCeedata.inputPrenom).clear().type('TestAuto')
        cy.get(ProCeedata.inputTel).clear().type('0666666666')
        cy.get(ProCeedata.inputmail).clear().type(donneesTest.user)
        cy.get(ProCeedata.adresseIdentiqueChantier).each(($el,index) => {
           if(index == 0){ // oui
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.get(ProCeedata.inputNbrPersonne).click().clear().type(1)
        cy.get(ProCeedata.revenus).each(($el,index) => {//revenus
           if(index == 0 && revenus == 'PRECAIRE_ENERGETIQUE'){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 1 && revenus == 'MODESTE'){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 2 && revenus == 'STANDARD'){
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.wait(1000)
        if (revenus != "STANDARD"){
            cy.get(ProCeedata.inputRefImpots).type(donneesTest.refAvisimpots)
            cy.get(ProCeedata.inputNumFiscImpots).type(donneesTest.numFiscal)
        }
        cy.get(ProCeedata.btContinuer).click()
        cy.wait(1000)
        cy.get(ProCeedata.inputAdresseChantier).type(adresseTravaux)
        cy.get(ProCeedata.inputCodePChantier).type(CP)
        cy.get(ProCeedata.inputVilleChantier).type(ville)
        cy.get(ProCeedata.btContinuer).click()
        cy.get(ProCeedata.montantPrime).invoke('text').then(prime => {
            cy.log(prime)
            cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
                data.MontantPrime = prime
                cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
            })
        })
        cy.get(ProCeedata.btConfirmeEstimation).click()
    })
    And ('Je recupere la reference du dernier OS cree dans ProCee', () => {
        var NumOSproCee = ""
        var leng = ""
        cy.get(ProCeedata.NumOSproCee).invoke('text').then(text => {
            NumOSproCee = text
            cy.log(NumOSproCee.substring(leng+1, leng+6))
            for (let i = 0; i < NumOSproCee.length; i++) {
              if (NumOSproCee.substring(i,i+1)=='°'){
                leng = i
              }
            }
        })
        var ref = ""
        var tiree = ""
        cy.get(ProCeedata.titreProjet).invoke('text').then(text => {
            ref = text
            cy.log(ref.substring(tiree+1, tiree+6))
            tiree = ref.length
            for (let i = 0; i < ref.length; i++) {
              if (ref.substring(i,i+3)=='OS:'){
                tiree = i
              }
            }
        })
        let now = new Date();
        var dateString = moment(now).format('YYYY-MM-DD HH-mm-ss');
        if (location.hostname.includes('qatest')){
            cy.log('qatest')
            cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
                data.dateCreation = dateString,
                data.RefOSQA = "I2M-"+ref.substring(tiree+4, tiree+10),
                data.idOSQA = ref.substring(tiree+4, tiree+10)
                data.idOSproCeeQA = NumOSproCee.substring(leng+1, leng+7)
                cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
            })
        }else if (location.hostname.includes('preprod')){
            cy.log('preprod')
            cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
                data.dateCreation = dateString,
                data.RefOSPP = "I2M-"+ref.substring(tiree+4, tiree+10),
                data.idOSPP = ref.substring(tiree+4, tiree+10)
                data.idOSproCeePP = NumOSproCee.substring(leng+1, leng+7)
                cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
            })
        }
    })
    function userID_Alpha_Numeric() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }