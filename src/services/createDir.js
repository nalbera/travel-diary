const fs = require('fs/promises');

const createDir = async (path) => {
    try {
        await fs.access(path);        
    } catch (error) {
        await fs.mkdir(path);
    }
}

module.exports = createDir;