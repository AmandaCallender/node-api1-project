//this import is pulling from node_modules now
const express = require("express")
const db = require("./database.js")

const server = express()



server.use(express.json())

server.get("/users", (req, res) => {
    const users = db.getUsers()
    if (users) {
    res.json(users)
    } else {
        res.status(500).json({
            message: "The users information could not be retrieved.",
        })
    }
})

server.get("/users/:id", (req, res) => {
    //the param variable matches up to the name of our URL param above
    const user = db.getUserById(id)
    const id = req.params.id;

    //since were now taking in values from the client,
    //we need to make sure the value is valid before trying to use it
    if (user) {
        res.send(user);
      } else if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.status(500).json({
          message: "The user information could not be retrieved",
        });
      }
    }); 

server.post("/users", (req, res) => {


    if (!req.body.name, !req.body.bio) {
        return res.status(400).json({
            message:"Please provide name and bio for the User",
        })
    }

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })

    res.status(201).json(newUser)
    
})


// server.put("/users/:id", (req, res) => {
//     const id = req.params.id;
//     const user = db.getUserById(id);

//     if (user) {
//       const updatedUser = db.updateUser(user.id, {
//     name: req.body.name || user.name,
//     bio: req.body.bio || user.bio
//     }) 
//     res.status(200).json(updatedUser)}
//     else if (!user) {
//       res.status(404).json({
//         message: "Please provide name and bio for the user.",
//       });
//     } else {
//       res.status(500).json({
//         message: "The user information could not be modified.",
//       });
//     }
//   }); 

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)


    if (user) {
const updatedUser = db.updateUser(user.id, {
    name: req.body.name || user.name,
    bio: req.body.bio || user.bio
})
res.status(200).json(updatedUser)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
    
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
})

server.listen(8080, () => {
    console.log("server started on port 8080")
})