const router = require('express').Router()
const middleware = require('../middleware/app.middleware')
const controller = require('../controller/app.controller')
const validation = require('../validation/app.validation')


//Routes: User Registration Routes.
router.post('/userRegistration', validation.validateRegistrationAllFeildV, middleware.userExist, controller.userRegistration)

//Routes : User Login
router.post('/userLogin', validation.validateLoginFeild,middleware.userNotExist, controller.userLogin)

//Routes : Find Food Category
router.get('/foodCategory', controller.foodCategory)

//Routes : Find All Food List
router.get('/foodTable', controller.foodTable)

//Routes : Food List Based on Category
router.get('/findFoodItemsBasedFoodCategory',validation.validateFindFoodItemsBasedFoodCategoryFeild, controller.findFoodItemsBasedFoodCategory)

//Routes : Add food in basket
router.post('/addFoodBasket', validation.validateBasket, middleware.authenticationJWT, controller.addFoodBasket)

// Routes : Read the Basket
router.get('/readBasketItems',validation.validateReadBasketItems, middleware.authenticationJWT, controller.readBasketFoodItems)

// Routes : Read the Basket
router.delete('/deleteBasketFoodItems',validation.validateDeleteBasketItems, middleware.authenticationJWT, middleware.basketExist, controller.deleteBasketFoodItems )

//Router : Add Data on Food Orders
router.post('/postFoodOrders', validation.validatePostFoodOrders,middleware.basketExist, middleware.basketExistInFoodOrders,controller.postFoodOrders)

//Router : Read data from food orders
router.get('/readFoodOrders' ,validation.validateReadFoodOrders, middleware.authenticationJWT, middleware.customerExistInFoodBasket, controller.readFoodOrders)

//Router : Add data on order Confirmation
router.post('/postOrderConfirmation' ,validation.validatePostOrderConfirmation,middleware.authenticationJWT, middleware.customerLoginIdIdExistInFoodOrders,middleware.orderConfirmationCustomerLoginIdExist, controller.postOrderConfirmation)

//Router : Read data from Order Confirmation
router.get('/readOrderConfirmation',validation.validateReadFoodOrders,middleware.authenticationJWT, middleware.customerLoginIdIdExistInFoodOrders, controller.readOrderConfirmation)

//Router : Post Feedback Data
router.post('/postFeedback', validation.validateFeedback, middleware.authenticationJWT, middleware.orderConfirmationExist, middleware.feedbackExist, controller.postFeedback)

module.exports = router