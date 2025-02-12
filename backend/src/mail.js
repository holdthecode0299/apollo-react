const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_POST,
    auth: {
        user: process.env.USER,
        pass: process.env.MAIL_PASS, 
    },  

})

const makeANiceEmail = text => `
    <div className="email" style="
    border: 1px solid black; 
    padding: 20px; 
    font-family: sans-serif;
    font-size:20px;
    "> 
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>:), Nancy </p>
    </div>
`;

exports.transport = transport; 
exports.makeANiceEmail = makeANiceEmail;