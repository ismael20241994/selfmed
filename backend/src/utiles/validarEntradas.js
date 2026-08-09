import {body, validationResult} from "express-validator";

async function validarUsuario() {
    const validarUsuario = [
        body("usuario")
        .trim()
        .matches(/^[A-Za-zÀ-ÿ\s]{3,}$/)
        .withMessage("Usuário deve conter apenas letras e ter no mínimo 3 caracteres"),

        body("contacto")
        .trim()
        .replace(/[^\d+]/g, "")
        .withMessage("Contaco deve ser apenas digitos"),

        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            next();
        }
    ]
}

export default validarUsuario;