import emailjs from '@emailjs/browser';
const sendEmail = async ({ memberEmail, memberId }) => {
  try {
    console.log(memberEmail);
    console.log(memberId);
    const email = memberEmail.email;
    const memberid = memberId.userId;
    await emailjs
      .send(
        'service_16t7zsg',
        'template_u3dxnzk',
        {
          emailUser: email,
          to_name: memberid,
          from_name: 'iBook system',
        },
        'pTCnFRiO0Hag2m-Cz'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log('error', error.text);
        }
      );
  } catch (error) {
    console.log('sendEmail', error);
  }
};
export default sendEmail;
