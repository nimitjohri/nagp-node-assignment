const express = require('express');
const router = express.Router();

const Position = require('../models/position');
const auth = require('../middlewares/auth')
const positionController = require('../controller/position');

/* Creates a new position */
router.post('/create', auth.isUserManager(), async function (req, res, next) {
    console.log('Create Position request body', req.body);
    const position = new Position(req.body);
    console.log('Create Position request', position);
    res.send('your data is saved')
    // position.save((err, savedPosition) => {
    //     if (err) {
    //         console.log("Error while creating position: ", err);
    //     }
    //     res.json(savedPosition)
    // });
}
);


/* Get all positions */
router.get('/position', positionController.getAllPositions);


/* Get position by id */
router.get('/position/:id', positionController.getPositionByID);


router.get('/position/update/:id', positionController.getPositionByIDToUpdate);

router.put('/update/:id', async function (req, res, next) {
    const id = req.params.id
    console.log('update body', req.body);
    Position.findByIdAndUpdate(
        { "_id": id },
        {
            $set: {
                'projectname': req.body.projectname,
                'clientname': req.body.clientname,
                'technologies': req.body.technologies,
                'jobdescription': req.body.jobdescription,
                'role': req.body.role,
                'status': req.body.status,
                'createdby': req.body.createdby,
            }
        },
        { new: true },
        function (err, data) {
            if (err) {
                return res.status(500).send("Something went wrong! Please try again.")
            }
            return res.json(data)
            // return res.render('position/update', {title: position.role, position: position})
        })
});

router.get('/create', function (req, res, next) {
    res.render('position/create', { title: 'Create Position' })
})

module.exports = router;
