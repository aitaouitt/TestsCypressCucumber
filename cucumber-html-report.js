const report = require('multiple-cucumber-html-reporter');
const moment = require('moment');
let now = new Date();
var dateString = moment(now).format('YYYY-MM-DD HH-mm-ss');

report.generate({
    jsonDir: "cypress/cucumber-json",
    reportPath: "cypress/reports/cucumber-htmlreport-"+dateString+".html",
    reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: true,
      ignoreBadJsonFile: true,
      scenarioTimestamp: true,
	metadata:{
        browser: {
            name: 'chrome',
            version: '96'
        },
        device: 'Local test machine',
        platform: {
            name: 'windows',
            version: '10s'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Back Office'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'}
        ]
    }
});