const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
   
    const firstName = req.body.fname;//getting all the data and storing into the variable
    const lastName = req.body.lname;
    const email = req.body.email;
    //you can console log and check if your're recieveing data fom the form or not
    // res.send('welcome, ' + firstName + "with the last name " + lastName + " and email is: " + email)

    // in order to send data to the amailchimp we need to follow its json format in which it accept the data
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
    
                }
            }
        ]
    };
    
    // its converts the data into the JSON String
    const jsonData = JSON.stringify(data);

    // making api using https.request method
    // https.request(url, options, function(response){})

    const url = "https://{here put you last word of api key as us7, us8 , us9 , us5 acc to your api key}.api.mailchimp.com/3.0/lists/{here put your list id}"
    // for auth
    const options = {       
        method: "POST",
        auth: "irtaza:{here put yout api key}"
    }

    const request = https.request(url, options, function(response){
        
        // check if the server is responding
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse);
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
});
app.post("/success", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
})


