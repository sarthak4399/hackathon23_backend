const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const User = require("./models/register");


const bodyParser = require('body-parser')
var cors = require("cors");

// >>connection block<< 
mongoose.connect('mongodb+srv://IndexIt:52127@hackathon.prolocn.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('error', err => {
    console.log("<<<<<<< FAILED CONNECTION >>>>>>>") //tells connected to moongoose cloude or mongo db cloud
})
mongoose.connection.on('connected', con => {
    console.log("<<<<<<<< CONNECTED >>>>>>>>") //connection error 
})
////////////////////////////////
const app = express();
const port = 3000   ; //port for local host 
/// connection parameters 
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/////////////////
app.use(bodyParser.urlencoded({ extended: false })) //passes all inserted data in uel encoded form 
app.use(bodyParser.json()) // for mongo db collection 
app.use(cors());
app.use(express.json()); //ecpress get json format data 

app.get("/", async (req,res) => {
res.send(console.log('hello'))
})

app.post("/register", async (req, res) => { 
    try {
        const { name, email, password ,role} = req.body;
        const user = new User({ name, email, password,role }); //creating parameters
        await user.save()  //saving data of user  stores in result and passes to console  responce code 200 
            .then(result => {
                console.log(result)
                res.status(200).json({
                    newuser: result
                })
            })
        const token = user.generateAuthToken();
        console.log(token)
        res.status(201).send({ user, token }); 
        
    }
    catch (error) { 
        // console.log('error')
        // res.status(500).send(console.log("user exists "))
    }
});
app.post("/login", async (req, res) => { //POST request to handle login
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }); //find user with the given username
  
      if (!user) {
        //If user is not found in database, return error response
       
        return res.status(401).send({ message: "Invalid credentials" });
      }
  
      if (password !== user.password) {
        //If password does not match, return error response
        return res.status(401).send({ message: "Invalid credentials" });
      }
  
      //If credentials are valid, return success response
      res.send({ message: "Login successful" });
  
    } catch (error) {
      res.status(500).send(error);  
    }
  });


//admin page api fetching the data 

const EquipmentModel = require('./models/equipment');

// GET all equipment
app.get('/equipment', async (req, res) => {
  try {
    const equipment = await EquipmentModel.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // prints whwre the local host running or on which port it is serving us  
  });