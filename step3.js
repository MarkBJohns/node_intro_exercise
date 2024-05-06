console.debug("Step 3");
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
            handleReadOrWrite(data, output)
        }
    })
}

async function webCat(url) {
    try {
        let response = await axios.get(url);
        handleReadOrWrite(response.data, output)
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

function handleReadOrWrite(data, output) {
    if (output) {
        fs.writeFile(output, data, 'utf8', function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

let filePath;
let output;

if (process.argv[2] === '--out') {
    output = process.argv[3];
    filePath = process.argv[4];
} else {
    filePath = process.argv[2];
}

if (filePath.slice(0, 4) === 'http') {
    webCat(filePath, output);
} else {
    cat(filePath, output);
}