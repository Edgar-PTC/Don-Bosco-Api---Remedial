const HTMLRecoveryEmail = (Code, name, lastname) => {
    // Generar cada dígito como celda de tabla
    const codeDigits = [...Code].map(letter => `
        <td style="background-color: rgba(47, 55, 61, 0.269); padding: 15px 20px; border-radius: 20px; font-size: 50px; text-align: center; font-weight: bold;">
            ${letter}
        </td>
    `).join('');

    return `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; font-family: Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #286e5a;">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: aliceblue; border-radius: 30px; padding: 20px;">
                                <tr>
                                    <td style="padding: 40px 30px; text-align: center;">
                                        <h2 style="font-size: 32px; margin: 0 0 20px 0; color: #333;">Código de Verificación</h2>
                                        
                                        <p style="font-size: 16px; line-height: 1.5; color: #555; margin: 0 0 30px 0;">
                                            Hola ${name} ${lastname}.<br>
                                            Estamos a punto de terminar con el proceso de recuperación de contraseña, solo debemos verificar tu correo.<br>
                                            Ingresa el siguiente código para completar el proceso:
                                        </p>                                    
                                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 30px auto;">
                                            <tr style="display: flex; flex-direction: row; gap: 5px">
                                                ${codeDigits}
                                            </tr>
                                        </table>
                                        
                                        <p style="font-size: 11px; color: #999; margin: 40px 0 0 0;">
                                            Este correo es enviado de forma automática. Favor de no responder.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}

export default HTMLRecoveryEmail;