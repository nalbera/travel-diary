const {v4: uuidv4} = require('uuid');
const path = require('path');
const sharp = require('sharp');

const loadPhoto = async (file) => {
    
    const img = sharp(file.data);
    
    const nameUnique = `${uuidv4()}_${file.name}`;

    await img.toFile(path.join(__dirname, process.env.DIRECTORY_UPLOAD,nameUnique));

    return nameUnique;
}

module.exports = loadPhoto;