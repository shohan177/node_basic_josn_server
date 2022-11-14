import http from 'http';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

//environment init
dotenv.config()
const PORT = process.env.SERVER_PORT;


//data management 
const student_json = readFileSync('./data/student.json');
const student_obj = JSON.parse(student_json);

http.createServer((req, res) => {

    //Routing
    if (req.url == '/api/student' && req.method == 'GET') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(student_json);

    } else if (req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'GET') {
        let id = req.url.split('/')[3];


        res.writeHead(200, { 'Content-Type': 'application/json' });

        if (student_obj.some(item => item.id == id)) {
            res.end(JSON.stringify(student_obj.find(item => item.id == id)));
        } else {
            res.end(JSON.stringify({
                message: 'student-not-found'
            }));
        }



    } else if (req.url == '/api/addStudent' && req.method == 'POST') {

        let body = "";

        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', () => {
            console.log(body)
        });


        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'bacon'
        });

        res.end(JSON.stringify({
            message: 'this is post message'
        }));


    } else {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: 'Invalid url'
        }));

    }

}).listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});