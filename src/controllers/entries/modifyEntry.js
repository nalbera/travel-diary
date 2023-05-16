const { Entries } = require('../../database/config/db');

const modifyEntry = async (req,res) => {
    
    const { id } = req.params;
    const { place, description } = req.body;

    try {
        
        if(!place || !description) return res.status(400).send('Missing fields');

        await Entries.update(
            {
                place: place,
                description: description
            },
            {
                where: { id: id }
            }
        );

        res.status(200).send({
            status: 'OK',
            message: 'Post modified successfully'
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = modifyEntry;