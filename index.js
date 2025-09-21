const http = require('node:http');
const fs = require('node:fs/promises');

const hostname = '127.0.0.1';
const port = 8080;

const responses = new Map([
    ["home", {file: "index.html", code: 200}],
    ["about", {file: "about.html", code: 200}],
    ["contact-me", {file: "contact-me.html", code: 200}],
    ["404", {file: "404.html", code: 404}]
]);


function pathToFileMap(path) {
    switch (path) {
        case "/":
            return responses.get("home");
        case "/about":
            return responses.get("about");
        case "/contact-me":
            return responses.get("contact-me");
        default:
            return responses.get("404");
    }
}

async function getHtmlData(path) {
    const responsesObj = pathToFileMap(path);
    const data = await fs.readFile(responsesObj.file, { encoding: "utf8" });
    return { htmlData: data, code: responsesObj.code};
}

const server = http.createServer( async (req, res) => {
    const data = await getHtmlData(req.url);
    res.writeHead(data.code, { "content-type": "text/html"});
    res.end(data.htmlData);
});

server.listen(port, hostname, () => console.log("Server started..."));