const { validationResult } = require('express-validator/check');

const Position = require('../models/position');
const positionValidation = require('../middlewares/position');
const auth = require('../middlewares/auth');


async function createPosition(req, res, next) {
    try {
        const errors = validationResult(req)
        const position = req.body;
        if (!errors.isEmpty()) {
            const projectNameErr = errors.array().find(e => e.msg === positionValidation.projectNameRequired)
            const clientNameErr = errors.array().find(e => e.msg === positionValidation.clientNameRequired)
            const roleErr = errors.array().find(e => e.msg === positionValidation.roleRequired)
            const statusErr = errors.array().find(e => e.msg === positionValidation.statusRequired)
            const technologiesErr = errors.array().find(e => e.msg === positionValidation.technologiesRequired)
            const createdByErr = errors.array().find(e => e.msg === positionValidation.createdByRequired)
            const jobDescriptionErr = errors.array().find(e => e.msg === positionValidation.jobDescriptionRequired)
            res.render('position/create', {
                title: 'Create Position', 
                position,
                projectNameErr,
                clientNameErr,
                roleErr,
                statusErr,
                technologiesErr,
                createdByErr,
                jobDescriptionErr
            })
        } else {
            console.log('Create Position request body', req.body);
            const newPosition = new Position(req.body);
            newPosition.createdby = auth.getUserID(req, res, next);
            newPosition.save((err, savedPosition) => {
                if (err) {
                    console.log("Error while creating position: ", err);
                }
                res.redirect('/positions/position')
            });    
        }

    } catch (error) {
        return next(error)
    }
}

async function getAllPositions(req, res, next) {
    Position.find(function (err, positions) {
        if (err) {
            return res.status(500).send("Something went wrong! Please try again.")
        }
        else {
            console.log('token in cookies', req.cookies.auth)
            console.log('positions', positions)
            res.render('position/getPositions', { title: 'Positions', positions: positions, isUserLoggedIn: true })
        }
    });
}

async function getPositionByID(req, res, next) {
    await Position.findById((req.params.id), function (err, position) {
        if (err) {
            return res.status(500).send("Something went wrong! Please try again.")
        }
        console.log('position by id', position)
        return res.render('position/positionDetails', { title: position.role, position: position, isUserLoggedIn: true })
    });
}

async function getPositionByIDToUpdate(req, res, next) {
    await Position.findById((req.params.id), function (err, position) {
        if (err) {
            return res.status(500).send("Something went wrong! Please try again.")
        }
        return res.render('position/update', { put: true, title: position.role, position: position, isUserLoggedIn: true })
    });
}


module.exports = {
    createPosition,
    getAllPositions,
    getPositionByID,
    getPositionByIDToUpdate
}
