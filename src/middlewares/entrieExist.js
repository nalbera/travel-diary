const {Entries} = require('../database/config/db');

const entrieExist = async (req,res,next) => {

    const { id } = req.params;

    try {
        
        const entrie = await Entries.findByPk(id)

        if(!entrie) return res.status(404).send('Entry does not exist');

        next();

    } catch (error) {
        console.log(error, 'entrieExist');
    }
}

module.exports = entrieExist;