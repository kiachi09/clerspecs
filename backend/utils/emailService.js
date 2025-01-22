// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
// 	host: process.env.EMAIL_HOST,
// 	port: 587,
// 	secure: false,
// 	// secureConnection: false,
// 	// tls: {
// 	//   ciphers: 'SSLv3',
// 	// },
// 	// requiresTLS: true,
// 	// debug: true,
// 	auth: {
// 		user: process.env.EMAIL_USER,
// 		pass: process.env.EMAIL_PASS,
// 	},
// });

// const sendEmail = async (to, subject, text) => {
// 	const mailOptions = {
// 		from: process.env.EMAIL_USER,
// 		to,
// 		subject,
// 		text,
// 	};

// 	console.log('Email process started');

// 	transporter
// 		.sendMail(mailOptions)
// 		.then(() => {
// 			console.log('Email sent successfulyy');
// 		})
// 		.catch(err => {
// 			console.log('Failed to send email');
// 			console.error(err);
// 		});
// };

// export { sendEmail };
