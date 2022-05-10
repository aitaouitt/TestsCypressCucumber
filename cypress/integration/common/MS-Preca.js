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
let idOrg
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
  Given ('Creation de Precarite dans la table Temp {string},{string},{string},{string},{string},{string}',
  (family,HighSocial,SampleSocial,StartDate,EndDate,localization) =>{
    let fami = parseInt(family)
    let hight = parseInt(HighSocial)
    let sample = parseInt(SampleSocial)
    if (EndDate == "null"){
      EndDate = null
    }
    cy.request({
      method: 'POST', 
      url: urlMS+"/precarity/"+vers+"/temp",
      body: {
        "localization": localization,
        "family": fami,
        "high_social_precarity": hight,
        "sample_social_precarity": sample,
        "starts_at": StartDate,
        "ends_at": EndDate
      },
      headers: {
        'content-type' : 'application/json',
        'x-api-key': api_key
      }
    }).should((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).equal(201)
      idPrec = response.body.$oid
    })
  })
  Given ('Ajout de la precarite dans la table Def {string},{string},{string},{string},{string},{string}',
  (family,HighSocial,SampleSocial,StartDate,EndDate,localization) =>{
    let fami = parseInt(family)
    let hight = parseInt(HighSocial)
    let sample = parseInt(SampleSocial)
    if (EndDate == "null"){
      EndDate = null
    }
    cy.request({
      method: 'POST',
      url: urlMS+"/precarity/"+vers+"/upsert",
      body: {
        "_id": idPrec,
        "localization": localization,
        "family": fami,
        "high_social_precarity": hight,
        "sample_social_precarity": sample,
        "starts_at": StartDate,
        "ends_at": EndDate
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
  Given ('Update Precarite {string},{string},{string},{string},{string},{string}',
  (family,localization,NewHighSocial,NewSampleSocial,StartDate,EndDate) =>{
      let fami = parseInt(family)
      let hight = parseInt(NewHighSocial)
      let sample = parseInt(NewSampleSocial)
      if (EndDate == "null"){
        EndDate = null
      }  
      cy.request({
        method: 'PATCH',
        url: urlMS+"/precarity/"+vers+"/"+idPrec,
        body: {
          "_id": idPrec,
          "localization": localization,
          "family": fami,
          "high_social_precarity": hight,
          "sample_social_precarity": sample,
          "starts_at": StartDate,
          "ends_at": EndDate
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
  Given('Recherche Precarity {string},{string},{string},{string},{string},{string}',
    (family,CP, date,localization,HighSocial,SampleSocial) => {
    let fami = parseInt(family)
    cy.request({
      method: 'POST', 
      url: urlMS+"/precarity/"+vers+"/search",
      body: {
        "family": fami,
        "postal_code": CP,
        "date": date
      },
      headers: {
        'content-type' : 'application/json',
        'x-api-key': api_key
      }
    }).should((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).equal(200)
      expect(JSON.stringify(response.body)).include(idPrec)
      for (let j=0; j<response.body.length; j++){
        cy.log(response.body[j]._id)
        expect(JSON.stringify(response.body[j].family)).include(fami)
        expect(response.body[j].localization).include(localization)
        if (response.body[j].is_deleted == false){
          expect(response.body[j].high_social_precarity.toString()).include(HighSocial)
          expect(response.body[j].sample_social_precarity.toString()).include(SampleSocial)  
        }else{
        }
      }
    })
    })
    Given('Supprimer la precarite',() => {
      cy.request({
        method: 'DELETE', 
        url: urlMS+"/precarity/"+vers+"/"+idPrec,
        body: {},
        headers: {
          'content-type' : 'application/json',
          'x-api-key': api_key
        }
      }).should((response) => {
        expect(response.status).equal(204)
      })
    })

