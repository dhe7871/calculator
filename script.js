//Variable Declarations
const e = "2.71828182845";
const π = "3.14159265359";
const tol = 0.000000001;
const brackets = { p: ["(", ")"], b: ["[", "]"], m: ["{", "}"], n: [] };

/*importing html elements*/
let standard = document.getElementById("standard");
let scientific = document.getElementById("scientific");
let menubtn = document.getElementById("menubtn");
var dropiobtn = document.getElementById("dropiobtn");
let inputbox = document.getElementById("inputbox");
var display = document.getElementById("display");

//defining initial states for some parameters and variables
var menu_cond = false;
var dropiobtn_cond = false;
var deg = true;
var ndec = 4;
var func;
var calcStr = "";
var dispStr = "";
let root = false;

//if menu button is being clicked, toggle the menu bar
menubtn.onclick = function () {
    if (!menu_cond) {
        document.getElementById("menu").style.top = "0";
        document.getElementById("menu").style.left = "0";
        menu_cond = true;
    } else {
        document.getElementById("menu").style.top = "0";
        document.getElementById("menu").style.left = "-100%";
        menu_cond = false;
    }
};
//toggling the calculator to show Standard or Scientific right to the menu icon
standard.onclick = function () {
    document.getElementById("heading").innerText = "Standard";
    document.getElementById("menu").style.left = "-100%";
    v = false;
};
scientific.onclick = function () {
    document.getElementById("heading").innerText = "Scientific";
    document.getElementById("menu").style.left = "-100%";
    v = false;
};

dropiobtn.onclick = function () {
    let iotas = document.getElementsByClassName("iotabtn");
    let anglebtn = document.getElementsByClassName("anglebtn");

    if (!dropiobtn_cond) {
        anglebtn[0].style.display = "flex";
        dropiobtn.style.border = "2px solid rgb(79, 179, 237)";
        dropiobtn.style.borderTopRightRadius = "4px";
        dropiobtn.style.borderBottomRightRadius = "4px";
        dropiobtn.style.backgroundColor = "rgba(174, 174, 174, 0.699)";

        dropiobtn_cond = true;
    } else {
        dropiobtn.style.border = "0";
        dropiobtn.style.borderLeft = "1px solid grey";
        dropiobtn.style.backgroundColor = "rgba(128, 128, 128, 0.676)";
        anglebtn[0].style.display = "none";

        dropiobtn_cond = false;
    }
};

//Alerting in the begining what keys are working and what not
alert(
    "some of the keys have not been set, as i wanted to make it better.\nThe regular Calculator functions are working fine.\n but some keys are not\nlist of keys not working:\n1. HYPE\n2. INV\n3. 2nd\n4. x^2\n5. x^(1/2)\n6. x^y\n7. 10^x\n8. |x|\n9. +/-\n10. i (actually, i wanted it to make complex calculation as well)\n9. and the Buttons inside menu also not working."
);
function abs(x) {
    return x >= 0 ? x : -x;
}

//function to calculate power needs a revision
function power(x, y) {
    if (parseInt(y) === y) {
        let prod = 1;
        for (let i = 0; i < abs(y); i++) {
            prod *= x;
        }
        return y >= 0 ? prod : 1 / prod;
    } else if (abs(x) === x) {
        return exp(y * nlog(x));
    } else {
        return "Undefined";
    }
}

//function to evaluate the log10 of a number 0 < x < infinity
function nlog(x) {
    if (x <= 0) return "Undefined";

    let n = 0;
    let temp = x;
    while(abs(temp) > 1){
        temp /= e;
        n++;
    }

    let sum = 0;
    let term = -1;
    for (let i = 0; abs(term) > tol; i++) {
        term *= -(temp - 1) / (i + 1);
        sum += term;
        term *= (i + 1);
    }
    return sum + n;
}

function log10(x) {
    return nlog(x) / nlog(10);
}

function exp(x) {
    let sum = 1;
    let term = 1;
    for (let i = 1; abs(term) > tol; i++) {
        term *= x / i;
        sum += term;
    }
    return sum;
}

//function to calculate the factorial of an number
function factorial(x) {
    if (parseInt(x) != parseFloat(x)) return "Undefined";

    let prod = 1;
    for (let i = 1; i <= x; i++) {
        prod *= i;
    }
    return prod;
}

//function to calculate the round off value of an floating point number to the n decimal place
function roundoff_n(x, n) {
    let val = x * power(10, n);
    if (x < 0) {
        if (val > Math.floor(val) + 0.5) {
            return Math.ceil(val) / power(10, n);
        } else {
            return Math.floor(val) / power(10, n);
        }
    } else {
        if (val > Math.floor(val) + 0.5) {
            return Math.ceil(val) / power(10, n);
        } else {
            return Math.floor(val) / power(10, n);
        }
    }
}

//function to truncate an floating point number till nth decimal place
function trunc_n(x, n) {
    let i;

    x = x.toString();
    for (i = 0; i < x.length; i++) {
        if (x[i] == ".") break;
    }

    if (i + n <= x.length - 1) {
        x = x.slice(0, i + n + 1);
    }

    return parseFloat(x);
}

//function to reverse a string
function reverseStr(str) {
    let newStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str[i];
    }
    console.log(newStr);
    return newStr;
}

//function to erase or backspacign in the display of the calculator
function backspace() {
    if (dispStr.length != 0) {
        console.log(dispStr);
        dispStr = dispStr.slice(0, dispStr.length - 1);
        calcStr = calcStr.slice(0, calcStr.length - 1);

        display.firstElementChild.innerText = dispStr;
    }
}

//function to clear the calculator screen in the display region
function clearScreen() {
    // let display=document.getElementById('display');
    display.innerHTML = "<div></div>";
    calcStr = "";
    dispStr = "";
}

//printing the results in the display of the calculator
function printing(a) {
    display.firstElementChild.innerText += a.innerText;
    if (a.innerText != "=") {
        calcStr += a.innerText;
        dispStr += a.innerText;
        console.log(dispStr);
    } else {
        display.firstElementChild.style.color = "grey";
        display.firstElementChild.style.fontSize = "2rem";
    }
}

let gifb = 0;
let modb = 0;
//the block of code which inport all the input button in the calculator and check wheather, if any button has been clicked
//if yes, then it appends the appropriates characters in the 'clacStr' to evaluate it later
for (let value of document.getElementsByClassName("inputbtn")) {
    let a = value;
    // console.log(a.innerText);
    a.onclick = function () {
        if (/^[0-9]$/.test(a.innerText)) {
            printing(a);
        } else {
            switch (a.innerText) {
                case "+":
                case "-":
                case "*":
                case "/":
                case "(":
                case ")":
                case ".":
                    printing(a);
                    break;

                case "e":
                    dispStr += "e";
                    calcStr += "e";
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "π":
                    dispStr += "π";
                    calcStr += "π";
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "x\ny":
                    dispStr += "^";
                    calcStr += "^";
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "x\n2":
                    // display.firstElementChild.innerText = dispStr + "^2=";
                    // dispStr = power(eval(calcStr), 2).toString();
                    // calcStr = dispStr;
                    // let newdivsq = document.createElement('div');
                    // newdivsq.innerHTML = `<div>${dispStr}</div>`;
                    // display.insertAdjacentHTML('afterbegin', newdivsq.innerHTML);
                    // break;

                    dispStr += "^2";
                    calcStr += "^2";
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "10\nx":
                    console.log("comes here");
                    dispStr += "10^";
                    calcStr += "10^";
                    console.log(dispStr);
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "√x":
                    // display.firstElementChild.innerText = "√" + dispStr + "=";
                    // dispStr = Math.sqrt(eval(calcStr)).toString();
                    // calcStr = dispStr;
                    // let newdivsqrt = document.createElement('div');
                    // newdivsqrt.innerHTML = `<div>${dispStr}</div>`;
                    // display.insertAdjacentHTML('afterbegin', newdivsqrt.innerHTML);
                    // break;

                    dispStr += "√(";
                    calcStr += "√(";
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "[ x ]":
                    // display.firstElementChild.innerText = "[ " + dispStr + " ]=";
                    // dispStr = parseInt(eval(calcStr)).toString();
                    // calcStr = dispStr;
                    // let newdivgre = document.createElement('div');
                    // newdivgre.innerHTML = `<div>${dispStr}</div>`;
                    // display.insertAdjacentHTML('afterbegin', newdivgre.innerHTML);
                    // break;

                    gifb = (gifb + 1) % 2;
                    if (gifb) {
                        dispStr += "[";
                        calcStr += "[";
                    } else {
                        dispStr += "]";
                        calcStr += "]";
                    }
                    display.firstElementChild.innerText = dispStr;
                    break;

                //yet to complete

                case "| x |":
                    // display.firstElementChild.innerText = "| " + dispStr + " |=";
                    // dispStr = absolute(eval(calcStr)).toString();
                    // calcStr = dispStr;
                    // let newdivabs = document.createElement('div');
                    // newdivabs.innerHTML = `<div>${dispStr}</div>`;
                    // display.insertAdjacentHTML('afterbegin', newdivabs.innerHTML);
                    // break;

                    modb = (modb + 1) % 2;
                    dispStr += "|";

                    if (modb) {
                        calcStr += "{";
                    } else {
                        calcStr += "}";
                    }
                    display.firstElementChild.innerText = dispStr;
                    break;
                //yet to complete

                case "( 1/x )":
                    dispStr +=
                        a.innerText.slice(0, 1) + a.innerText.slice(2, 4);
                    calcStr +=
                        a.innerText.slice(0, 1) + a.innerText.slice(2, 4);
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "n!":
                    dispStr += a.innerText.slice(1);
                    calcStr += a.innerText.slice(1);
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "log":
                case "ln":
                case "sin":
                case "cos":
                case "tan":
                case "cot":
                case "cosec":
                case "sec":
                    dispStr += a.innerText + "(";
                    calcStr += a.innerText + "(";
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "i":
                    dispStr += a.innerText;
                    calcStr += a.innerText;
                    display.firstElementChild.innerText = dispStr;
                    break;

                case "=":
                    printing(a);
                    process();
                    calculate();
                    break;

                case "backspace":
                    backspace();
                    break;

                case "CE":
                    clearScreen();
                    break;
            }
        }
    };
}

//This is the second main function, which tells the program to which values are to evaluate and evalute them and return
function evaluate(func, arg1, arg2, start, end) {
    let argT;
    let mainStr = calcStr;
    let value;

    calcStr = mainStr.slice(0, start);

    if (arg1.includes("Undefined")) {
        calcStr += "Undefined";
    } else {
        console.log(arg1);
        arg1 = parseFloat(eval(arg1)); //float value of arg
        argT = deg ? (arg1 * π) / 180 : arg1; //float value for the argument of trig functions

        console.log(argT);

        console.log(
            "func: " +
                func +
                " arg1: " +
                arg1 +
                "arg2: " +
                arg2 +
                " startingIndex: " +
                start +
                " endIndex: " +
                end
        );

        switch (func) {
            case "(":
                calcStr += arg1;
                break; //returning change in length in the calcStr string;

            case "[":
                calcStr += parseInt(arg1);
                break;

            case "{":
                calcStr += Math.abs(arg1);
                break;

            case "sin":
                let sin = Math.sin(argT).toString();

                console.log(sin);
                for (value of sin) {
                    if (value == "e") {
                        calcStr += "0";
                        break;
                    }
                }

                if (value == "e") break;

                calcStr += sin;
                break;

            case "cos":
                let cos = Math.cos(argT).toString();

                console.log(cos);
                for (value of cos) {
                    if (value == "e") {
                        calcStr += "0";
                        break;
                    }
                }

                if (value == "e") break;

                calcStr += cos;
                break;

            case "tan":
                let tan = Math.sin(argT) / Math.cos(argT);

                if (Math.cos(argT) == 0) {
                    calcStr += "Undefined";
                } else {
                    for (value of Math.cos(argT).toString()) {
                        if (value == "e") {
                            calcStr += "Undefined";
                            break;
                        }
                    }
                    if (value == "e") break;

                    tan = tan.toString();
                    for (value of tan) {
                        if (value == "e") {
                            calcStr += "0";
                            break;
                        }
                    }
                    if (value == "e") break;

                    calcStr += tan;
                }

                break;

            case "cot":
                let cot = Math.cos(argT) / Math.sin(argT);

                if (Math.sin(argT) == 0) {
                    calcStr += "Undefined";
                } else {
                    for (value of Math.sin(argT).toString()) {
                        if (value == "e") {
                            calcStr += "Undefined";
                            break;
                        }
                    }
                    if (value == "e") break;

                    cot = cot.toString();
                    for (value of cot) {
                        if (value == "e") {
                            calcStr += "0";
                            break;
                        }
                    }
                    if (value == "e") break;

                    calcStr += cot;
                }

                break;

            case "sec":
                let sec = 1 / Math.cos(argT);

                if (Math.cos(argT) == 0) {
                    calcStr += "Undefined";
                } else {
                    for (value of Math.cos(argT).toString()) {
                        if (value == "e") {
                            calcStr += "Undefined";
                            break;
                        }
                    }
                    if (value == "e") break;

                    sec = sec.toString();
                    for (value of sec) {
                        if (value == "e") {
                            calcStr += "0";
                            break;
                        }
                    }
                    if (value == "e") break;

                    calcStr += sec;
                }

                break;

            case "cosec":
                let cosec = 1 / Math.sin(argT);

                if (Math.sin(argT) == 0) {
                    calcStr += "Undefined";
                } else {
                    for (value of Math.sin(argT).toString()) {
                        if (value == "e") {
                            calcStr += "Undefined";
                            break;
                        }
                    }
                    if (value == "e") break;

                    cosec = cosec.toString();
                    for (value of cosec) {
                        if (value == "e") {
                            calcStr += "0";
                            break;
                        }
                    }
                    if (value == "e") break;

                    calcStr += cosec;
                }

                break;

            case "!":
                if (parseInt(arg1) != parseFloat(arg1)) {
                    alert(
                        "The factorial of an float number is not possible.\nPlease enter valid expression...."
                    );
                    calcStr += "Undefined";
                    break;
                }

                let fact = factorial(arg1);
                fact = fact.toString();
                calcStr += fact;
                break;

            case "log":
                if (arg1 < 0) {
                    alert(
                        "The argument for the logrithm has to be > 0.\nPlease enter valid expression...."
                    );
                    calcStr += "Undefined";
                    break;
                }

                calcStr += log10(arg1).toString();
                break;

            case "ln":
                if (arg1 < 0) {
                    alert(
                        "The argument for the logrithm has to be > 0.\nPlease enter valid expression...."
                    );
                    calcStr += "Undefined";
                    break;
                }

                calcStr += arg1 == "e" ? "1" : nlog(arg1).toString();
                break;

            //after this start making and correcting following functions to evaluate;
        }
    }

    calcStr += mainStr.slice(end + 1);
    return mainStr.length - calcStr.length;
}

//the main function of the code, the brain...
//in this function we process the 'calcStr' string and calculate this string and,
//returns the result in the display of the calculator
// function calculate() {
//     let i, j, k;
//     let bCount = 0;
//     dispStr = dispStr.toLowerCase();
//     console.log("checking Uppercase:" + dispStr);

//     for (i = 0; i < dispStr.length; i++) {
//         let arg = "", tfunc = "";
//         if (dispStr.slice(i, i + 1) == "(") {
//             bCount++;
//             console.log("bCount: " + bCount);
//         }
//         if (dispStr.slice(i, i + 1) == ")") {
//             if (--bCount >= 0) {
//                 console.log("bCount: " + bCount);
//                 for (j = i; dispStr.slice(j - 1, j) != "("; j--) {
//                     arg += dispStr.slice(j - 1, j);
//                     console.log("old argument fetching: " + arg);
//                 }
//                 console.log("argloop Over")
//                 arg = reverseStr(arg);
//                 console.log("new argument fetching : " + arg);

//                 if (j > 1) {
//                     if ((dispStr.slice(j - 2, j - 1) >= 'a' && dispStr.slice(j - 2, j - 1) <= 'z') && dispStr.slice(j - 2, j - 1) != "e") {
//                         for (k = j - 1; dispStr.slice(k - 1, k) >= 'a' && dispStr.slice(k - 1, k) <= 'z'; k--) {
//                             tfunc += dispStr.slice(k - 1, k);
//                         }
//                         console.log("old tfunc:" + tfunc);
//                         tfunc = reverseStr(tfunc);
//                         console.log("new tfunc:" + tfunc);
//                         i = k - 1 + evaluate(tfunc, arg, k, i);
//                         console.log("evaluate after: " + dispStr);

//                     }
//                     else if (j > 3) {
//                         if (dispStr.slice(j - 4, j - 3) == '\n') {
//                             for (k = j - 4; dispStr.slice(k - 1, k) >= 'a' && dispStr.slice(k - 1, k) <= 'z'; k--) {
//                                 tfunc += dispStr.slice(k - 1, k);
//                             }
//                             tfunc += "\n-1"
//                             console.log("control coming here");
//                             i = k - 1 + evaluate(tfunc, arg, k, i);
//                         }
//                     }

//                 }
//                 console.log("i = " + i);
//                 if (dispStr.slice(i + 1, i + 2) == "!" && dispStr.slice(i, i + 1) == ")") {
//                     console.log("control reaching evaluate function in fact calc executing for factorial just after )");
//                     if (parseFloat(eval(arg)) == parseInt(eval(arg))) {
//                         tfunc = "!";

//                         i = j - 2 + evaluate(tfunc, arg, j - 1, i + 1);
//                     } else {
//                         alert("factorial of a FLOAT number not defined!!!");
//                         clearScreen();
//                         return;
//                     }
//                 }
//             } else {
//                 alert("Include proper brackets!!!");
//                 clearScreen();
//                 return;
//             }
//         }
//         if (dispStr.slice(i, i + 1) == "!" && i == "0") {
//             alert("Syntax Warning!!!");
//             clearScreen();
//             return;
//         }
//         if (i != 0) {
//             console.log(arg);
//             if (dispStr.slice(i, i + 1) == "!" && dispStr.slice(i - 1, i) >= "0" && dispStr.slice(i - 1, i) <= "9") {
//                 let match = false;
//                 tfunc = "!";
//                 for (j = i; j > 0; j--) {
//                     let arr = ["(", "+", "-", "*", "/"];
//                     for (let value of arr) {
//                         if (value == dispStr.slice(j - 1, j)) {
//                             match = true;
//                             break;
//                         }
//                     }
//                     if (!match) {
//                         arg += dispStr.slice(j - 1, j);
//                     } else {
//                         break;
//                     }
//                 }
//                 arg = reverseStr(arg);
//                 if (parseFloat(eval(arg)) == parseInt(eval(arg))) {
//                     tfunc = "!";

//                     i = j - 1 + evaluate(tfunc, arg, j, i);
//                 } else {
//                     alert("factorial of a FLOAT number not defined!!!");
//                     clearScreen();
//                     return;
//                 }
//             }
//         }

//     }
//     console.log(bCount);
//     console.log(dispStr + " :before bCount final check")
//     if (bCount) {
//         alert("Please include proper brackets!!!");
//         clearScreen();
//         return;
//     }

//     console.log(dispStr + ":calculating at last");
//     let newdiv = document.createElement('div');
//     if (dispStr.includes("Undefined")) {
//         newdiv.innerHTML = `<div>Undefined</div>`;
//     } else {
//         dispStr = `${eval(dispStr)}`;
//         newdiv.innerHTML = `<div>${dispStr}</div>`;
//     }

//     // calcStr = `${eval(dispStr)}`;

//     display.insertAdjacentHTML('afterbegin', newdiv.innerHTML);
// }

//this function heavily rely on the paranthesis enclosing the arguments
function process() {
    let i, j, k, takecount;

    console.log("The input calcStr string: ", calcStr);

    //checking if brackets are proper, if not it will prompt an error, clears the calculator screen and returns
    if (!hasProperBrackets()) return;

    //checking if, there exist any sqrt symbol, if yes, then tranforming √(x) to ((x)^(1/2))
    if (!checkandtransformsqrt()) return;

    console.log("transformed the sqrt:", calcStr);

    //main string adjustments; adding proper brackets to ease the process further, since this function heavily rely on brackets
    for (let i = 0; i < calcStr.length; i++) {
        //in this algorithm, i am just seeing the character 1 step ahead
        //and then correspondingly making the adding the multiply,'*' or brackets, '()'.

        if (i != calcStr.length - 1 && /^[)\]}]$/.test(calcStr[i])) {
            if (/^[0-9a-zπ\[({]$/.test(calcStr[i + 1])) {
                calcStr = calcStr.slice(0, i + 1) + "*" + calcStr.slice(i + 1);
                i++;
            }
        } else if (i != calcStr.length - 1 && /^[0-9π]$/.test(calcStr[i])) {
            if (/^[a-zπ(\[{]$/.test(calcStr[i + 1])) {
                calcStr = calcStr.slice(0, i + 1) + "*" + calcStr.slice(i + 1);
                i++;
            }
        } else if (i != calcStr.length - 1 && /^[a-hj-z]$/.test(calcStr[i])) {
            //this is the most confusing part of this formatting,
            //here formatting the 'e' and all trignometric functions i.e. sin, sinh, arcsin etc., functions

            if (calcStr[i] == "e") {
                if (/^[0-9eπ(\[{stal]$/.test(calcStr[i + 1])) {
                    calcStr =
                        calcStr.slice(0, i + 1) + "*" + calcStr.slice(i + 1);
                    i++;
                } else if (i <= calcStr.length - 3) {
                    if (calcStr[i + 1] == "c" && calcStr[i + 2] == "o") {
                        calcStr =
                            calcStr.slice(0, i + 1) +
                            "*" +
                            calcStr.slice(i + 1);
                        i++;
                    }
                }
            } else if (/^[nstchg]$/.test(calcStr[i])) {
                if (
                    i >= calcStr - 2 ||
                    (calcStr[i + 1] == "e" && calcStr[i + 2] != "c") ||
                    /^[0-9π\[{]$/.test(calcStr[i + 1])
                ) {
                    calcStr =
                        calcStr.slice(0, i + 1) + "(" + calcStr.slice(i + 1);

                    if (/^[0-9πe]$/.test(calcStr[i + 2])) {
                        for (j = i + 3; j < calcStr.length; j++) {
                            if (!/^[0-9πe]$/.test(calcStr[j])) {
                                break;
                            }
                        }

                        calcStr = calcStr.slice(0, j) + ")" + calcStr.slice(j);
                    } else {
                        let key;
                        for (key in brackets) {
                            if (brackets[key][0] == calcStr[i + 2]) {
                                break;
                            }
                        }

                        takecount = 1;
                        if (calcStr[i + 2] == brackets[key][0]) {
                            for (j = i + 3; j < calcStr.length; j++) {
                                if (calcStr[j] == brackets[key][0]) {
                                    takecount++;
                                } else if (calcStr[j] == brackets[key][1]) {
                                    takecount--;
                                }

                                if (!takecount) {
                                    break;
                                }
                            }
                        }

                        calcStr =
                            calcStr.slice(0, j + 1) +
                            ")" +
                            calcStr.slice(j + 1);
                    }
                }
            }
        } else if (
            i != calcStr.length - 1 &&
            /^[!i]$/.test(calcStr[i]) &&
            calcStr[i + 1] != "n"
        ) {
            if (!/^[+\-*/\]})^!]$/.test(calcStr[i + 1])) {
                calcStr = calcStr.slice(0, i + 1) + "*" + calcStr.slice(i + 1);
            }
        }
    }

    if (!hasProperBrackets()) return;

    console.log("making general tweaking: ", calcStr);

    transformpower();

    if (!hasProperBrackets()) return;
    console.log("After transforming power: ", calcStr);

    factorial_process();

    if (!hasProperBrackets()) return;
    console.log("After factorial processing: ", calcStr);

    console.log("The final string: ", calcStr);
    return;
}

function hasProperBrackets() {
    let counter = {
        p: 0,
        b: 0,
        m: 0,
    };
    let errbrackets = "";

    for (let i = 0; i < calcStr.length; i++) {
        if (/^[(\[{]$/.test(calcStr[i])) {
            if (calcStr[i] == "(") {
                counter.p++;
            } else if (calcStr[i] == "[") {
                counter.b++;
            } else {
                counter.m++;
            }
        } else if (/^[)\]}]$/.test(calcStr[i])) {
            if (calcStr[i] == ")") {
                if (--counter.p < 0) {
                    alert("Please include proper brackets: ()");
                    // clearScreen();
                    return;
                }
            } else if (calcStr[i] == "]") {
                if (--counter.b < 0) {
                    alert("Please include proper brackets: []");
                    // clearScreen();
                    return;
                }
            } else {
                if (--counter.m < 0) {
                    alert("Please include proper brackets: | |");
                    // clearScreen();
                    return;
                }
            }
        }
    }

    for (key in counter) {
        if (counter[key]) {
            if (key == "p") {
                errbrackets += "( ) ";
            } else if (key == "b") {
                errbrackets += "[ ] ";
            } else {
                errbrackets += "| | ";
            }
        }
    }
    if (errbrackets.length) {
        alert("Please include proper brackets: " + errbrackets);
        // clearScreen();
        return false;
    }
    return true;
}

function checkandtransformsqrt() {
    let i, j, k;
    let takecount;

    for (i = 0; i < calcStr.length; i++) {
        if (i != calcStr.length - 1 && calcStr[i] == "√") {
            if (calcStr[i + 1] == "(") {
                takecount = 1;
                for (j = i + 2; j < calcStr.length; j++) {
                    if (calcStr[j] == "(") takecount++;
                    if (calcStr[j] == ")") takecount--;

                    if (!takecount) break;
                }

                calcStr =
                    calcStr.slice(0, i) +
                    "(" +
                    calcStr.slice(i + 1, j + 1) +
                    "^(1/2))" +
                    calcStr.slice(j + 1);
            } else {
                alert(
                    "Please enclose the argument of Square Root(√) in proper Paranthesis..."
                );
                return false;
            }
        }
    }

    return true;
}

function transformpower() {
    let i, j, k;
    let takecount, argent;

    for (i = 0; i < calcStr.length; i++) {
        if (i != 0 && calcStr[i] == "^" && i != calcStr.length - 1) {
            if (calcStr[i - 1] == ")") {
                takecount = 1;
                for (j = i - 2; j >= 0; j--) {
                    if (calcStr[j] == ")") takecount++;
                    if (calcStr[j] == "(") takecount--;

                    if (!takecount && !/^[a-z]$/.test(calcStr[j - 1])) {
                        if (/^[a-z]$/.test(calcStr[j])) {
                            calcStr =
                                calcStr.slice(0, i) + ")" + calcStr.slice(i);
                            calcStr =
                                calcStr.slice(0, j) + "(" + calcStr.slice(j);
                            i += 2;
                        }
                        break;
                    }
                }

                if (calcStr[j - 1] != "(") {
                    calcStr = calcStr.slice(0, j) + "(" + calcStr.slice(j);
                    i++;
                }
            } else {
                calcStr = calcStr.slice(0, i) + ")" + calcStr.slice(i);
                i++;

                if (/^[0-9]$/.test(calcStr[i - 2])) {
                    for (j = i - 3; j >= 0; j--) {
                        if (!/^[0-9]$/.test(calcStr[j])) break;
                    }
                } else if (/^[πe]$/.test(calcStr[i - 2])) {
                    j = i - 3;
                } else if (/^[\]}]$/.test(calcStr[i - 2])) {
                    let key;
                    for (key in brackets) {
                        if (brackets[key][1] == calcStr[i - 2]) break;
                    }

                    takecount = 1;
                    for (j = i - 3; j >= 0; j--) {
                        if (calcStr[j] == brackets[key][1]) takecount++;
                        if (calcStr[j] == brackets[key][0]) takecount--;

                        if (!takecount) {
                            j--;
                            break;
                        }
                    }
                }

                calcStr = calcStr.slice(0, j + 1) + "((" + calcStr.slice(j + 1);
                i += 2;
            }

            if (calcStr[i + 1] == "(") {
                takecount = 1;
                for (j = i + 2; j < calcStr.length; j++) {
                    if (calcStr[j] == "(") takecount++;
                    if (calcStr[j] == ")") takecount--;

                    if (!takecount) break;
                }

                if (calcStr[j + 1] != ")") {
                    calcStr =
                        calcStr.slice(0, j + 1) + ")" + calcStr.slice(j + 1);
                }
            } else {
                calcStr = calcStr.slice(0, i + 1) + "(" + calcStr.slice(i + 1);

                if (/^[0-9]$/.test(calcStr[i + 2])) {
                    for (j = i + 3; j < calcStr.length; j++) {
                        if (!/^[0-9]$/.test(calcStr[j])) break;
                    }
                } else if (/^[πe]$/.test(calcStr[i + 2])) {
                    j = i + 3;
                } else if (/^[a-df-z]$/.test(calcStr[i + 2])) {
                    takecount = 0;
                    argent = false;
                    for (j = i + 3; j < calcStr.length; j++) {
                        if (calcStr[j] == "(") {
                            takecount++;
                            if (!argent) argent = true;
                        }
                        if (calcStr[j] == ")") takecount--;

                        if (argent && !takecount) {
                            j++;
                            break;
                        }
                    }
                } else if (/^[\[{]$/.test(calcStr[i + 2])) {
                    let key;
                    for (key in brackets) {
                        if (brackets[key][0] == calcStr[i + 2]) break;
                    }

                    takecount = 1;
                    for (j = i + 3; j < calcStr.length; j++) {
                        if (calcStr[j] == brackets[key][0]) takecount++;
                        if (calcStr[j] == brackets[key][1]) takecount--;

                        if (!takecount) {
                            j++;
                            break;
                        }
                    }
                }

                calcStr = calcStr.slice(0, j) + "))" + calcStr.slice(j);
            }
        }
    }

    return;
}

function factorial_process() {
    let i, j;
    let takecount;

    for (i = 0; i < calcStr.length; i++) {
        if (i != 0 && calcStr[i] == "!") {
            if (calcStr[i - 1] != ")") {
                calcStr = calcStr.slice(0, i) + ")" + calcStr.slice(i);
                i++;
            } else {
                takecount = 1;
                for (j = i - 2; j >= 0; j--) {
                    if (calcStr[j] == ")") takecount++;
                    if (calcStr[j] == "(") takecount--;

                    if (!takecount && !/^[a-z]$/.test(calcStr[j - 1])) break;
                }

                if (/^[a-z]$/.test(calcStr[j])) {
                    calcStr = calcStr.slice(0, i) + ")" + calcStr.slice(i);
                    i++;
                    calcStr = calcStr.slice(0, j) + "(" + calcStr.slice(j);
                    i++;
                }

                continue;
            }

            if (/^[0-9]$/.test(calcStr[i - 2])) {
                for (j = i - 3; j >= 0; j--) {
                    if (!/^[0-9]$/.test(calcStr[j])) break;
                }
            } else if (/^[πei]$/.test(calcStr[i - 2])) {
                j = i - 3;
            } else if (/^[\]}]$/.test(calcStr[i - 2])) {
                let key;
                for (key in brackets) {
                    if (brackets[key][1] == calcStr[i - 2]) break;
                }

                takecount = 1;
                for (j = i - 3; j >= 0; j--) {
                    if (brackets[key][1] == calcStr[j]) takecount++;
                    if (brackets[key][0] == calcStr[j]) takecount--;

                    if (!takecount) break;
                }

                j--;
            }

            calcStr = calcStr.slice(0, j + 1) + "(" + calcStr.slice(j + 1);
            i++;
        }
    }

    return;
}

function calculate() {
    let i, j, k, l;
    let counter = 0,
        arg,
        arg1,
        arg2,
        func;
    let ff;

    for (i = 0; i < calcStr.length; i++) {
        if (/^[)\]}]$/.test(calcStr[i])) counter++;
        if (counter && /^[(\[{]$/.test(calcStr[i])) counter--;

        // if(calcStr[l]=='^'){
        //     arg1=eval(arg1).toString();
        //     k=j-1;
        // }

        if (counter) {
            arg1 = "";
            arg2 = "";
            func = "";
            ff = false;

            for (j = i - 1; j >= 0; j--) {
                if (ff) {
                    func += calcStr[j];
                    if (!/^[a-z]$/.test(calcStr[j - 1])) break;
                } else {
                    if (/^[(\[{]$/.test(calcStr[j])) {
                        counter--;
                        if (j != 0 && /^[a-z]$/.test(calcStr[j - 1])) {
                            ff = true;
                            continue;
                        } else {
                            if (calcStr[i + 1] == "!") {
                                func += "!";
                                i++;
                            } else {
                                func += calcStr[j];
                            }

                            break;
                        }
                    }

                    arg1 += calcStr[j];
                }
            }

            console.log("before i:", i);
            i -= evaluate(
                reverseStr(func),
                reverseStr(arg1),
                reverseStr(arg2),
                j,
                i
            ); //j: starting index, i: ending index; eg, in sin(90), j=0 and i=6
            console.log(calcStr, "after i:", i);
        }
    }

    let newdiv = document.createElement("div");
    if (calcStr.includes("Undefined")) {
        newdiv.innerHTML = `<div>Undefined</div>`;
    } else {
        calcStr = `${roundoff_n(parseFloat(eval(calcStr)), ndec)}`;
        dispStr = calcStr;
        newdiv.innerHTML = `<div>${dispStr}</div>`;
    }

    console.log(calcStr);
    display.insertAdjacentHTML("afterbegin", newdiv.innerHTML);
}
