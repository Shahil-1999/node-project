const connection = require('../connection/app.connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



class Controller {

    /*
    @Method: User Registration
    @Description: Register the new user
    */
    async userRegistration(req, res) {
        try {

            let password = req.body.customer_password

            bcrypt.hash(password, bcrypt.genSaltSync(10), (error, hashPassword) => {

                if (error) {
                    res.send({
                        error: true,
                        status: 400,
                        message: error,
                        data: {}
                    })
                } else {

                    let query = `INSERT INTO customer_details (customer_name, customer_email, customer_password) VALUES ('${req.body.customer_name}', '${req.body.customer_email}', '${hashPassword}')`

                    if (!(password === req.body.c_password)) {
                        res.send({
                            error: true,
                            status: 401,
                            message: 'password and confirm password not matched',
                            data: {}
                        })
                    } else {
                        connection.query(query, (error, result) => {
                            if (error) {
                                res.send({
                                    error: true,
                                    status: 400,
                                    message: error.sqlMessage,
                                    data: {}
                                })

                            } else {
                                res.send({
                                    error: false,
                                    status: 200,
                                    message: "Data Inserted",
                                    data: { result }
                                })

                            }
                        })
                    }

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
    @Method: User Login
    @Description: Login the the existing user
    */
    async userLogin(req, res) {

        try {


            let username_exist = `SELECT * FROM customer_details WHERE customer_email = '${req.body.customer_email}'`
            connection.query(username_exist, (err, result) => {

                if (err) {
                    res.send({
                        error: true,
                        status: 400,
                        message: err.sqlMessage,
                        data: {}
                    })


                } else if (result.length > 0) {

                    let storedHashedPassword = result[0].customer_password;
                    let entered_pwd = req.body.customer_password;

                    bcrypt.compare(entered_pwd, storedHashedPassword, (err, results) => {
                        // console.log(storedHashedPassword);

                        if (err) {
                            res.send({
                                error: true,
                                status: 400,
                                message: "Error comparing password = " + err,
                                data: {}

                            })
                        } else if (results) {


                            // User found, generate and send JWT
                            const token = jwt.sign({
                                email: results.customer_email,
                                password: results.customer_password
                            }, 'ThisIsMySecretKey', { expiresIn: '1h' });

                            res.send({
                                error: false,
                                status: 200,
                                message: "Token generated Logged In",
                                data: { token }


                            });

                        } else {
                            res.send({
                                error: true,
                                status: 400,
                                message: "Password mismatched",
                                data: {}

                            })
                        }
                    })
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
    @Method: Food Category
    @Description: User Can see Food Category 
    */
    async foodCategory(req, res) {
        try {
            let query = `SELECT * FROM food_categories`
            connection.query(query, (err, result) => {
                if (err) {
                    res.send({
                        error: true,
                        status: 400,
                        message: err.sqlMessage,
                        data: {}
                    })


                } else {
                    res.send({
                        error: false,
                        status: 200,
                        message: "Food Category List",
                        data: { result }
                    })

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
    @Method: Food List
    @Description: User Can see Food List 
    */
    async foodTable(req, res) {
        try {
            let query = `SELECT * FROM food_table`
            connection.query(query, (err, result) => {
                if (err) {
                    res.send({
                        error: true,
                        status: 400,
                        message: err.sqlMessage,
                        data: {}
                    })


                } else {
                    res.send({
                        error: false,
                        status: 200,
                        message: "Food Items List",
                        data: { result }
                    })

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
    @Method: Food List Based on Category
    @Description: User Can see Food List Based on Specific Category
    */
    async findFoodItemsBasedFoodCategory(req, res) {
        try {
            let query = `SELECT * FROM food_table WHERE  food_category_id = ${req.body.food_category_id}`
            connection.query(query , (err, result) => {
                if (err) {
                    res.send({
                        error: true,
                        status: 400,
                        message: err.sqlMessage,
                        data: {}
                    })


                } else {
                    res.send({
                        error: false,
                        status: 200,
                        message: "Food Items List Based on Their Category",
                        data: { result }
                    })

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
    @Method: Add Food Basket.
    @Description : It add the food in our basket.
    */
    async addFoodBasket(req, res) {
        let basketUserExist = `SELECT COUNT(customer_email) AS customer_email FROM food_basket WHERE customer_email = '${req.body.customer_email}'`

        connection.query(basketUserExist, (error, result) => {
            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: err,
                    data: {}
                })

            } else if (result[0].customer_email > 0) {
                let foodExist = `SELECT * FROM food_basket WHERE food_id = ${req.body.food_id}`
                connection.query(foodExist, (error, result) => {

                    if (error) {
                        res.send({
                            error: true,
                            status: 400,
                            message: err,
                            data: {}
                        })

                    } else if (result[0]?.food_id > 0) {


                        /*
                        @Method : Update the Food Quantity and Price.
                        @Description : Update the Food Quantity and Price if the food id and login id is same.
                        */



                        let updated_food_quantity = result[0]?.food_quantity + req.body.food_quantity

                        let updated_sub_total = result[0]?.food_price * updated_food_quantity

                        let update_query = `UPDATE food_basket SET food_quantity = ${updated_food_quantity}, sub_total = ${updated_sub_total} WHERE customer_email = '${req.body.customer_email}';`

                        connection.query(update_query, (err, result) => {
                            if (err) {
                                res.send({
                                    error: true,
                                    status: 400,
                                    message: err.sqlMessage,
                                    data: {}
                                })

                            } else {
                                res.send({
                                    error: false,
                                    status: 200,
                                    message: "Update sucessfull",
                                    data: {}
                                })

                            }
                        })

                    } else {
                        let food_price = `SELECT food_price FROM food_table WHERE food_id = ${req.body.food_id}`
                        connection.query(food_price, (err, result) => {
                            if (err) {
                                res.send({
                                    error: true,
                                    status: 400,
                                    message: err,
                                    data: {}
                                })
                            } else {
                                let food_price = result[0].food_price * req.body.food_quantity


                                let food_add_query = `INSERT INTO food_basket (customer_email, food_id, food_category_id, food_quantity, sub_total) VALUES ('${req.body.customer_email}', ${req.body.food_id}, ${req.body.food_category_id}, ${req.body.food_quantity}, ${food_price})`

                                connection.query(food_add_query, (err, result) => {
                                    if (err) {
                                        res.send({
                                            error: true,
                                            status: 400,
                                            message: err,
                                            data: {}
                                        })
                                    } else {

                                        res.send({
                                            error: false,
                                            status: 200,
                                            message: "Data Add Sucessfully",
                                            data: { result }
                                        })
                                    }
                                })
                            }
                        })

                    }
                })




            } else {

                let food_price = `SELECT food_price FROM food_table WHERE food_id = ${req.body.food_id}`
                connection.query(food_price, (err, result) => {
                    if (err) {
                        res.send({
                            error: true,
                            status: 400,
                            message: err,
                            data: {}
                        })
                    } else {
                        let food_price = result[0].food_price * req.body.food_quantity

                        let food_add_query = `INSERT INTO food_basket (customer_email, food_id, food_category_id, food_quantity, sub_total) VALUES ('${req.body.customer_email}', ${req.body.food_id}, ${req.body.food_category_id}, ${req.body.food_quantity}, ${food_price})`

                        connection.query(food_add_query, (err, result) => {
                            if (err) {
                                res.send({
                                    error: true,
                                    status: 400,
                                    message: err,
                                    data: {}
                                })
                            } else {

                                res.send({
                                    error: false,
                                    status: 200,
                                    message: "Data Add Sucessfully",
                                    data: { result }
                                })
                            }
                        })
                    }
                })

            
            }

        })
    }



    /*
    @Method: Add Food Basket.
    @Description : It add the food in our basket.
    */
    async readBasketFoodItems(req, res) {
        try {
            let read_food_basket_query = `SELECT food_basket.basket_id,food_basket.customer_email, customer_details.customer_name, food_categories.food_category_name, food_table.food_name, food_basket.food_quantity, food_table.food_price, food_basket.sub_total
            FROM food_basket
            LEFT JOIN customer_details ON food_basket.customer_email = customer_details.customer_email
            LEFT JOIN food_categories ON food_categories.food_category_id = food_basket.food_category_id
            LEFT JOIN food_table ON food_table.food_id = food_basket.food_id 
            WHERE food_basket.customer_email = '${req.body.customer_email}' `


            connection.query(read_food_basket_query, (err, result) => {

                // console.log(result[0]);
                //console.log(result[0].customer_email);


                if (err) {
                    res.send({
                        error: true,
                        status: 400,
                        message: err.sqlMessage,
                        data: {}
                    })




                } else if (result.length > 0) {
                    
                    res.send({
                        error: false,
                        status: 200,
                        message: "Food bucket List",
                        data: { result }
                    })
                } else {
                    res.send({
                        
                        error: true,
                        status: 200,
                        message: "Customer Dosen't Exist",
                        data: {}
                    })

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
    @Method: Delete the Food Items from Basket.
    @Description : user can delete the food in our basket.
    */
    async deleteBasketFoodItems(req, res) {
        try {

            let delete_query = `delete from food_basket where basket_id  = ${req.body.basket_id}`
            connection.query(delete_query, (err, result) => {

                if (err) {
                    res.send({
                        error: true,
                        status: 400,
                        message: err.sqlMessage,
                        data: {}
                    })

                }
                else {
                    res.send({
                        error: false,
                        status: 200,
                        message: "Item sucessfully deleted from your Basket",
                        data: {}
                    })
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
    @Method: to add the food orders.
    @Description : user can add the food orders.
    */
    async postFoodOrders(req, res) {
        try {


            let post_food_order_query = `INSERT INTO food_orders (basket_id, customer_email, food_payment_mode) VALUES (${req.body.basket_id}, '${req.body.customer_email}', '${req.body.food_payment_mode}')`

            connection.query(post_food_order_query, (error, result) => {

                if (error) {
                    res.send({
                        error: true,
                        status: 400,
                        message: error.sqlMessage,
                        data: {}
                    })

                }
                else {
                    res.send({
                        error: false,
                        status: 200,
                        message: "Data Add Sucessfully",
                        data: {}
                    })
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
    @Method: to read the food orders.
    @Description : user can Read the food orders.
    */
    async readFoodOrders(req, res) {
        try {


            let read_food_order_query = `select food_basket.basket_id, customer_details.customer_name, food_orders.food_payment_mode
            from food_orders
            left join food_basket on food_orders.basket_id = food_basket.basket_id
            left join customer_details on customer_details.customer_email = food_orders.customer_email

            WHERE food_basket.customer_email = '${req.body.customer_email}'`

            connection.query(read_food_order_query, (error, result) => {

                if (error) {
                    res.send({
                        error: true,
                        status: 400,
                        message: error.sqlMessage,
                        data: {}
                    })

                }
                else {
                    res.send({
                        error: false,
                        status: 200,
                        message: "Food Order List",
                        data: { result }
                    })
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
    @Method: to read the food orders.
    @Description : user can Read the food orders.
    */
   async postOrderConfirmation(req, res){
    try {


        let post_order_confirmation_query = `INSERT INTO order_confirmation (customer_email, status) VALUES ('${req.body.customer_email}', 'pending')`

        connection.query(post_order_confirmation_query, (error, result) => {

            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            }
            else {
                res.send({
                    error: false,
                    status: 200,
                    message: "Data Add Sucessfully",
                    data: {}
                })
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
    @Method: to read the Order Confirmation.
    @Description : user can Read the  orders Confirmation.
    */
    async readOrderConfirmation(req, res) {
        try {


            let read_order_confirmation_query = `select order_confirmation.order_confirmation_id, customer_details.customer_name, order_confirmation.status
            from order_confirmation
            left join customer_details on order_confirmation.customer_email = customer_details.customer_email
            left join food_orders on food_orders.customer_email = order_confirmation.customer_email
            where food_orders.customer_email = '${req.body.customer_email}'
            group by order_confirmation.order_confirmation_id `

            connection.query(read_order_confirmation_query, (error, result) => {

                if (error) {
                    res.send({
                        error: true,
                        status: 400,
                        message: error.sqlMessage,
                        data: {}
                    })

                }
                else {
                    res.send({
                        error: false,
                        status: 200,
                        message: "Order Confirmation Details",
                        data: { result }
                    })
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
    @Method: to read the food orders.
    @Description : user can Read the food orders.
    */
   async postFeedback(req, res){
    try {


        let post_feedback_query = `INSERT INTO feedback (order_confirmation_id, customer_email, feedback_message, feedback_ratings) VALUES (${req.body.order_confirmation_id}, '${req.body.customer_email}', '${req.body.feedback_message}', ${req.body.feedback_ratings})`

        connection.query(post_feedback_query, (error, result) => {

            if (error) {
                res.send({
                    error: true,
                    status: 400,
                    message: error.sqlMessage,
                    data: {}
                })

            }
            else {
                res.send({
                    error: false,
                    status: 200,
                    message: "Feedback Submitted Sucessfully",
                    data: {}
                })
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


}





module.exports = new Controller;