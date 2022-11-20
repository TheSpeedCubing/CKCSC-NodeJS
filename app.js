const express = require("express");
const { google } = require("googleapis");
const path = require('path');
const ejs = require('ejs');
const keys = require('./keys.json');
const { response } = require("express");
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err,token){
    if(err){
        console.log(err);
        return;
    } else{
        console.log('sup nerd');
        gsrun(client);
    }
});

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth: cl});

    const opt = {
        spreadsheetId: '%id%',       range: "data!A1:H9"
        
    };
    app.get('/' ,async function(req,res){
let data = await gsapi.spreadsheets.values.get(opt);
console.log(data.data.values);
let dataArray = data.data.values;response.render("index", {data: dataArray})
    });
};

app.listen(3000,()=> console.log('hello'));