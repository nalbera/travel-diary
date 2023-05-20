const { Photos } = require('../../database/config/db');
const deletePhotos = require('../../services/deletePhotos');
const { Op } = require('sequelize');

const deleteEntryPhoto = async (req,res) => {

    const { id, photoID } = req.params;

    try {
        
        const currentPhoto = await Photos.findAll({
            attributes: ['photo'],
            where:{
                [Op.and]:[
                    {id: photoID},
                    {entry_id: id}
                ]
            }
        });

        if(currentPhoto.length == 0) return res.status(404).send('The photo does not exist');

        await deletePhotos(currentPhoto[0].photo);

        await Photos.destroy({
            where:{
                [Op.and]:[
                    {id: photoID},
                    {entry_id: id}
                ]
            }
        });

        res.status(200).send({
            status: 'OK',
            message: 'Deletd photo'
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteEntryPhoto;