const express = require('express')
const router = express.Router();
const UserControllers = require('./controllers/userController')


router.get('/try/:id',UserControllers.try)
router.post('/register',UserControllers.register)
router.get('/backupMethod',UserControllers.backupMethod)
router.get('/restoreMethod',UserControllers.restoreMethod)
router.post('/deleteUser',UserControllers.deleteUser)
router.get('/videoTry',UserControllers.videoTry)

//basic types
router.post('/addNewBasicType',UserControllers.addNewBasicType)
router.get('/getBasicTypes',UserControllers.getBasicTypes)
router.put('/editBasicTypes',UserControllers.editBasicTypes)
router.put('/deleteBasicTypes',UserControllers.deleteBasicTypes)

//reservation types



module.exports = router