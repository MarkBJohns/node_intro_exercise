console.debug("Step 2");
// ==============================================================
//      REQUIREMENTS
// ==============================================================

const fs = require('fs');
const process = require('process');
const axios = require('axios');

// --------------------------------------------------------------

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            console.log(data);
        }
    })
}

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

let search = process.argv[2];

if (search.slice(0, 4) === 'http') {
    webCat(search);
} else {
    cat(search);
}