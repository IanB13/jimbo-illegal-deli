// Import the app
const app = require('./app')
// Setup server port
const port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running API test bed on port " + port);
});