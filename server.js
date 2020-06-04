var express = require("express");
var path = require("path");
var http = require("http");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// set up path routings
app.get("/api/reserve", function (req, res) {
    return res.json(reserve);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

// app.get("/api/table", function(req, res) {
//   return res.json(table);
// });

app.get("/", function (req, res) {
    
    res.sendFile(path.join(__dirname, "html/home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "html/reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "html/tables.html"));
});

app.post("/api/addtable", function (req, res) {
    console.log(req.body);
    let newTable = req.body;
    newTable.routeName = newTable.customerName.replace(/\s+/g, "").toLowerCase();

    if (reserve.length < 5) {
        reserve.push(newTable);
    } else {
        waitlist.push(newTable);
    }

    if (newTable.customerName === reserve.customerName) {
        console.log("You have a reservation.")
    } else {
        console.log("We'll put you on the waitlist.")
    }

    res.json(newTable);
});

app.post("/api/checkoff", function (req, res) {
    console.log(req.body);
    let id = req.body.ID;

    for (let i = 0; i < reserve.length; i++) {
        if (reserve[i].customerID === id) {
            reserve.splice(i,1); // in-place
        }
    }

    res.json(req.body.ID);
})

let reserve = [
    {
        "customerName": "Test2",
        "customerEmail": "test@email.com",
        "phoneNumber": "123-456-7890",
        "customerID": "testId"
    }
];

let waitlist = [
]


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
