const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
// controller functions
const { loginUser, verifyEmail, signupUser, getsingleuser,getmanagers, getusers, getstaff, deleteuser, Updateuserpwd ,forgotpwd, resetpwd,CreatestaffUser,generateReport,getNewAccountsWithinOneMonth} = require('../controllers/userController')



// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//get managers
router.get('/managers', getmanagers )

//get staff
router.get('/staff', getstaff )

//get users
router.get('/users',getusers)

//get user
router.get('/:id', getsingleuser)

//delete account
router.delete('/delete/:email',deleteuser)

//update pwd
router.patch('/update/:email',Updateuserpwd)

//forgot pwd
router.post('/forgotPassword',forgotpwd)

//reset pwd
router.patch('/resetPassword/:token',resetpwd)

//varify email
router.get('/verify-email/:verifytoken',verifyEmail)


router.get('/users/report',generateReport)

router.get('/newuser/report',getNewAccountsWithinOneMonth)







module.exports = router