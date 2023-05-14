const {Users} = require('../../database/config/db');

const deleteUser = async (req,res) => {
    const {id} = req.params;

    try {
        
        if(req.userInfo.id !== parseInt(id) && req.userInfo.role !== 'admin'){
            return res.status(403).send('You do not have permissions to delete this user');
        }

        await Users.update(
            {
                name: "deleted",
                password: "deleted",
                avatar: null,
                lastAuthUpdate: new Date(),
                active: 0,
                deleted: 1
            },
            {
                where: { id }
            }
        );

        res.status(200).send({
            status: 'OK',
            message: `The user with id: ${id} removed`
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteUser;