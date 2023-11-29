const connection = require('../connection/app.connection')

const jwt = require('jsonwebtoken')



/*
@Method: User Exist.
@Description : It checks that User exist in the database or not.
*/
async function userExist(req, res, next) {


    try {
        let user_exist = `SELECT COUNT(customer_email) AS email FROM customer_details WHERE customer_email = '${req.body.customer_email}'`
        connection.query(user_exist, (error, result) => {

            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if (result[0].email > 0) {

                res.send({
                    error: true,
                    status: 400,
                    message: "Email Already Exist",
                    data: {}
                })
            } else {
                next()
            }

        })
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
@Method: Basket Exist in food order or not.
@Description : It checks that entered basket exist in the food order table or not.
*/
async function basketExistInFoodOrders(req, res, next) {


    try {
        let basket_exist_food_orders_query = `SELECT COUNT(basket_id) AS basket_id FROM food_orders WHERE basket_id = '${req.body.basket_id}'`
        connection.query(basket_exist_food_orders_query, (error, result) => {

            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if (result[0].basket_id > 0) {

                res.send({
                    error: true,
                    status: 400,
                    message: "Basket Already exist",
                    data: {}
                })
            } else {
                next()
            }

        })
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
@Method: User Not Exist.
@Description : It checks that User exist in the database or not.
*/
async function userNotExist(req, res, next) {


    try {
        let userNotExist = `SELECT COUNT(customer_email) AS email FROM customer_details WHERE customer_email = '${req.body.customer_email}'`
        connection.query(userNotExist, (error, result) => {

            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if (result[0].email <= 0) {

                res.send({
                    error: true,
                    status: 400,
                    message: "Email Not Exist",
                    data: {}
                })
            } else {
                next()
            }

        })
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
@Method: User Authentication.
@Description : It checks that User is authentic or not.
*/
async function authenticationJWT(req, res, next) {
    try {


        const token = req.body.token || req.query.token || req.headers['access-token'];
        // console.log(token);
        if (!token) {
            return res.send({
                error: true,
                status: 400,
                message: "Token is must to enter into a secure page",
                data: {}

            })
        } else {
            jwt.verify(token, 'ThisIsMySecretKey', (err, data) => {
                if (err) {

                    return res.send({
                        error: true,
                        status: 400,
                        message: "Authentication failed Token mismatched",
                        data: { data }

                    })
                } else {
                    next();

                }
            })
        }

    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: "abc",
            data: {}
        })
    }
}



/*
@Method: Basket Exist.
@Description : It checks that Basket Exist in our database or not.
*/
async function basketExist(req, res, next) {
    try {
        let basket_exist_query = `SELECT COUNT(basket_id) AS basket_id FROM food_basket WHERE basket_id = ${req.body.basket_id}`
        connection.query(basket_exist_query, (error, result) => {
            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if (result[0].basket_id <= 0) {

                res.send({
                    error: true,
                    status: 400,
                    message: "Basket Dosen't Exist",
                    data: {}
                })
            } else {
                next()
            }
        })
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: "abc",
            data: {}
        })
    }
}


/*
@Method: Customer Exist.
@Description : It checks that customer Exist in food_basket or not.
*/
async function customerExistInFoodBasket(req, res, next) {
    try {
        let customer_Exist_In_FoodBasket = `SELECT COUNT(customer_email) AS customer_email FROM food_orders WHERE customer_email = '${req.body.customer_email}'`
        connection.query(customer_Exist_In_FoodBasket, (error, result) => {
            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if (result.length  <= 0) {

                res.send({
                    error: true,
                    status: 400,
                    message: "Customer Dosen't Exist",
                    data: {}
                })
            } else {
                next()
            }
        })
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: "abc",
            data: {}
        })
    }
}


/*
@Method: Customer Exist.
@Description : It checks that customer Exist in food_basket or not.
*/
async function customerLoginIdIdExistInFoodOrders(req, res, next) {
    try {
        let food_Order_Id_Exist_In_FoodOrders = `SELECT COUNT(customer_email) AS customer_email FROM food_orders WHERE customer_email = '${req.body.customer_email}'`

        connection.query(food_Order_Id_Exist_In_FoodOrders, (error, result) => {
            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if (result.length <= 0) {

                res.send({
                    error: true,
                    status: 400,
                    message: "Login ID Dosen't Exist",
                    data: {}
                })
            }
            else {
                next()
            }
        })
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: "abc",
            data: {}
        })
    }
}


/*
@Method: order Confirmation Customer Login Id.
@Description : It checks that order Confirmation Customer Login Id in food_basket or not.
*/
async function orderConfirmationCustomerLoginIdExist(req, res, next) {
    try {
        let query = `SELECT COUNT (customer_email) AS customer_email FROM order_confirmation WHERE customer_email = '${req.body.customer_email}'`
        connection.query(query, (error, result) => {
            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if(result[0].customer_email > 0){
                res.send({
                    error: false,
                    status: 200,
                    message: "Order Id Already Exist",
                    data: {}
                })

            }else{
                next()
            }

        })
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: "abc",
            data: {}
        })
    }
}


/*
@Method: order confirmation Exist.
@Description : It checks that order confirmation Exist in food_basket or not.
*/
async function orderConfirmationExist(req, res, next) {
    try {
        let query = `SELECT COUNT (order_confirmation_id) AS order_confirmation_id FROM order_confirmation WHERE order_confirmation_id = ${req.body.order_confirmation_id}`
       
        connection.query(query, (error, result) => {
            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if(result[0].order_confirmation_id == 0){
                res.send({
                    error: false,
                    status: 200,
                    message: "Order Dosen't Exist",
                    data: {}
                })

            }else{
                next()
            }

        })
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: "abc",
            data: {}
        })
    }
}

/* 
@Method: feedback Exist.
@Description : It checks that feedback Exist in food_basket or not.
*/

async function feedbackExist(req, res, next) {
    try {
        let query = `SELECT COUNT (order_confirmation_id) AS order_confirmation_id FROM feedback WHERE order_confirmation_id = ${req.body.order_confirmation_id}`
        connection.query(query, (error, result) => {
            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            } else if(result[0].order_confirmation_id > 0){
                res.send({
                    error: false,
                    status: 200,
                    message: "That feedback already Exist",
                    data: {}
                })

            }else{
                next()
            }

        })
    } catch (error) {
        res.send({
            error: true,
            status: 500,
            message: "abc",
            data: {}
        })
    }
}




module.exports = {


    userExist,
    userNotExist,
    basketExistInFoodOrders,
    authenticationJWT,
    basketExist,
    customerExistInFoodBasket,
    customerLoginIdIdExistInFoodOrders,
    orderConfirmationCustomerLoginIdExist,
    orderConfirmationExist,
    feedbackExist


}