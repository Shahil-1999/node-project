const joi = require('joi')


/*
 @Method: All Feild Validation.
 @Description : It validate that insertrd feild data is proper or not.
*/
async function validateRegistrationAllFeildV(req, res, next) {
    try {

        const schema = joi.object({
            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),

            name: joi.string()
                .min(3)
                .max(50),
            password: joi.string()
                .min(5)
                .max(400),
            c_password: joi.string()
                .min(5)
                .max(400)

        });

        const result = schema.validate({
            name: req.body.customer_name,
            email: req.body.customer_email,
            password: req.body.password,
            c_password: req.body.c_password
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }

}


/*
 @Method: Login Feild Validation.
 @Description : It validate that insertrd login feild data is proper or not.
*/
async function validateLoginFeild(req, res, next) {
    try {

        const schema = joi.object({
            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),


            password: joi.string()
                .min(5)
                .max(400),

        });

        const result = schema.validate({

            email: req.body.customer_email,
            password: req.body.customer_password
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }

}


/*
@Method: Validate the basket feild.
@Description : It checks that User entered proper value or not.
*/
async function validateBasket(req, res, next) {


    if (req.body.food_category_id == 1) {
        const schema = joi.object({
            food_id: joi.number()
                .min(1)
                .max(10),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }


    } else if (req.body.food_category_id == 2) {
        const schema = joi.object({
            food_id: joi.number()
                .min(11)
                .max(19),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 3) {
        const schema = joi.object({
            food_id: joi.number()
                .min(20)
                .max(28),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 4) {
        const schema = joi.object({
            food_id: joi.number()
                .min(29)
                .max(35),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 5) {
        const schema = joi.object({
            food_id: joi.number()
                .min(36)
                .max(45),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 6) {
        const schema = joi.object({
            food_id: joi.number()
                .min(46)
                .max(52),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 7) {
        const schema = joi.object({
            food_id: joi.number()
                .min(53)
                .max(55),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 8) {
        const schema = joi.object({
            food_id: joi.number()
                .min(56)
                .max(59),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 9) {
        const schema = joi.object({
            food_id: joi.number()
                .min(60)
                .max(69),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 10) {
        const schema = joi.object({
            food_id: joi.number()
                .min(70)
                .max(74),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 11) {
        const schema = joi.object({
            food_id: joi.number()
                .min(75)
                .max(84),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 12) {
        const schema = joi.object({
            food_id: joi.number()
                .min(85)
                .max(94),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 13) {
        const schema = joi.object({
            food_id: joi.number()
                .min(95)
                .max(104),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else if (req.body.food_category_id == 14) {
        const schema = joi.object({
            food_id: joi.number()
                .min(106)
                .max(110),
        });

        const result = schema.validate({

            food_id: req.body.food_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }

    } else {
        res.send({
            error: false,
            status: 200,
            message: "food_category_id must be less than or equal to 28",
            data: {}
        })
    }

}



/*
 @Method: Find Food Item Feild Validation.
 @Description : It validate that insertrd Find Food feild data is proper or not.
*/
async function validateFindFoodItemsBasedFoodCategoryFeild(req, res, next) {
    try {

        const schema = joi.object({

            food_category_id: joi.number()
                .min(1)
                .max(14),

        });

        const result = schema.validate({

            food_category_id: req.body.food_category_id || req.body.food_category_id
        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }

}


/*
@Method: Validate the Read Basket Feild.
@Description : It checks that User entered proper basket value or not.
*/
async function validateReadBasketItems(req, res, next) {
    try {

        const schema = joi.object({

            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),


        });

        const result = schema.validate({

            email: req.body.customer_email

        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }
}



/*
@Method: Validate the delete Basket Feild.
@Description : It checks that User entered proper basket value or not.
*/
async function validateDeleteBasketItems(req, res, next) {
    try {

        const schema = joi.object({

            basket_id: joi.number()
                .min(1)


        });

        const result = schema.validate({

            basket_id: req.body.basket_id

        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }
}


/*
@Method: Validate the food orders Feild.
@Description : It checks that User entered proper food orders value or not.
*/
async function validatePostFoodOrders(req, res, next) {
    try {

        const schema = joi.object({

            basket_id: joi.number()
                .min(1),
            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
            food_payment_mode: joi.string()
                .min(1)
                .max(20)


        });

        const result = schema.validate({

            basket_id: req.body.basket_id,
            email: req.body.customer_email,
            food_payment_mode: req.body.food_payment_mode

        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }
}


/*
@Method: Validate the food orders Feild.
@Description : It checks that User entered proper read food orders value or not.
*/
async function validateReadFoodOrders(req, res, next) {
    try {

        const schema = joi.object({


            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),



        });

        const result = schema.validate({


            email: req.body.customer_email

        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }
}

/*
@Method: Validate the feedback Feild.
@Description : It checks that User entered proper read feedback value or not.
*/
async function validateFeedback(req, res, next) {
    try {

        const schema = joi.object({


            order_confirmation_id: joi.number()
                .min(1),

            customer_email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),

            feedback_message: joi.string()
                .min(10)
                .max(200),
            feedback_ratings: joi.number()
                .min(1)
                .max(10),




        });

        const result = schema.validate({


            order_confirmation_id: req.body.order_confirmation_id,
            customer_email: req.body.customer_email,
            feedback_message: req.body.feedback_message,
            feedback_ratings: req.body.feedback_ratings

        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }
}


/*
@Method: Validate the food orders Feild.
@Description : It checks that User entered proper read food orders value or not.
*/
async function validatePostOrderConfirmation(req, res, next) {
    try {

        const schema = joi.object({


            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
            status: joi.string()
                .min(1)
                .max(200)



        });

        const result = schema.validate({


            email: req.body.customer_email,
            status: req.body.status

        });

        if (result.hasOwnProperty('error')) {

            res.send({
                error: true,
                status: 400,
                message: result.error.message,
                data: {}
            })

        } else {
            next()
        }
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: error,
            data: {}
        })

    }
}



module.exports = {
    validateRegistrationAllFeildV,
    validateLoginFeild,
    validateFindFoodItemsBasedFoodCategoryFeild,
    validatePostFoodOrders,
    validateReadFoodOrders,
    validateBasket,
    validateReadBasketItems,
    validateDeleteBasketItems,
    validatePostOrderConfirmation,
    validateFeedback
}