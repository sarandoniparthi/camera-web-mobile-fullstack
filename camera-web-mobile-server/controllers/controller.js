const nodemailer = require('nodemailer');
exports.sendEmail = (req, res) => {
    res.send(req.body);

    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: '*****@gmail.com', // gmail user
                pass: '********' //  gmail account password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'saran <saran.doniparthi@gmail.com>', // sender address
            to: 'saran.doniparthi@gmail.com', // list of receivers 
            subject: 'Camera-Web-Mobile ', // Subject line
            html: '<b>POC For Camera-Web-Mobile</b>', // html body
            attachments: [{   // data uri as an attachment
                filename: 'camera-web-mobile',
                path: req.body.file            
            }]
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
                transporter.close();
            }
            console.log('Message sent: %s', info.messageId);
            transporter.close();
        });
    });


}





