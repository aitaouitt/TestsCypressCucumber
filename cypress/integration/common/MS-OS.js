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
  Given('Recherche de l OS {string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',
      (typeOS,groupID,org,zone,surface,insulationType,adresse,CP,ville,revenus,RefPrec) => {
        let now = new Date();
        var dateString = moment(now).format('YYYY-MM-DD');    
      cy.request({
          method: 'GET', 
          url: urlMS+"/os/"+vers+"/"+idOSms, 
          body: {},
          headers: {
            'content-type' : 'application/json',
            'x-api-key': api_key
          }
        }).should((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).equal(200)
        expect(response.body._id.$oid).include(idOSms)
        expect(response.body.cee.type).include(typeOS)
        expect(response.body.group_id).include(groupID)
        expect(response.body.organization).include(org)
        expect(response.body.created_at).include(dateString)
        expect(response.body.cee.attributes.zone).include(zone)
        expect(response.body.cee.attributes.insulatedSurface).include(surface)
        expect(response.body.cee.part_a.insulationType).include(insulationType)
        expect(response.body.beneficiary.city).include(ville)
        expect(response.body.beneficiary.zipcode).include(CP)
        expect(response.body.beneficiary.address).include(adresse+" "+CP+" "+ville)
        expect(response.body.beneficiary.street).include(adresse)
        expect(response.body.precarity.type).include(revenus)
        expect(response.body.precarity.number_reference).include(RefPrec)
      })
  })
  Given('Creation de l OS {string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',
        (typeOS,groupID,org,zone,surface,insulationType,adresse,CP,ville,revenus,RefPrec) => {
    let now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD');
    cy.request({
      method: 'POST', 
      url: urlMS+"/os/"+vers+"/temp",
      body: {
        "group_id": groupID,
        "user": "b4573b0d-b471-428f-a326-f9de9cbd2c5f",
        "organization": org,
        "created_at": dateString,
        "type_of_cee": "standard",
        "bank": {
            "amount_subsidized_loan": "",
            "effective_interest_rate": "",
            "amount_bonus": "",
            "bank": ""
        },
        "draft": true,
        "cee": {
            "id": "6200fe9845b2efeb0a341aef",
            "work_type": "insulation",
            "type": typeOS,
            "boost": false,
            "attributes": {
                "zone": zone,
                "insulatedSurface": surface
            },
            "part_a": {
                "insulationType": insulationType
            },
            "cumac": 226100,
            "prime": 1243.4463792744002,
            "price": 5.499541704
        },
        "construction_site": {
            "house_type": "house",
            "apartment_heating_type": "",
            "is_older_than_two_years": true,
            "heating_method": "electricity",
            "address": "",
            "address_details": "",
            "city": "",
            "zipcode": "",
            "occupant_is_tenant_or_owner": "tenant",
            "residential_address_same_as_construction_site_address": true
        },
        "beneficiary": {
            "gender": "m",
            "last_name": "TestAuto",
            "first_name": "TestAuto",
            "phone": "0666666666",
            "email": donneesTest.user,
            "address": adresse+" "+CP+" "+ville,
            "city": ville,
            "zipcode": CP,
            "street": adresse,
            "address_details": ""
        },
        "precarity": {
            "type": revenus,
            "tax_reference": "",
            "number_reference": RefPrec
        }
    },
    headers: {
      'content-type' : 'application/json',
      'x-api-key': api_key
    }
    }).should((response) => {
      cy.log(JSON.stringify(response.body))
      cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
          data.idOSms = response.body.$oid
          cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
      })
      idOSms = response.body.$oid
      expect(response.status).equal(201)
    })
  })
  Given('Ajout de l OS dans la table Def {string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string}',
        (typeOS,groupID,org,zone,surface,insulationType,adresse,CP,ville,revenus,RefPrec) => {
    let now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD');
    cy.request({
      method: 'POST', 
      url: urlMS+"/os/"+vers+"/upsert",
      body: {
        "_id": idOSms,
        "group_id": groupID,
        "user": "b4573b0d-b471-428f-a326-f9de9cbd2c5f",
        "organization": org,
        "created_at": dateString,
        "type_of_cee": "standard",
        "bank": {
            "amount_subsidized_loan": "",
            "effective_interest_rate": "",
            "amount_bonus": "",
            "bank": ""
        },
        "draft": true,
        "cee": {
            "id": "6200fe9845b2efeb0a341aef",
            "work_type": "insulation",
            "type": typeOS,
            "boost": false,
            "attributes": {
                "zone": zone,
                "insulatedSurface": surface
            },
            "part_a": {
                "insulationType": insulationType
            },
            "cumac": 226100,
            "prime": 1243.4463792744002,
            "price": 5.499541704
        },
        "construction_site": {
            "house_type": "house",
            "apartment_heating_type": "",
            "is_older_than_two_years": true,
            "heating_method": "electricity",
            "address": "",
            "address_details": "",
            "city": "",
            "zipcode": "",
            "occupant_is_tenant_or_owner": "tenant",
            "residential_address_same_as_construction_site_address": true
        },
        "beneficiary": {
            "gender": "m",
            "last_name": "TestAuto",
            "first_name": "TestAuto",
            "phone": "0666666666",
            "email": donneesTest.user,
            "address": adresse+" "+CP+" "+ville,
            "city": ville,
            "zipcode": CP,
            "street": adresse,
            "address_details": ""
        },
        "precarity": {
            "type": revenus,
            "tax_reference": "",
            "number_reference": RefPrec
        }
    },
    headers: {
      'content-type' : 'application/json',
      'x-api-key': api_key
    }
    }).should((response) => {
      cy.log(JSON.stringify(response.body))
      cy.readFile('cypress/fixtures/OScrees.json').then((data) => {
          data.idOSms = response.body.$oid
          cy.writeFile('cypress/fixtures/OScrees.json', JSON.stringify(data))
      })
      idOSms = response.body.$oid
      expect(response.status).equal(201)
    })
  })
  Given('Suppression de l OS',() => {
    cy.request({
      method: 'DELETE', 
      url: urlMS+"/os/"+vers+"/"+idOSms,
      body: {},
      headers: {
        'content-type' : 'application/json',
        'x-api-key': api_key
      }
    }).should((response) => {
      expect(response.status).equal(204)
    })
  })