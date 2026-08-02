const { Location }= require('../models/Location')

// ----------- creating the Location record in Location Collection
async function createLocation(req, res){
    try{
        const {name, state, pincode} = req.body;
        const loaction = await Location.create({name, state, pincode});
        res.json(loaction).status(201);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

module.exports = {
    createLocation
}