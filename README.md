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

1.	Create an endpoint that will allow you to retrieve the `first_name`, `last_name` and `email` of each customer from the database.
2.	As you can see, Jimbo's assistant, Mahmood, did a pretty bad job putting everything online so the `last_transactions` are not ordered for the customers. Please write a script that orders these. Jimbo's also asking if you could make sure that this script runs every wednesday at 1am (if the app is running of course). 
3. In this kind of business you often get "troublesome" customers. Sometimes Jimbo needs to pay them a little visit to remind them that he is un-f*ck-with-able. Please write an endpoint that will calculate the distance between a given place and a customer to help Jimbo determine if it's worth it to visit them.
4.	Create an endpoint that can update the currencies and prices of suppliers with real time conversion rates.
5.	Lastly, create an endpoint that can add items to the inventory.
6. Jimbo's rival, Bojim, knows a thing or two about computers so Jimbo's afraid that he might use his app to mess up his inventory. He asks you to make sure that all the endpoints he mentioned until now can only be accessed if you add the passphrase "Money4MeNot4u" somewhere in the request.

Jimbo also wants his customers to benefit from this upgrade (but not too much).

1.	Create an endpoint that can process customer orders (make the relevant database updates).
2. Jimbo wants to make sure that only his registered customers can use the app. Everytime they do, he wants to store these "events" inside a new database that also shows who made the request and when it was made. He doesn't care about how it's done, as long as it's done.

Jimbo has had major trust issued ever since his mum lied to him, claiming that his goldfish turned invisble even though she accidently killed it. Therefore, he asks you to run a few tests to prove that your app works, he will then check the databases to see if stuff changed acordingly.

  * Customer with `id = 4` (probably a Colombian chef) has gone and made a purchase of `12 dolphins` and `4 truffles`
  
  * Customer with `id = 1` (probably Dan Bilzerian’s long-lost cousin) has bought `1 helicopter`, `5 AK47s`, `3 cocaines`  
  
  * For this year, we are adding a new item to our menu, it’s `hand_sanitizer`. It’ll be supplied by the same exact supplier as `toilet_paper`. We’ll order `500`, with a `10.00` price tag. Color will be `green`, hex: `#302`.

Thank you very much for your help. You have 1 week to complete the task. 
