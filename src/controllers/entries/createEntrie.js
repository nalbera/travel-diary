const {Entries, Photos} = require('../../database/config/db');
const loadPhoto = require('../../services/loadPhoto');

const createEntrie = async (req,res) => {
    const {place, description} = req.body;
    try {
        
        if(!place) return res.status(400).send('The "place" field is required');

        const result = await Entries.create(
            {
                place: place,
                description: description,
                user_id: req.userInfo.id
            }
        );
        
        const { id } = result;
        
        if(req.files && Object.keys(req.files).length > 0){
            for(let photo of Object.values(req.files).slice(0,3)){
                const img = await loadPhoto(photo);
                await Photos.create(
                    {
                        photo: img,
                        entry_id: id
                    }
                );
            }
        }

        res.status(200).send({
            status: 'OK',
            message: `Entry (${id}) created`,
            data: result
        });

    } catch (error) {
        
    }
}

module.exports = createEntrie;