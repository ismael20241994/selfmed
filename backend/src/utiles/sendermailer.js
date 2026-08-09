import nodemailer from "nodemailer";

export async function sendemail(email,params) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "support.selfmedi@gmail.com",
            pass: "rvarspxrzukbwxjv",
        },
    });

    try {
    
        const info = await transporter.sendMail({
            from: "support.selfmedi@gmail.com",
            to: "deazevedoismael0@gmail.com",
            subject: "Bem-vindo",
            text: `Seu cadastro foi realizado com sucesso. Seu pac é: ${params}. Não compartilha com 
            niguem, mantenha-o seguro. Use o pac para fazer login na sua conta.`,
        });

        //console.log("Email enviado!");
       // console.log(info.response);

    } catch (err) {
        console.error("Erro:", err);
    }
}


