export const useGenerarCodigosAleatorios = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10; // Longitud del código
    let randomCode = "";
    for (let i = 0; i < length; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const codigo = `${randomCode}369`;
    return codigo;
}