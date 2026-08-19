import nodemailer from "nodemailer";

export async function sendemail(email,params) {
   /* const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    try {
    
        const info = await transporter.sendMail({
            from: "support.selfmedi@gmail.com",
            to: email,
            subject: "Bem-vindo",
            text: `Seu cadastro foi realizado com sucesso. Seu pac(Usuario) é: ${params}. Não compartilha com 
            niguem, mantenha-o seguro. Use o pac para fazer login da sua conta.`,
        });

        //console.log("Email enviado!");
       // console.log(info.response);

    } catch (err) {
        console.error("Erro:", err);
    }*/

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    await transporter.verify();

    console.log("SMTP funcionando!");

}


