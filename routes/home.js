const { Router } = require('express');
const express = require('express');
const router = express.Router();
const team  = require('../models/team');
// router.get('/',(req, res, next) =>{
//     res.send('Express is working bro');
// })
router.get('/',(req, res, next)=>{
    res.render('home.ejs');
})
router.post('/add',(req, res, next)=>{
    const name = req.body.name;
    const players = req.body.players;
    const coach = req.body.coach;

    console.log(name,players,coach);

    const iplTeam = new team({
        name,
        players,
        coach,
    });
    iplTeam.save((err)=>{
        if(err){
            console.log("Something wwent wrong to save the data into the database");
        }else{
            console.log("Data stored successfully");
            res.redirect('/');
        }
    })

})
module.exports = router;