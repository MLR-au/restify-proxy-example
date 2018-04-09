'use strict';

const request = require('request-promise-native');
const fs = require('fs');

async function postImage() {
    const options = {
        method: 'POST',
        uri: `http://localhost:8080/upload`,
        formData: {
            image: fs.createReadStream('photo.jpg')
        }
    };
    const response = await request(options);
    console.log(response);
}

postImage();
