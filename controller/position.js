
const Position = require('../models/position');


async function getAllPositions(req, res, next) {
    Position.find(function(err, positions) {
        if(err) {
            return res.status(500).send("Something went wrong! Please try again.")
        }
        else {
            console.log('token in cookies', req.cookies.auth)
            console.log('positions', positions)
            res.render('position/getPositions', {title: 'Express', positions: positions})
        }
    });
}

async function getPositionByID(req, res, next) {
    await Position.findById((req.params.id), function(err, position) {
        if(err) {
            return res.status(500).send("Something went wrong! Please try again.")
        }
        console.log('position by id', position)
        return res.render('position/positionDetails', {title: position.role, position:position})
    });
}

async function getPositionByIDToUpdate(req, res, next) {
    await Position.findById((req.params.id), function(err, position) {
        if(err) {
            return res.status(500).send("Something went wrong! Please try again.")
        }
        return res.render('position/update', {put: true, title: position.role, position: position})
    });
}


module.exports = {
    getAllPositions,
    getPositionByID,
    getPositionByIDToUpdate
}
