const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') // '===' means the value and the type should be equal. 
    {
        res.setHeader('Content_Type', 'text/html');
        res.write('<html><head> <title> Nothing Page</title> </head><body> <form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body></html>')
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('messages.txt', message, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        })


    }
    res.setHeader('Content_Type', 'text/html');
    res.write('<html><head> <title> OtherPage</title> </head><body><p1>Hello</p1> </body></html>');
    res.end();
}


// JavaScript Code
// module.exports.reqHandler= requestHandler;
//module.exports.text = 'Some Random Text';
//      or
// module.exports = {
//     reqHandler : requestHandler,
//     someText : 'Some Random Text',
// };

//Node Js Specific Code
exports.reqHandler = requestHandler;