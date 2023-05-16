const {Entries, Photos, Votes} = require('../../database/config/db');
const deletePhotos = require('../../services/deletePhotos');

const deleteEntrie = async (req,res) => {

    const { id } = req.params;

    try {
        
        const photos = await Photos.findAll({
            attributes: ['photo'],
            where: {
                entry_id: id
            }
        });
        
        await Photos.destroy({where: {entry_id: id}});

        for(let file of photos){
            await deletePhotos(file.photo);
        }

        await Votes.destroy({where: {entry_id: id}});

        await Entries.destroy({where: {id: id}});

        res.status(200).send({
            status: 'OK',
            message: `The entry with id ${id} and all its related elements were deleted from the system`
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteEntrie;