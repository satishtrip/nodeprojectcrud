const { Router } = require('express');
const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const team  = require('../models/team');
// router.get('/',(req, res, next) =>{
//     res.send('Express is working bro');
// })



// Reads Data From The Database and Showcases at the front end
router.get('/',(req, res, next)=>{

    team.find((err, docs)=>{
        res.render('home.ejs',{teams: docs});    
    }).catch(err=>{
        console.log("something went wrong")
    })
  
})

// Route to add contents into the database
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

// Route to show the updated content once the data has been updated.
router.get('/edit/:id',(req, res, next)=>{
    console.log(req.params.id);
    team.findOneAndUpdate({_id: req.params.id}, req.body,{new:true}, (err, docs)=>{
        if(err){
            console.log("CANT RETRIEVE DATA TO EDIT");
        }else{
            res.render('edit', {team: docs});
        }

    });
})
// Route to update the contents of the data present in the datanbase
router.post('/edit/:id',(req, res, next)=>{
    console.log(req.params.id);
    team.findByIdAndUpdate({_id: req.params.id},req.body,(err, docs)=>{
        if(err){
            console.log("Something went wrong");
            next(err)  
        }else{
            res.redirect('/');
        }
    })
})

router.get('/delete/:id',(req, res, next)=>{
    team.findByIdAndDelete({_id:req.params.id}, err=>{
        if(err){
            console.log("Something went wrong");
            next(err);
        }else{
            res.redirect('/');
        }
    });
})
module.exports = router;