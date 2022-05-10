import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
import faker from 'faker';
const moment = require('moment');
let ObjetBOdata;
let OScreesdata;
let monExpertData;
let donneesTest;

    beforeEach(() => {
        cy.fixture("ObjetBO.json").then((ObjetBO) => {
            ObjetBOdata = ObjetBO;
        });
        cy.fixture("OScrees.json").then((OScrees) => {
            OScreesdata = OScrees;
        });
        cy.fixture("ObjetsMonExpert.json").then((ObjetsMonExpert) => {
            monExpertData = ObjetsMonExpert;
        });
        cy.fixture("dataTest.json").then((dataTest) => {
            donneesTest = dataTest;
        });
    });
    Before( ()=> {
        describe('Mon Before Tests', () => {
                Cypress.on('uncaught:exception', (err, runnable) => {
                    debugger
                    return false
                })
        })
    })
    Given('Je cree mon OS sur Monexpert {string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',(souhait,
                logement,chauffageActuel,chauffageLogement,typeTravaux,surface,revenus,adresseTravaux,CP,ville) => {

        let url = Cypress.config().baseUrlMonExpertHome
        cy.visit(url)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Je calcule ma prime')) {
                cy.contains(monExpertData.btJeCalculemaPrime).click()
            }else if ($body.text().includes('Obtenir une simulation')){
                cy.contains(monExpertData.btObtenirSimulation).click()
            }
        })
        cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection du souhait
           if(index == 0 && souhait=="Isoler"){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 1 && souhait=="chauffer"){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 2 && souhait=="Obtenir preconisations"){
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.wait(1000)
        cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection du type de logement
           if(index == 0 && logement=="maison"){
                cy.wrap($el).click()
                cy.log($el.text())
            }else if (index == 1 && logement=="appartement"){
                cy.wrap($el).click()
                cy.log($el.text())
            }
        })
        cy.wait(1000)
         cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection du type de chauffage
               if(index == 0 && chauffageActuel=="electricite"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index == 1 && chauffageActuel=="gaz"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index == 2 && chauffageActuel=="fioul"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index == 3 && chauffageActuel=="bois"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index == 4 && chauffageActuel=="charbon"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index == 5 && chauffageActuel=="pompeAChaleur"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
        })
        cy.wait(1000)
        if (chauffageLogement == "individuel"){
            cy.get('select').select("Individuel",{force: true})
        }else{
            cy.get('select').select("Collectif",{force: true})
        }
        cy.wait(1000)
        if (souhait == "chauffer" && typeTravaux != "pompeAchaleurAirEau" && typeTravaux != "Chaudiere_A_Bois"){
            cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // Type d’équipement actuel pour chauffer
               if (index === 0){ // Radiateurs electriques
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })
        }else if (souhait == "chauffer" && typeTravaux == "pompeAchaleurAirEau"){
            if (chauffageActuel == "gaz"){
                cy.get('.fieldset-wrapper > div > div').each(($el,index) => {
                    if (index == 7){
                        cy.wrap($el).click()
                    }
                })
            }else{
                cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // Type d’équipement actuel pour chauffer
                    if (index == 9){ // pompeAchaleurAirEau
                         cy.wrap($el).click()
                         cy.log($el.text())
                    }
                })
            }
        }else if (souhait == "Isoler"){
            cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection du type des travaux
               if(index === 0 && typeTravaux === "comblesPerdusOuAmenageables"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index === 1 && typeTravaux === "murs"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index === 2 && typeTravaux === "sols"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }else if (index === 3 && typeTravaux === "toitureTerrasse"){
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })
        }else if (souhait == "chauffer" && typeTravaux == "Chaudiere_A_Bois"){
            cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection du type des travaux
                if(index == 16 && typeTravaux == "Chaudiere_A_Bois"){
                     cy.wrap($el).click()
                     cy.log($el.text())
                 }
             })
        }
        cy.wait(1000)
        if (souhait == "chauffer" && typeTravaux != "Chaudiere_A_Bois"){
            cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection Travaux de chauffage
                if (index == 0 && typeTravaux == 'Radiateurs_electriques'){ // Chauffage
                     cy.wrap($el).click()
                     cy.log($el.text())
                }else if (index == 3 && typeTravaux == 'Radiateurs_electriques112'){ // Chauffage au bois
                     cy.wrap($el).click()
                     cy.log($el.text())
                }else if (index == 1 && typeTravaux == 'pompeAchaleurAirEau'){ // Pompe à chaleur
                     cy.wrap($el).click()
                     cy.log($el.text())
                }
            })
            cy.wait(1000)
            cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection Type de matériel souhaité
                if (index == 0 && typeTravaux == 'Radiateurs_electriques'){ // Chaudiere à haute performance energitique
                     cy.wrap($el).click()
                     cy.log($el.text())
                }else if (index == 9 && typeTravaux == 'Radiateurs_electriques112'){ // Appareil indépendant au bois
                     cy.log($el.text())
                     cy.wrap($el).click()
                }else if (index == 2 && typeTravaux == 'pompeAchaleurAirEau'){ // pompeAchaleurAirEau
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })
        }else if (souhait == "chauffer" && typeTravaux == "Chaudiere_A_Bois"){
            cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection Travaux de chauffage
                if (index == 3 && typeTravaux == 'Chaudiere_A_Bois'){ // 
                     cy.wrap($el).click()
                     cy.log($el.text())
                }
            })
            cy.wait(1000)
            cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection Type de matériel souhaité
                if (index == 9 && typeTravaux == 'Chaudiere_A_Bois'){ //
                    cy.wrap($el).click()
                    cy.log($el.text())
                }
            })

        }
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('Code postal des travaux')) {
                cy.log('Pas de surface')
            }else{
                if (souhait == "chauffer" && typeTravaux != 'pompeAchaleurAirEau' && typeTravaux != 'Chaudiere_A_Bois'){
                    cy.get('input[name=surface_habitable_m2]').click()
                    cy.get('input[name=surface_habitable_m2]').type(surface) // saisie de la surface
                }else if (souhait == "chauffer" && typeTravaux == 'pompeAchaleurAirEau' || typeTravaux == 'Chaudiere_A_Bois'){
                    cy.get('input[name=surface_chauffee_m2]').click()
                    cy.get('input[name=surface_chauffee_m2]').type(surface) // saisie de la surface chauffee
                }else{
                    cy.get('input[name=surface_a_isoler]').click()
                    cy.get('input[name=surface_a_isoler]').type(surface) // saisie de la surface
                }
                cy.get('button[value="Étape suivante"]').click() // click sur etape suivante
            }
        })
        cy.get('input[name=code_postal_des_travaux]').type(CP) // saisie du code postal
        cy.get('button[value="Étape suivante"]').click() // click sur etape suivante
        cy.get('input[name=nombre_de_personne_dans_le_foyer]').click() // click du nombre de piece
        cy.get('input[name=nombre_de_personne_dans_le_foyer]').type(3) // saisie du nombre de piece
        cy.get('button[value="Étape suivante"]').click() // click sur etape suivante
        cy.get('.fieldset-wrapper > div > div').each(($el,index) => { // selection des revenus
           if(index == 0 && revenus=='PRECAIRE_ENERGETIQUE'){
                cy.log($el.text())
                cy.wrap($el).click()
            }else if(index == 1 && revenus=='MODESTE'){
                cy.log($el.text())
                cy.wrap($el).click()
            }else if(index == 2 && revenus=='STANDARD'){
                cy.log($el.text())
                cy.wrap($el).click()
            }
        })
        cy.wait(2000)
        cy.visit(url+'simulation/prete')
        cy.get('#edit-email').type(donneesTest.user)
        cy.get('#edit-submit').click()
        cy.visit(url+'simulation/estimation')
        cy.log('Validation')
        cy.get(monExpertData.montantPrime).invoke('text').then(prime => {
            cy.log(prime)
            cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
                data.MontantPrime = prime
                cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
            })
        })

        cy.get('.estimation-validation').click()// click sur Valider votre simulation
        cy.get(monExpertData.inputEditNom).clear()
        cy.get(monExpertData.inputEditNom).type('TestAuto')
        cy.get(monExpertData.inputEditPrenom).clear()
        cy.get(monExpertData.inputEditPrenom).type('TestAuto')
        cy.xpath('/html/body/div[1]/div/div/div[3]/div/main/section/div/div/form/div[1]/div/div/fieldset[4]/div/div/div[2]/label').click() // click sur button radio proprietaire
        cy.xpath('/html/body/div[1]/div/div/div[3]/div/main/section/div/div/form/div[1]/div/div/fieldset[5]/div/div/div[1]/label').click() // click sur button radio OUI
        cy.get('#edit-geolocation-chantier').type(adresseTravaux)// saisie de l'adresse
        cy.get('#edit-geolocation-chantier-code-postal').type(CP) // saisie du code postal
        cy.get('#edit-geolocation-chantier-ville').type(ville) // saisie de la ville
        cy.xpath('/html/body/div[1]/div/div/div[3]/div/main/section/div/div/form/div[1]/div/div/fieldset[10]/div/div/div[2]/label').click()// click sur NON
        cy.get('#edit-submit').click()// click sur Valider mon projet
    })
    And ('Je recupere la reference du dernier OS cree dans monExpert', () => {
        cy.xpath(monExpertData.RefDernierOSCree).invoke('text').then(text => {
            var ref = text;
            var tiree = ref.length
            for (let i = 0; i < ref.length; i++) {
              if (ref.substring(i,i+1)=='-'){
                tiree = i
              }
            }
            let now = new Date();
            var dateString = moment(now).format('YYYY-MM-DD HH-mm-ss');
            if (location.hostname.includes('qatest')){
                cy.log('qatest')
                cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
                    data.dateCreation = dateString,
                    data.RefOSQA = ref,
                    data.idOSQA = ref.substring(tiree+1, ref.length)
                    cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
                })
            }else if (location.hostname.includes('preprod')){
                cy.log('preprod')
                cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
                    data.dateCreation = dateString,
                    data.RefOSPP = ref,
                    data.idOSPP = ref.substring(tiree+1, ref.length)
                    cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
                })
            }
        })
    })
    function userID_Alpha_Numeric() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }