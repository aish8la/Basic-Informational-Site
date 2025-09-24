require('dotenv').config();
const fs = require('fs/promises');
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

const files = new Map([
    ["/", {file: "index.html", code: 200}],
    ["/about", {file: "about.html", code: 200}],
    ["/contact-me", {file: "contact-me.html", code: 200}],
    ["404", {file: "404.html", code: 404}]
]);

async function getFileData(path) {
    try {
        return data = await fs.readFile(files.get(path).file, { encoding: 'utf8' });
    } catch (error) {
        console.log("File Not Found");
    }
}

async function middleWare(req, res) {
    const path = req.path;
    const data = await getFileData(path);
    res.status(200).send(data);
}

app.route('/').get(middleWare);
app.route('/about').get(middleWare);
app.route('/contact-me').get(middleWare);

app.use( async (req, res, next) => {
    const data = await getFileData("404");
    res.status(404).send(data);
});

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server is listening on port  ${PORT}`);
});