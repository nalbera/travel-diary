const fs = require('fs/promises');
const path = require('path');


const deletePhoto = async (file) => {
    
    const filePath = path.join(__dirname, process.env.DIRECTORY_UPLOAD, file);
    
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.log(error,);
    }
}

module.exports = deletePhoto;