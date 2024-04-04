import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export const mailer = async (emailfrom: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:' glorianiyonkurusinseswa@gmail.com',
      pass: 'ofdqxasjyughafbn',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sendinfo = {
    from: emailfrom,
    to:' glorianiyonkurusinseswa@gmail.com',
    subject: 'This message is sent from contact form',
    html: `<b>${message}</b>`,
  };

  try {
    const sendMail = await transporter.sendMail(sendinfo);
    return sendMail;
  } catch (error:any) {
   console.log(error.message);
  }
};