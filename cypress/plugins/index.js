/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const {   addMatchImageSnapshotPlugin, } = require('cypress-image-snapshot/plugin');
const cucumber = require('cypress-cucumber-preprocessor').default;
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse')
const repoRoot = path.join(__dirname, '..', '..')
var dns = require('dns')
const { rmdir } = require('fs')
const parsePdf = async (pdfName) => {
  const pdfPathname = path.join(repoRoot, pdfName)
  let dataBuffer = fs.readFileSync(pdfPathname);
  return await (pdf(dataBuffer))  // use async/await since pdf returns a promise
}
const xlsx = require('node-xlsx').default;
// const { connect } = require("/home/taitaouit/Bureau/WorkspaceCy/test_cypress/cypress/integration/common/db")

module.exports = (on, config) => {
  on('task', {
      // async clearPrecarity() {
      //   const db = await connect()
      //   const precarity = db.collection('precarity')      
      //   cy.log('clear precarity')
      //   // await pizzas.remove({})
      // },
        getPdfContent (pdfName) {
            return (parsePdf(pdfName))
        },
        deleteFolder (folderName) {      
            return new Promise((resolve, reject) => {
                rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
                if (err) {
                  return reject(err)
                }
                resolve(null)
              })
            })
        },
        createFolder (folderName) {      
            return new Promise((resolve, reject) => {
                fs.mkdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
                if (err) {
                    return reject(err)
                }
                resolve(null)
              })
            })
        },
        parseXlsx(filePath){ return new Promise((resolve, reject) =>{
          try 
            {
              const jsonData = xlsx.parse(fs.readFileSync(filePath)); 
              resolve(jsonData);
            } catch (e) 
            {
              reject(e);
            }
        })
      }
    })
    on('file:preprocessor', cucumber())
    addMatchImageSnapshotPlugin(on)
    // require('@cypress/react/plugins/react-scripts')(on, config)
    config = cypressBrowserPermissionsPlugin(on, config)
    on('task', {downloadFile})
    on('before:browser:launch', (browser, launchOptions) => {})
    return config
}