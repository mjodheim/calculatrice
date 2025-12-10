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
        lastOperator = operator.textContent;
        // Calculer le résultat en fonction de l'opérateur
        switch(lastOperator) {
            case "-":
                result -= parseInt(lastNumber);
                break;
            case "+":
                result += parseInt(lastNumber);
                break;
            case "*":
                result *= parseInt(lastNumber);
                break;
            case "/":
                result /= parseInt(lastNumber);
                break;
            default:
                display.textContent = 'ERROR';
        }
        
        console.log(result);
        
        display.textContent += operator.textContent;
        // mise à jour de lastValue
        lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
        lastNumber = '';
    })
})

/* Comportement de la virgule */

point.addEventListener("click", function() {
    if(".+-*/".includes(lastDigit)) {
        return;
    }
    display.textContent += point.textContent;
    lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
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
            result -= parseInt(lastNumber);
            break;
        case "+":
            result += parseInt(lastNumber);
            break;
        case "*":
            result *= parseInt(lastNumber);
            break;
        case "/":
            result /= parseInt(lastNumber);
            break;
        default:
            display.textContent = 'ERROR';
    }
    display.textContent = result.toString();
    lastDigit = display.textContent.substring(display.textContent.length - 1, display.textContent.length);
    lastNumber = result.toString();
    // On change l'opérateur pour pouvoir remettre l'affichage à '0' au prochain clic sur un nombre
    lastDigit = '=';
})