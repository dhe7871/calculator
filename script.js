//NAVBAR
const e = "2.71828182845";
const π = "3.14159265359";
let standard = document.getElementById('standard');
let scientific = document.getElementById('scientific');
let menubtn = document.getElementById('menubtn');
let inputbox = document.getElementById('inputbox');
var display = document.getElementById('display');
var v = false;
var func;
var calcStr = "";
var dispStr = "";
menubtn.onclick = function () {
    if (!v) {
        document.getElementById('menu').style.top = "0";
        document.getElementById('menu').style.left = "0";
        v = true;
    } else {
        document.getElementById('menu').style.top = "0";
        document.getElementById('menu').style.left = "-100%";
        v = false;
    }


}
standard.onclick = function () {
    document.getElementById('heading').innerText = "Standard"
    document.getElementById('menu').style.left = "-100%";
    v = false;
}
scientific.onclick = function () {
    document.getElementById('heading').innerText = "Scientific"
    document.getElementById('menu').style.left = "-100%";
    v = false;
}

//displaying
alert("some of the keys have not been set, as i wanted to make it better.\nThe regular Calculator functions are working fine.\n but some keys are not\nlist of keys not working:\n1. HYPE\n2. INV\n3. 2nd\n4. x^y\n5. 10^x\n6. log\n7.ln\n8. i (actually, i wanted it to make complex calculation as well)\n9. and Menubar Buttons also not working.")
function power(x, y) {
    let product = 1;
    for (let i = 0; i < y; i++) {
        product *= x;
    }
    return (product);
}
function printing(a) {
    display.firstElementChild.innerText += a.innerText;
    if (a.innerText != "=") {
        calcStr += a.innerText;
        dispStr += a.innerText;
    }
    else {
        display.firstElementChild.style.color = "grey";
        display.firstElementChild.style.fontSize = "2rem";
    }

}


function getArg() {
    let bcount = 0;
    let arg;
    let inLen = calcStr.length;
    // console.log(calcStr);
    inputbox.onclick = function () {
        if (calcStr.slice(calcStr.length - 1) == "(") {

            if (!++bcount) {

                arg = eval(calcStr.slice(inLen - 1));
                if (inLen == 1) {
                    calcStr = "";
                } else {
                    calcStr = calcStr.slice(0, inLen - 1);
                }
                calcStr += evaluate(arg * π / 180);
            }
        }
        else if (calcStr.slice(calcStr.length - 1) == ")") {
            if (!--bcount) {

                arg = eval(calcStr.slice(inLen - 1));
                if (inLen == 1) {
                    calcStr = "";
                } else {
                    calcStr = calcStr.slice(0, inLen - 1);
                }
                calcStr += evaluate(arg * π / 180);
            }
        }

    }
}

function evaluate(argr) {
    switch (func) {
        case "sin": let sin = evalsin(argr).toString();
                    for (let value of sin) {
                        if (value == "e") {
                            return 0;
                        }
                    }
                    sin = sin.slice(0, 11);
                    return (sin);
        case "cos": let cos = evalcos(argr).toString();
                    for (let value of cos) {
                        if (value == "e") {
                            return 0;
                        }
                    }
                    cos = cos.slice(0, 11);
                    return (cos);
        case "tan": let tan = evalsin(argr) / evalcos(argr);
                    for (let value of evalcos(argr).toString()) {
                        if (value == "e") {
                            dispStr="Undefined";
                            return;
                        }
                    }
                    tan = tan.toString();
                    for (let value of tan) {
                        if (value == "e") {
                            return 0;
                        }
                    }
                    tan = tan.slice(0, 11);
                    return (tan);
        case "cot": let cot = evalcos(argr) / evalsin(argr);
                    for (let value of evalsin(argr).toString()) {
                        if (value == "e") {
                            dispStr="Undefined";
                            return;
                        }
                    }
                    cot = cot.toString();
                    for (let value of cot) {
                        if (value == "e") {
                            return 0;
                        }
                    }
                    cot = cot.slice(0, 11);
                    return (cot);
        case "sec": let sec = 1 / evalcos(argr);
                    for (let value of evalcos(argr).toString()) {
                        if (value == "e") {
                            dispStr="Undefined";
                            return;
                        }
                    }
                    sec = sec.toString();
                    for (let value of sec) {
                        if (value == "e") {
                            return 0;
                        }
                    }
                    sec = sec.slice(0, 11);
                    return (sec);
        case "cosec":   let cosec = 1 / evalsin(argr);
                        for (let value of evalsin(argr).toString()) {
                            if (value == "e") {
                                dispStr="Undefined";
                                return;
                            }
                        }
                        cosec = cosec.toString();
                        for (let value of cosec) {
                            if (value == "e") {
                                return 0;
                            }
                        }
                        cosec = cosec.slice(0, 11);
                        return (cosec);
    }
}
function calculate() {
    // let display = document.getElementById('display');
    let newdiv = document.createElement('div');
    // console.log(calcStr);
    calcStr = `${eval(calcStr)}`;
    dispStr = `${eval(calcStr)}`;
    newdiv.innerHTML = `<div>${dispStr}</div>`;
    display.insertAdjacentHTML('afterbegin', newdiv.innerHTML);
}
function absolute(x) {
    if (x < 0) {
        return (-x);
    } else {
        return (x);
    }
}
// fuction roundoff(x){
//     if(x)
// }
function greatestInteger(x){
    // console.log(parseInt(x));
    return(parseInt(x));
}
function evalsin(x) {
    let i;
    let term = x;
    let sum = x;
    // console.log(typeof (term));
    for (i = 1; absolute(term) >= 0.000001; i += 2) {
        term *= -((x * x) / ((i + 1) * (i + 2)));
        // console.log(term);
        sum += term;
        // console.log(sum);
    }
    // console.log(i);
    return (sum);
}
function evalcos(x) {
    let i;
    let term = 1;
    let sum = 1;
    // console.log(typeof (term));
    for (i = 1; absolute(term) >= 0.000001; i += 2) {
        term *= -((x * x) / (i * (i + 1)));
        // console.log(term);
        sum += term;
        // console.log(sum);
    }
    // console.log(i);
    return (sum);
}
function backspace() {
    if (calcStr.length != 0) {
        calcStr = calcStr.slice(0, calcStr.length - 1);
        display.firstElementChild.innerText = calcStr;
    }
}

function clearScreen() {
    // let display=document.getElementById('display');
    display.innerHTML = '<div></div>';
    calcStr = "";
    dispStr = "";
}


for (let value of document.getElementsByClassName('inputbtn')) {
    let a = value;
    a.onclick = function () {
        if (a.innerText >= "0" && a.innerText <= "9") {
            printing(a);
        } else {
            switch (a.innerText) {
                case "+":
                case "-":
                case "*":
                case "/":
                case "(":
                case ")":
                case ".": printing(a);
                    break;
                case "e":   dispStr+=a.innerText;
                            display.firstElementChild.innerText=dispStr;
                            calcStr+=e;
                            break;
                case "π":
                            dispStr+=a.innerText;
                            display.firstElementChild.innerText=dispStr;
                            calcStr+=π;
                            break;
                case "x\n2":    display.firstElementChild.innerText=dispStr+"^2=";
                                dispStr=power(eval(calcStr),2).toString();
                                calcStr=dispStr;
                                let newdivsq = document.createElement('div');
                                newdivsq.innerHTML = `<div>${dispStr}</div>`;
                                display.insertAdjacentHTML('afterbegin', newdivsq.innerHTML);
                                break;
                case "√x":  display.firstElementChild.innerText="√"+dispStr+"=";
                            dispStr=Math.sqrt(eval(calcStr)).toString();
                            calcStr=dispStr;
                            let newdivsqrt = document.createElement('div');
                            newdivsqrt.innerHTML = `<div>${dispStr}</div>`;
                            display.insertAdjacentHTML('afterbegin', newdivsqrt.innerHTML);
                            break;
                case "[ x ]":   display.firstElementChild.innerText="[ "+dispStr+" ]=";
                                dispStr=parseInt(eval(calcStr)).toString();
                                calcStr=dispStr;
                                let newdivgre = document.createElement('div');
                                newdivgre.innerHTML = `<div>${dispStr}</div>`;
                                display.insertAdjacentHTML('afterbegin', newdivgre.innerHTML);
                                break;
                case "| x |":
                            display.firstElementChild.innerText="| "+dispStr+" |=";
                            dispStr=absolute(eval(calcStr)).toString();
                            calcStr=dispStr;
                            let newdivabs = document.createElement('div');
                            newdivabs.innerHTML = `<div>${dispStr}</div>`;
                            display.insertAdjacentHTML('afterbegin', newdivabs.innerHTML);
                            break;
                case "( 1/x )":
                    calcStr += a.innerText
                    calcStr = calcStr.slice(calcStr.length - 5, calcStr.length - 3);
                    dispStr = calcStr;
                    display.firstElementChild.innerText = `${dispStr}`;
                    // console.log(dispStr);
                    break;

                case "n!":
                    let i, bcount = 0, value = 1;
                    dispStr += a.innerText.slice(1);
                    // console.log(dispStr+"disp value");
                    display.firstElementChild.innerText = dispStr;
                    if (calcStr.slice(calcStr.length - 1) == ")") {
                        bcount++;
                        for (i = calcStr.length - 2; i >= 0 && bcount != 0; i--) {
                            if (calcStr.slice(i, i + 1) == "(") {
                                if (!--bcount) {
                                    break;
                                }
                            }
                        }
                        if (i == -1) {
                            alert("Please include brackets properly!!");
                            clearScreen();
                        } else {
                            for (let n = 1; n <= eval(calcStr.slice(i)); n++) {
                                value *= n;
                            }
                            calcStr = calcStr.replace(`${calcStr.slice(i)}`, `${value}`);
                        }

                    } else {
                        if (calcStr.slice(calcStr.length - 1) >= "0" && calcStr.slice(calcStr.length - 1) <= "9") {
                            if (calcStr.length > 1) {
                                for (i = calcStr.length - 2; i >= 0 && calcStr.slice(i, i + 1) >= "0" && calcStr.slice(i, i + 1) <= "9"; i--);
                            }
                            if (calcStr.length == 1) {
                                i = -1;
                            }
                            for (let n = 1; n <= eval(calcStr.slice(i + 1)); n++) {
                                value *= n;
                            }
                            calcStr = calcStr.replace(`${calcStr.slice(i + 1)}`, `${value}`);

                        }
                        else {
                            alert("Syntax Warning!!!");
                            clearScreen();
                        }

                    }
                    break;
                case "sin":
                    dispStr += a.innerText + "(";
                    calcStr += "(";
                    func = "sin";
                    display.firstElementChild.innerText = dispStr;
                    getArg();
                    break;
                case "cos":
                    dispStr += a.innerText + "(";
                    calcStr += "(";
                    func = "cos";
                    display.firstElementChild.innerText = dispStr;
                    getArg();
                    break;
                case "tan":
                    dispStr += a.innerText + "(";
                    calcStr += "(";
                    func = "tan";
                    display.firstElementChild.innerText = dispStr;
                    getArg();
                    break;
                case "cot":
                    dispStr += a.innerText + "(";
                    calcStr += "(";
                    func = "cot";
                    display.firstElementChild.innerText = dispStr;
                    getArg();
                    break;
                case "sec":
                    dispStr += a.innerText + "(";
                    calcStr += "(";
                    func = "sec";
                    display.firstElementChild.innerText = dispStr; 
                    getArg();
                    break;
                case "cosec":
                    dispStr += a.innerText + "(";
                    calcStr += "(";
                    func = "cosec";
                    display.firstElementChild.innerText = dispStr; getArg();
                    break;
                case "=": printing(a);
                    calculate();
                    break;

                case "backspace": backspace();
                    break;

                case "CE": clearScreen();
                    break;
            }
        }

    }
}

