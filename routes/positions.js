const express = require('express');
const router = express.Router();
const methodOverride = require("method-override");

const Position = require('../models/position');
const auth = require('../middlewares/auth')
const positionMiddleware = require('../middlewares/position')
const positionController = require('../controller/position');

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

/* Creates a new position */
router.post('/create', auth.isUserManager(), positionMiddleware.validate('createPosition'), positionController.createPosition);


/* Get all positions */
router.get('/position', positionController.getAllPositions);


/* Get position by id */
router.get('/position/:id', positionController.getPositionByID);

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
            return res.redirect('/positions/position/' + data._id)
        })
});


router.get('/position/update/:id', positionController.getPositionByIDToUpdate);


router.get('/create', auth.isUserManager(), function (req, res, next) {
    res.render('position/create', { title: 'Create Position', isUserLoggedIn: true })
})

module.exports = router;
