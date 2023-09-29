const Counter = require("../models/counter");

async function getCUDStats(req,res){
    try{
        const counter = await Counter.findOne({});
        res.json(counter);
    }catch(err){
        res.status(500).json({error:err});
    }
}

module.exports = {
    getCUDStats
}