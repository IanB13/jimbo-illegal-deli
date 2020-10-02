// Import the app
const app = require("./app")
// Setup server port
const port = process.env.PORT || 8080

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running API test bed on port " + port)
})