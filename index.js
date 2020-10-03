const config = require("./utils/config")
// Import the app
const app = require("./app")
// Setup server port
const port = config.PORT

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running API test bed on port " + port)
})