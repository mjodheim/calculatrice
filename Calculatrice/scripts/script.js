/* On commence par récupérer les éléments */
let display = document.getElementById("display");

let numbers = document.querySelectorAll(".btn-number");
let operators = document.querySelectorAll(".btn-operator");

let equal = document.getElementById("btn-equal");
let clear = document.getElementById("btn-clear");
let point = document.getElementById("btn-point");

let lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
let result = 0; // le résultat incrémentiel
let lastNumber = ''; // le dernier nombre
let lastOperator = ''; // le dernier opérateur utilisé afin de calculer la somme totale
let counter = 0;

/* Affichage des nombres */
// Attention à la valeur de départ et à bien concaténer

numbers.forEach(number => {
    number.addEventListener("click", function() {
        if(display.textContent === '0'){
            display.textContent = number.textContent;
            lastNumber += number.textContent;
        }
        else{
            display.textContent += number.textContent;
            lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
            lastNumber += number.textContent;
        }
    })
})

/* Affichage des opérateurs avec vérification double opération */

operators.forEach(operator => {
    operator.addEventListener("click", function() {
        if("+-*/.".includes(lastDigit)) {
            return;
        }
        if(counter === 0){
            result = parseFloat(display.textContent);
        }
        else{
            switch(lastOperator) {
                case "-":
                    result -= parseFloat(lastNumber);
                    break;
                case "+":
                    result += parseFloat(lastNumber);
                    break;
                case "*":
                    result *= parseFloat(lastNumber);
                    break;
                case "/":
                    result /= parseFloat(lastNumber);
                    break;
                default:
                    display.textContent = 'ERROR';
                    break;
            }
        }
        lastOperator = operator.textContent;
        display.textContent += operator.textContent;
        lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
        lastNumber = '';
        counter ++;
    })
})

/* Comportement de la virgule */

point.addEventListener("click", function() {
    if(".+-*/".includes(lastDigit)) {
        return;
    }
    display.textContent += point.textContent;
    lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
    lastNumber += '.';
})

/* Comportement du bouton Clear */

clear.addEventListener("click", function() {
    result = 0;
    lastNumber = '';
    lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
    display.textContent = "0";
})

/* Comportement du bouton de résultat. Pour le moment, on efface le display pour afficher le résultat */

equal.addEventListener("click", function() {
    switch(lastOperator) {
        case "-":
            result -= parseFloat(lastNumber);
            break;
        case "+":
            result += parseFloat(lastNumber);
            break;
        case "*":
            result *= parseFloat(lastNumber);
            break;
        case "/":
            result /= parseFloat(lastNumber);
            break;
        default:
            display.textContent = 'ERROR';
            break;
    }

    display.textContent = result.toString();
    console.log(lastNumber);
    /* Remise à zéro */
    lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
    result = 0;
    lastNumber = '';
    lastOperator = '';
    counter = 0;
})