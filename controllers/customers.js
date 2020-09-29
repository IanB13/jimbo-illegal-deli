const customerRouter = require(`express`).Router();

customerRouter.get('/', (_request, response) => {
    response.status(200).json({"ello":"mate"})
 })


module.exports = customerRouter