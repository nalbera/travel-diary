const { Photos } = require('../../database/config/db');
const loadPhoto = require('../../services/loadPhoto');

const addEntryPhoto = async (req,res) => {
    const { id } = req.params;

    try {
        const {count, rows} = await Photos.findAndCountAll({
            where: {
                entry_id: id
            }
        });

        if(count >= 3) return res.status(403).send('You cannot upload more photos to this entry, it already has 3');
        
        let savedPhoto;
        
        if(req.files && Object.keys(req.files).length > 0){
        
            savedPhoto = await loadPhoto(Object.values(req.files)[0]);

            await Photos.create({
                photo: savedPhoto,
                entry_id: id
            })
        }
        
        res.status(200).send({
            status: 'OK',
            data:{
                photo: savedPhoto
            }
        });

    } catch (error) {
        console.log(error);
    }
}


module.exports = addEntryPhoto;