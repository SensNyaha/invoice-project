const hasNumber = (password) => new RegExp(/.*[0-9]+.*/).test(password);

const hasMixedLetters = (password) => new RegExp(/.*[a-z]+.*/).test(password) && new RegExp(/.*[A-Z]+.*/).test(password);

const hasSpecial = (password) => new RegExp(/.*[!#@$%^&*()+=._-]+.*/).test(password);

const isEnough = (password) => new RegExp(/.{6,11}/).test(password);

const isHeavy = (password) => new RegExp(/.{12,}/).test(password);

export const strengthColor = (password) => {
    if (!isEnough(password)) return {label: "Недостаточная длина", color: "#ce0e0e"};
    if (!hasMixedLetters(password)) return {label: "Нет букв разного регистра", color: "#ff5100"};
    if (!hasNumber(password)) return {label: "Нет цифр", color: "#ff9100"};
    if (!hasSpecial(password)) return {label: "Нет спец.символов", color: "#ffd000"};
    if (!isHeavy(password)) return {label: "Нууу.. подойдет", color: "#d0ff00"};
    
    return {label: "Супер!", color: "#33ff00"};
}