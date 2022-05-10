import { Given, When, Then, Before, After, And } from "cypress-cucumber-preprocessor/steps";
const moment = require('moment')
let ObjetBOdata
let OScreesdata
let monExpertData
let donneesTest
let ProCeedata
let urlMS = Cypress.config().baseUrlMS
let api_key = Cypress.config().api_key
let vers = Cypress.config().vers
let idOSms
let idPrec
let donneesMS
let idOffre
    beforeEach(() => {
        cy.fixture("ObjetBO.json").then((ObjetBO) => {
            ObjetBOdata = ObjetBO
        })
        cy.fixture("ObjetsProCee.json").then((ObjetsProCee) => {
            ProCeedata = ObjetsProCee
        })
        cy.fixture("ObjetsMonExpert.json").then((ObjetsMonExpert) => {
            monExpertData = ObjetsMonExpert
        })
        cy.fixture("dataTest.json").then((dataTest) => {
          donneesTest = dataTest
        })
        cy.fixture("MsData.json").then((MsData) => {
            donneesMS = MsData
        })
        cy.fixture("OScrees.json").then((OScrees) => {
          OScreesdata = OScrees
        })    
        Cypress.Server.defaults({
            ignore: (xhr) => {
                return true;
            }
        })
    })
  Given ('Creation d Offre {string},{string},{string},{string},{string},{string},{string},{string},{string}',
  (org1,org2,valStandard,valPrecaire,valGrandPrecaire,starts_at,priority,code,OS) =>{
        cy.request({
          method: 'POST', 
          url: urlMS+"/offers/"+vers+"/temp",
          body: {
                  "code": code,
                  "exclusive": true,
                  "name": "Offre TestAuto",
                  "starts_at": starts_at,
                  "priority": priority,
                  "filters": {
                      "cdp": {
                          "val": true
                      },        
                      "organizations": {
                          "val": [org1, org2]
                      },
                      "cee": {
                          "val": [OS]
                      }
                  },
                  "actions": {
                      "standard": {
                          "field2": "prime",
                          "type": "percentage",
                          "val": valStandard
                      },
                      "precaire": {
                          "field": "prime",
                          "type": "percentage",
                          "val": valPrecaire
                      },
                      "grand_precaire": {
                          "field": "prime",
                          "type": "percentage",
                          "val": valGrandPrecaire
                      },
                      "business_bringer": {
                          "field": "prime",
                          "type": "percentage",
                          "val": "0"
                      }
                  }
              },
            headers: {
              'content-type' : 'application/json',
              'x-api-key': api_key
            }
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        idOffre = response.body.$oid
        expect(response.status).equal(201)
      })
  })
  Given ('Ajout de l Offre dans la table Def {string},{string},{string},{string},{string},{string},{string},{string}',
  (parent_id,adresse,CP,ville,precarity,SampleSocial,HighSocial,default_os) =>{
        let hight = parseInt(HighSocial)
        let sample = parseInt(SampleSocial)
        cy.request({
          method: 'POST', 
          url: urlMS+"/organizations/"+vers+"/upsert", 
          body: {
              "_id": idOrg,
              "title": "Mon titre",
                "sigle": "MPZ",
                "partner_status": "FROID",
                "name": "TestAuto MS",
                "type": "AGENCE",
                "organization_type": "T3",
                "parent_id": parent_id,
              "siret": donneesTest.siret,
              "address": {
                "street": adresse,
                "zipcode": CP,
                "city": ville
              },
              "phone": "0611223344",
              "legal_representative": {
                "lastname": "TestAuto",
                "firstname": "TestAuto",
                "function": "DIRECTEUR REGIONAL"
              },
              "precarity": {
                "standard": precarity,
                "sample_social_precarity": SampleSocial,
                "high_social_precarity": HighSocial
              },
              "email": "tahar.ait-aouit@teksial.com",
              "default_os": default_os,
                "prime_type": "CHQ"
            },
            headers: {
              'content-type' : 'application/json',
              'x-api-key': api_key
            }
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).equal(200)
      })
  })
  And ('Update Offre {string},{string},{string},{string},{string},{string},{string},{string}',
  (parent_id,adresse,CP,ville,precarity,SampleSocial,HighSocial,default_os) =>{
        cy.request({
          method: 'PATCH', 
          url: urlMS+"/organizations/"+vers+"/"+idOrg,
          body: {
              "_id": idOrg,
              "title": "Mon titre",
                "sigle": "MPZ",
                "partner_status": "FROID",
                "name": "TestAuto MS",
                "type": "AGENCE",
                "organization_type": "T3",
                "parent_id": parent_id,
              "siret": donneesTest.siret,
              "address": {
                "street": adresse,
                "zipcode": CP,
                "city": ville
              },
              "phone": "0611223344",
              "legal_representative": {
                "lastname": "TestAuto",
                "firstname": "TestAuto",
                "function": "DIRECTEUR REGIONAL"
              },
              "precarity": {
                "standard": precarity,
                "sample_social_precarity": SampleSocial,
                "high_social_precarity": HighSocial
              },
              "email": "tahar.ait-aouit@teksial.com",
              "default_os": default_os,
                "prime_type": "CHQ"
            },
            headers: {
              'content-type' : 'application/json',
              'x-api-key': api_key
            }
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).equal(200)
      })
  })
  And ('Recherche Offre {string},{string},{string},{string},{string},{string},{string},{string}',
  (parent_id,adresse,CP,ville,precarity,SampleSocial,HighSocial,default_os) =>{
        let hight = parseInt(HighSocial)
        let sample = parseInt(SampleSocial)
        cy.request({
          method: 'GET', 
          url: urlMS+"/organizations/"+vers+"/"+idOrg,
          body: {},
            headers: {
              'content-type' : 'application/json',
              'x-api-key': api_key
            }
      }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).equal(200)
        expect(response.body._id).equal(idOrg)
        expect(response.body.address.street).equal(adresse)
        expect(response.body.address.zipcode).equal(CP)
        expect(response.body.address.city).equal(ville)
        expect(response.body.default_os).equal(default_os)
        expect(response.body.name).equal("TestAuto MS")
        expect(response.body.parent_id).equal(parent_id)
        expect(response.body.precarity.standard).equal(precarity)
        expect(response.body.precarity.sample_social_precarity).equal(SampleSocial)
        expect(response.body.precarity.high_social_precarity).equal(HighSocial)
        expect(response.body.siret).equal(donneesTest.siret)
      })
  })
  Given('Suppression Offre',() => {
    cy.request({
      method: 'DELETE', 
      url: urlMS+"/organizations/"+vers+"/"+idOrg,
      body: {},
      headers: {
        'content-type' : 'application/json',
        'x-api-key': api_key
      }
    }).should((response) => {
      expect(response.status).equal(204)
    })
  })