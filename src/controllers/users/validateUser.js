const {Users} = require('../../database/config/db');

const validateUser = async (req,res) => {
    const { regCode } = req.params;

    try {
        
        const user = await Users.findOne({
            attributes: ['id'],
            where:{
                regCode
            }
        });

        if(!user) return res.status(404).send('No user with this validation code');

        await Users.update(
            {
                active: true,
                regCode: null
            },
            {
                where: {
                    regCode
                }
            }
        );
        
        res.status(200).send({
            status: 'OK',
            message: 'Validated user',
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = validateUser;