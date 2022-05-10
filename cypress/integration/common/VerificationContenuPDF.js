import { doesNotMatch } from "assert";
import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
const moment = require('moment')
const fs = require("fs")

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
        cy.readFile('cypress/fixtures/href.json').then((data) => {
            data.href2 = "",
            data.href3 = "",
            data.href4 = "",
            data.href5 = "",
            data.href6 = "",
            data.href7 = "",
            data.href8 = "",
            data.href9 = "",
            data.href10 = ""
            cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
        })
        Cypress.Server.defaults({
            ignore: (xhr) => {
                return true;
            }
        })
    })
    When ('Filtrer sur la date n-1',() =>{
        cy.xpath(ObjetBOdata.menuProduction).click()
        cy.xpath(ObjetBOdata.menuLstProjets).click()
        var dateString = moment().add(-1, 'days').format('DD-MM-YYYY')
        cy.get(ObjetBOdata.inputDtStartPA).clear().type(dateString)
        cy.get(ObjetBOdata.inputDtEndPA).clear().type(dateString)      
        cy.get(ObjetBOdata.search_os_filtrer).click()
    })

    Then ('Recuperation des IDs OS crées en date n-1 et Checker les PDF de CDC et PA',() =>{
        cy.get("body").then($body => {
            if ($body.find(ObjetBOdata.ElementListOS).is(':visible')){
                cy.task('deleteFolder', "cypress/fixtures/justificatifs/Prod")
                cy.wait(1000)
                cy.task('createFolder', "cypress/fixtures/justificatifs/Prod")
                cy.get(ObjetBOdata.buttonPage).each(($el1,index) => {
                    cy.wrap($el1).invoke('text').then((text) => {
                        if (text == "2"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href2 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "3"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href3 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "4"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href4 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "5"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href5 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "6"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href6 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "7"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href7 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "8"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href8 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "9"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href9 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }else if (text == "10"){
                            cy.wrap($el1).invoke('attr','href').then((href) => {
                                cy.readFile('cypress/fixtures/href.json').then((data) => {
                                    data.href10 = href
                                    cy.writeFile('cypress/fixtures/href.json', JSON.stringify(data))
                                })
                            })
                        }
                    })
                })
                cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                    cy.wrap($el).invoke('attr', 'id').then((ID) => {
                        let url = Cypress.config().baseUrlBO
                        var posSlach = url.length
                        for (let i = 0; i < url.length; i++) {
                            if (url.substring(i,i+3)=='fr/'){
                                posSlach = i+3
                            }
                        }
                        let monUrl = url.substring(0,posSlach)
                        cy.visit(monUrl+'os/'+ID+'/documents')
                        VerificationDoc(ID)
                    })
                })
                cy.fixture("href.json").then((data) => {
                    let url = Cypress.config().baseUrlBO
                    var posSlach = url.length
                    for (let i = 0; i < url.length; i++) {
                        if (url.substring(i,i+3)=='fr/'){
                            posSlach = i+2
                        }
                    }
                    let monUrl = url.substring(0,posSlach)
                    if (data.href2 != ""){
                        cy.visit(monUrl+data.href2)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href3 != ""){
                        cy.visit(monUrl+data.href3)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href4 != ""){
                        cy.visit(monUrl+data.href4)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href5 != ""){
                        cy.visit(monUrl+data.href5)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href6 != ""){
                        cy.visit(monUrl+data.href6)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href7 != ""){
                        cy.visit(monUrl+data.href7)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href8 != ""){
                        cy.visit(monUrl+data.href8)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href9 != ""){
                        cy.visit(monUrl+data.href9)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })        
                    }
                    if (data.href10 != ""){
                        cy.visit(monUrl+data.href10)
                        cy.get(ObjetBOdata.lstOS).each(($el,index) => {
                            cy.wrap($el).invoke('attr', 'id').then((ID) => {
                                let url = Cypress.config().baseUrlBO
                                var posSlach = url.length
                                for (let i = 0; i < url.length; i++) {
                                    if (url.substring(i,i+3)=='fr/'){
                                        posSlach = i+3
                                    }
                                }
                                let monUrl = url.substring(0,posSlach)
                                cy.visit(monUrl+'os/'+ID+'/documents')
                                VerificationDoc(ID)
                            })
                        })  
                    }      
                })
            }else{
                cy.log("Liste OS Vide")
            }
        })
    })
    function VerificationDoc(ID) {
        cy.get(ObjetBOdata.os_statut_dossier_title).then((title)=>{
            if (title.text().includes("CLOSED")){
                cy.log("l OS est CLOSED")
            }else{
                let url = Cypress.config().baseUrlBO
                var posSlach = url.length
                for (let i = 0; i < url.length; i++) {
                    if (url.substring(i,i+3)=='fr/'){
                        posSlach = i+3
                    }
                }
                let monUrl = url.substring(0,posSlach)
                cy.get(ObjetBOdata.ongletCadreContribution).click()
                cy.get(ObjetBOdata.NomPDFCadreContribution).should('have.attr', 'href').then((href) => {
                    cy.downloadFile(monUrl+href.substring(1,href.length),'cypress/fixtures/justificatifs/Prod','CadreContribution-'+ID+'.pdf')
                    cy.task('getPdfContent', "cypress/fixtures/justificatifs/Prod/CadreContribution-"+ID+".pdf").then(content => {
                        if (content.text.includes("(www.tcpdf.org)")){
                            cy.log("le CDC est un scan")
                        }else{
                            expect(content.text).to.include("Signature")
                            expect(content.text).to.include("Date de cette proposition")                     
                        }
                    })
                })

                cy.get("body").then($body => {
                    if ($body.find(ObjetBOdata.ongletPreuveAnteriorite).is(':visible')){
                        cy.get(ObjetBOdata.ongletPreuveAnteriorite).click()
                        cy.get(ObjetBOdata.NomPDFPreuveAnteriorite).should('have.attr', 'href').then((href) => {
                            cy.downloadFile(monUrl+href.substring(1,href.length),'cypress/fixtures/justificatifs/Prod','PreuveAnteriorite-'+ID+'.pdf')
                            cy.task('getPdfContent', "cypress/fixtures/justificatifs/Prod/PreuveAnteriorite-"+ID+".pdf").then(content => {
                                expect(content.text).to.include("Jean-Baptiste Devalland")
                                expect(content.text).to.include("LETTRE D’ENGAGEMENT")
                            })
                        })
                    }
                })
            }
        })
    }