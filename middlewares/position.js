const { body, check } = require('express-validator')

const projectNameRequired = 'Project name not provided';
const clientNameRequired = 'Client name not provided';
const roleRequired = 'Role can either be employee or manager';
const technologiesRequired = 'Technologies not provided';
const statusRequired = 'status not provided';
const createdByRequired = 'Created by not provided';
const jobDescriptionRequired = 'Job description not provided';

function validate(method) {
  switch (method) {
    case 'createPosition': {
     return [ 
        check('projectname', projectNameRequired).exists().notEmpty(),
        check('clientname', clientNameRequired).exists().notEmpty(),
        check('role', roleRequired).exists().notEmpty().isString(['manager', 'employee']),
        check('technologies', technologiesRequired).exists().notEmpty(),
        check('status', statusRequired).exists().isBoolean().notEmpty(),
        check('createdby', createdByRequired).exists().isString().notEmpty(),
        check('jobdescription', jobDescriptionRequired).exists().isString().notEmpty(),
       ]   
    }
  }
}

module.exports = {
    validate,
    projectNameRequired,
    clientNameRequired,
    roleRequired,
    technologiesRequired,
    statusRequired,
    createdByRequired,
    jobDescriptionRequired,
}