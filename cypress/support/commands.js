// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//Cypress.commands.add('login easy', () => {
//
//    const userCredentials = {
//        "user": {
//            "email": "rachida.chaabani@teksial.com",
//            "password": "Qnis1234&."
//        }
//    } 
//
//    cy.request('GET', 'https://ct.pinterest.com/user/')
//})
import 'cypress-file-upload';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
const compareSnapshotCommand = require('cypress-visual-regression/dist/command');
require('cypress-downloadfile/lib/downloadFileCommand');
addMatchImageSnapshotCommand({
        failureThreshold: 0.03,
        failureThresholdType: 'percent',
        customDiffConfig: { threshold: 0.0 },
        capture: 'viewport',
});

