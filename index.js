const express = require('express') 
const bodyparser = require('body-parser') 

const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51J1ZsHSCJw4MEka2qio7kO4Wn3qgxyHobaZyZX2A7lDkOWiVHfTrwd5O0hWBBACV1FMzUaBw1VBfR1NMe4mfoC7L00eeYwEOaG'
var Secret_Key = 'sk_test_51J1ZsHSCJw4MEka24v8IuslICDKrT5eFVBD60fkienJREiB74CQ5wSE4uM2z7f4orNNHCvVZGUbr70sg3gdxcrTR005bYq7SBO'

const stripe = require('stripe')(Secret_Key) 

const port = process.env.PORT || 2000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
    res.render('Home', { 
    key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Animesh', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 

app.listen(port, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
})