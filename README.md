## Overview
 Jimbo's Illegal Deli is a ecommerce platform that allows users to buy and sell products.
 It is written in node.js, tested with jest and documented with the Swagger API.
 It is deployed with a docker container using github Actions at https://jimbo-ilegal-deli.herokuapp.com/

# Jimbo's Illegal Deli

Jimbo’s Illegal Deli (JID) is an online marketplace that brings together suppliers of black market items such as ivory and irresponsibly-sourced caviar and not-very-morally-good customers. You’ll find that JID has a limited inventory (20 items – `inventory.json`) and a small, but loyal customer base (5 customers – `deli_customer.json`). 

Jimbo uses a pretty outdated and manual system. He heard about APIs and wants to build his own APIs that will allow him to perform `CRUD` operations on his objects in both the inventory and the customer json files. You have been hired to help him with this. 

Set-up: 
  * Clone this github repo: https://github.com/patrickreich/api_create onto your computer. 
  * In it, you’ll find the 2 json files, and an `index.js` file. For now, we are imagining that the json files are NoSQL databases stored on a server somewhere (rather than text files on your computer that you update). `index.js` is the currently the entry point of your app, but you can make as many separate files as you like in the folder. 
  * The chosen listening port is `8080`. 
  * You can use whatever `npm` packages you need on top of the `express` package that's already installed. 
  * If everything is set-up correctly the app should respond with "Hello World" on requests to `http://localhost:8080` (how original). 

Now, what does Jimbo’s Deli need from you?

+ I made some slight deviations. In order to put the data online in a scalable way, I hosted the backend data on a MongoDB Atlas instance. I decided to use the MongoDB Ids instead of the supplied Ids for scalability and security. 
+ I also hosted the application on Heroku using a Github actions workflow
+ I documented the endpoints using Swagger
+ I added a unique customer password
+ I added currency codes to the inventory items


1.	Create an endpoint that will allow you to retrieve the `first_name`, `last_name` and `email` of each customer from the database.
+ Added /customer/:id endpoint which retrieves the specified data. Also added a /customer that retrieves all data minus password hashes. 

2.	As you can see, Jimbo's assistant, Mahmood, did a pretty bad job putting everything online so the `last_transactions` are not ordered for the customers. Please write a script that orders these. Jimbo's also asking if you could make sure that this script runs every wednesday at 1am (if the app is running of course). 
+ Added cron job that runs every Wednesday at 1:00am and sorts last_transaction customer data. 

3. In this kind of business you often get "troublesome" customers. Sometimes Jimbo needs to pay them a little visit to remind them that he is un-f*ck-with-able. Please write an endpoint that will calculate the distance between a given place and a customer to help Jimbo determine if it's worth it to visit them.
+ Added customer/distance endpoint which uses the Haversine function to find the distance to a customer, taking into account the curvature of the Earth. Uses a query string which takes the customer's ID, and the latitude and longitude of the point which you wish to calculate the distance from. 

4.	Create an endpoint that can update the currencies and prices of suppliers with real time conversion rates.
+ Inventory currency names were not unique, e.g. a Taiwan dollar and Grenada dollar are both dollars but are not worth the same. I decided to use the country code as it is the only consistent data that I could easily use to find other data. I used the REST Countries API to find the currency code using the country code. I then attatched the currency code to the inventory item. 
+ I created a /inventory/currency endpoint which takes a currency code and updates all items in the database to the selected currency
+ If you optionally provide either an id or a item name to the endpoint it will only update the specified item

5.	Lastly, create an endpoint that can add items to the inventory.
+ Added PUT at /inventory endpoint that allows users to add an item to the inventory. Items that are added have a currency code attached. 

6. Jimbo's rival, Bojim, knows a thing or two about computers so Jimbo's afraid that he might use his app to mess up his inventory. He asks you to make sure that all the endpoints he mentioned until now can only be accessed if you add the passphrase "Money4MeNot4u" somewhere in the request.
+ Jimbo's password must be added as an Authorization header in order to acces all endpoints except the /inventory/order endpoint, which uses different authentication.

Jimbo also wants his customers to benefit from this upgrade (but not too much).

1.	Create an endpoint that can process customer orders (make the relevant database updates).
+  Added a /inventory/order endpoint that takes customer orders. Customers must provide their uid in the body of the request and their password in the Authorization header

2. Jimbo wants to make sure that only his registered customers can use the app. Everytime they do, he wants to store these "events" inside a new database that also shows who made the request and when it was made. He doesn't care about how it's done, as long as it's done.
+ Orders are added to an events database

Jimbo has had major trust issued ever since his mum lied to him, claiming that his goldfish turned invisble even though she accidently killed it. Therefore, he asks you to run a few tests to prove that your app works, he will then check the databases to see if stuff changed acordingly.

  * Customer with `id = 4` (probably a Colombian chef) has gone and made a purchase of `12 dolphins` and `4 truffles`
  
  * Customer with `id = 1` (probably Dan Bilzerian’s long-lost cousin) has bought `1 helicopter`, `5 AK47s`, `3 cocaines`  
  
  * For this year, we are adding a new item to our menu, it’s `hand_sanitizer`. It’ll be supplied by the same exact supplier as `toilet_paper`. We’ll order `500`, with a `10.00` price tag. Color will be `green`, hex: `#302`.

+ All of Jimbo's required tests are completed using Jest

Thank you very much for your help. You have 1 week to complete the task. 
