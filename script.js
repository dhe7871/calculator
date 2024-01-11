//NAVBAR
const e = "2.71828182845";
const π = "3.14159265359";
let standard = document.getElementById('standard');
let scientific = document.getElementById('scientific');
let menubtn = document.getElementById('menubtn');
let inputbox = document.getElementById('inputbox');
var display = document.getElementById('display');
var v = false;
var deg=true;
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
    if(parseInt(y)==parseFloat(y)){
        let product = 1;
        for (let i = 0; i < absolute(y); i++) {
            product *= x;
        }
        return((y>=0) ? product : 1/product);
    }else{
        let sum=1;
        let term=1;
        console.log("sum= "+sum);
        for(let i=0;absolute(term)>=0.000000001;i++){
            term*=((y*nlog(x))/(i+1));
            sum+=term;
            console.log("error: "+term);
            console.log("sum= "+sum);
        }
        return(sum);
    }
}
function printing(a) {
    display.firstElementChild.innerText += a.innerText;
    if (a.innerText != "=") {
        // calcStr += a.innerText;
        dispStr += a.innerText;
        console.log(dispStr);
    }
    else {
        display.firstElementChild.style.color = "grey";
        display.firstElementChild.style.fontSize = "2rem";
    }

}


// function getArg() {
//     let bcount = 0;
//     let arg;
//     let inLen = calcStr.length;
//     console.log(calcStr);
//     inputbox.onclick = function () {
//         if (calcStr.slice(calcStr.length - 1) == "(") {

//             if (!++bcount) {

//                 arg = eval(calcStr.slice(inLen - 1));
//                 if (inLen == 1) {
//                     calcStr = "";
//                 } else {
//                     calcStr = calcStr.slice(0, inLen - 1);
//                 }
//                 calcStr += evaluate(arg * π / 180);
//             }
//         }
//         else if (calcStr.slice(calcStr.length - 1) == ")") {
//             if (!--bcount) {

//                 arg = eval(calcStr.slice(inLen - 1));
//                 if (inLen == 1) {
//                     calcStr = "";
//                 } else {
//                     calcStr = calcStr.slice(0, inLen - 1);
//                 }
//                 calcStr += evaluate(arg * π / 180);
//             }
//         }

//     }
// }
function factorial(x){
    let prod=1;
    for(let i=1;i<=x;i++){
        prod*=i;
    }
    return(prod);
}
function evaluate(tfunc,arg,start,end) {
    if(arg=="Undefined"){
        dispStr=dispStr.slice(0,start)+"Undefined"+dispStr.slice(end+1);
        return 9;
    }
    else{
        arg=eval(arg);
    
        let argT=(deg) ? parseFloat(eval(arg+"*"+π+"/180")) : parseFloat(arg);
        console.log("tfunc: "+tfunc+" arg: "+arg+" startingIndex: "+start+" endIndex: "+end);
        switch (tfunc) {
            case "sin": let sin = evalsin(argT).toString();
                        for (let value of sin) {
                            if (value == "e") {
                                dispStr=dispStr.slice(0,start)+"0"+dispStr.slice(end+1);
                                return 1;
                            }
                        }
                        // sin = sin.slice(0, 11);
                        sin=trunc_n(parseFloat(sin),9);
                        sin=sin.toString();
                        dispStr=dispStr.slice(0,start)+sin+dispStr.slice(end+1);
                        console.log(dispStr);
                        return (sin.length);
            case "cos": let cos = evalcos(argT).toString();
                        for (let value of cos) {
                            if (value == "e") {
                                dispStr=dispStr.slice(0,start)+"0"+dispStr.slice(end+1);
                                return 1;
                            }
                        }
                        // cos = cos.slice(0, 11);
                        cos=trunc_n(parseFloat(cos),9);
                        cos=cos.toString();
                        dispStr=dispStr.slice(0,start)+cos+dispStr.slice(end+1);
                        return (cos.length);
            case "tan": let tan = evalsin(argT) / evalcos(argT);
                        for (let value of evalcos(argT).toString()) {
                            if (value == "e") {
                                dispStr=dispStr.slice(0,start)+"Undefined"+dispStr.slice(end+1);
                                return 9;
                            }
                        }
                        tan = tan.toString();
                        for (let value of tan) {
                            if (value == "e") {
                                dispStr=dispStr.slice(0,start)+"0"+dispStr.slice(end+1);
                                return 1;
                            }
                        }
                        // tan = tan.slice(0, 11);
                        tan=trunc_n(parseFloat(tan),9);
                        tan=tan.toString();
                        dispStr=dispStr.slice(0,start)+tan+dispStr.slice(end+1);
                        return (tan.length);
            case "cot": let cot = evalcos(argT) / evalsin(argT);
                        console.log(evalsin(argT));
                        if(evalsin(argT)==0){
                            dispStr=dispStr.slice(0,start)+"Undefined"+dispStr.slice(end+1);
                            return 9;
                        }else{
                            for (let value of evalsin(argT).toString()) {
                                if (value == "e") {
                                    dispStr=dispStr.slice(0,start)+"Undefined"+dispStr.slice(end+1);
                                    return 9;
                                }
                            }
                            cot = cot.toString();
                            for (let value of cot) {
                                if (value == "e") {
                                    dispStr=dispStr.slice(0,start)+"0"+dispStr.slice(end+1);
                                    return 1;
                                }
                            }
                            // cot = cot.slice(0, 11);
                            cot=trunc_n(parseFloat(cot),9);
                            cot=cot.toString();
                            dispStr=dispStr.slice(0,start)+cot+dispStr.slice(end+1);
                            return (cot.length);
                        }
                        
            case "sec": let sec = 1 / evalcos(argT);
                        for (let value of evalcos(argT).toString()) {
                            if (value == "e") {
                                dispStr=dispStr.slice(0,start)+"Undefined"+dispStr.slice(end+1);
                                return 9;
                            }
                        }
                        sec = sec.toString();
                        for (let value of sec) {
                            if (value == "e") {
                                dispStr=dispStr.slice(0,start)+"0"+dispStr.slice(end+1);
                                return 1;
                            }
                        }
                        // sec = sec.slice(0, 11);
                        sec=trunc_n(parseFloat(sec),9);
                        sec=sec.toString();
                        dispStr=dispStr.slice(0,start)+sec+dispStr.slice(end+1);
                        return (sec.length);
            case "cosec":   let cosec = 1 / evalsin(argT);
                            if(evalsin(argT)==0){
                                dispStr=dispStr.slice(0,start)+"Undefined"+dispStr.slice(end+1);
                                return 9;
                            }else{
                                for (let value of evalsin(argT).toString()) {
                                    if (value == "e") {
                                        dispStr=dispStr.slice(0,start)+"Undefined"+dispStr.slice(end+1);
                                        return 9;
                                    }
                                }
                                cosec = cosec.toString();
                                for (let value of cosec) {
                                    if (value == "e") {
                                        dispStr=dispStr.slice(0,start)+"0"+dispStr.slice(end+1);
                                        return 1;
                                    }
                                }
                                // cosec = cosec.slice(0, 11);
                                cosec=trunc_n(parseFloat(cosec),9);
                                cosec=cosec.toString();
                                dispStr=dispStr.slice(0,start)+cosec+dispStr.slice(end+1);
                                return (cosec.length);
                            }
            case "!":   let fact=factorial(parseInt(arg));
                        fact=fact.toString();
                        dispStr=dispStr.slice(0,start)+fact+dispStr.slice(end+1);
                        return(fact.length);

            case "log": console.log("log-----");
                        let log;
                        if(arg>0){
                            log=logrithm(arg);
                            log=trunc_n(log,9);
                            log=log.toString();
                        }else{
                            log="Undefined";
                        }
                        dispStr=dispStr.slice(0,start)+log+dispStr.slice(end+1);
                        return(log.length);
            case "ln":  let natlog;
                        if(arg>0){
                            natlog=nlog(arg);
                            natlog=trunc_n(natlog,9);
                            natlog=natlog.toString();
                        }else{
                            natlog="Undefined";
                        }
                        // nlog=nlog.toString();
                        dispStr=dispStr.slice(0,start)+natlog+dispStr.slice(end+1);
                        return(natlog.length);
        }
    }
    
}
function absolute(x) {
    if (x < 0) {
        return (-x);
    } else {
        return (x);
    }
}
function roundoff_n(x,n){
    let rn;
    let error;
    x=trunc_n(x,n);
    if(x>=0){
        error=x-parseInt(x);
        if(error>5*power(10,-1*n)){
            x+=power(10,-1*(n-1));
        }else{
            x
            // needed to complete
        }
    }
}
function trunc_n(x,n){
    let i;
    x=x.toString();
    for(i=0;i<x.length && x.slice(i,i+1)!=".";i++);
    if(i!=x.length){
        if(x.length-1>i+n){
            x=x.slice(0,i+n+1);
        }
    }
    return(parseFloat(x));
}
function greatestInteger(x){
    // console.log(parseInt(x));
    return(parseInt(x));
}
function evalsin(x) {
    let i;
    let term = x;
    let sum = x;
    // console.log(typeof (term));
    for (i = 1; absolute(term) >= 0.000000001; i += 2) {
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
    for (i = 1; absolute(term) >= 0.000000001; i += 2) {
        term *= -((x * x) / (i * (i + 1)));
        // console.log(term);
        sum += term;
        // console.log(sum);
    }
    // console.log(i);
    return (sum);
}
function logrithm(x){
    return(nlog(x)/nlog(10));
}
function nlog(x){
    let term, sum;
    let i;
    for(i=0;x-power(e,i)>=power(e,i);i++);
    x=(x-power(e,i))/power(e,i);
    sum=(i!=0)? i+x : x;
    term=x;
    
    for(i=1;absolute(term)>=0.000000001;i++){
        term*=-((i*x)/(i+1));
        sum+=term;
    }
    return(sum);
}
function backspace() {
    if (dispStr.length != 0) {
        console.log(dispStr);
        dispStr = dispStr.slice(0, dispStr.length - 1);
        display.firstElementChild.innerText = dispStr;
    }
    if(dispStr.length!=0){
        //needed to complete for e and pi
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
                case ".":   printing(a);
                            break;
                case "e":   dispStr+=e;
                            display.firstElementChild.innerText+="e";
                            break;
                case "π":
                            dispStr+=π;
                            display.firstElementChild.innerText+="π";
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
                                dispStr+=a.innerText;
                                dispStr=dispStr.slice(0,dispStr.length-3);
                                display.firstElementChild.innerText=dispStr;
                                break;

                case "n!":
                    dispStr+=a.innerText.slice(1);
                    display.firstElementChild.innerText=dispStr;
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
                                display.firstElementChild.innerText = dispStr;
                                break;
                
                case "=":   printing(a);
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

function calculate(){
    let i,j,k;
    let bCount=0;
    dispStr=dispStr.toLowerCase();
    console.log("checking Uppercase:"+dispStr);

    for(i=0;i<dispStr.length;i++){
        let arg="",tfunc="";
        if(dispStr.slice(i,i+1)=="("){
            bCount++;
            console.log("bCount: "+bCount);
        }
        if(dispStr.slice(i,i+1)==")"){
            if(--bCount>=0){
                console.log("bCount: "+bCount);
                for(j=i;dispStr.slice(j-1,j)!="(";j--){
                    arg+=dispStr.slice(j-1,j);
                    console.log("old argument fetching: "+arg);
                }
                console.log("argloop Over")
                arg=reverseStr(arg);
                console.log("new argument fetching : "+arg);

                if(j>1){
                    if((dispStr.slice(j-2,j-1)>='a' && dispStr.slice(j-2,j-1)<='z') && dispStr.slice(j-2,j-1)!="e"){
                        for(k=j-1;dispStr.slice(k-1,k)>='a' && dispStr.slice(k-1,k)<='z';k--){
                            tfunc+=dispStr.slice(k-1,k);
                        }
                        console.log("old tfunc:"+tfunc);
                        tfunc=reverseStr(tfunc);
                        console.log("new tfunc:"+tfunc);
                        i=k-1+evaluate(tfunc,arg,k,i);
                        console.log("evaluate after: "+dispStr);
                        
                    }
                    else if(j>3){
                        if(dispStr.slice(j-4,j-3)=='\n'){
                            for(k=j-4;dispStr.slice(k-1,k)>='a' && dispStr.slice(k-1,k)<='z';k--){
                                tfunc+=dispStr.slice(k-1,k);
                            }
                            tfunc+="\n-1"
                            console.log("control coming here");
                            i=k-1+evaluate(tfunc,arg,k,i);
                        }
                    } 
                    
                }
                console.log("i = "+i);
                if(dispStr.slice(i+1,i+2)=="!" && dispStr.slice(i,i+1)==")"){
                    console.log("control reaching evaluate function in fact calc executing for factorial just after )");
                    if(parseFloat(eval(arg))==parseInt(eval(arg))){
                        tfunc="!";
                        
                        i=j-2+evaluate(tfunc,arg,j-1,i+1);
                    }else{
                        alert("factorial of a FLOAT number not defined!!!");
                        clearScreen();
                        return;
                    }
                }
            }else{
                alert("Include proper brackets!!!");
                clearScreen();
                return;
            }
        }
        if(dispStr.slice(i,i+1)=="!" && i=="0"){
            alert("Syntax Warning!!!");
            clearScreen();
            return;
        }
        if(i!=0){
            console.log(arg);
            if(dispStr.slice(i,i+1)=="!" && dispStr.slice(i-1,i)>="0" && dispStr.slice(i-1,i)<="9"){
                let match=false;
                tfunc="!";
                for(j=i;j>0;j--){
                    let arr=["(","+","-","*","/"];
                    for(let value of arr){
                        if(value==dispStr.slice(j-1,j)){
                            match=true;
                            break;
                        }
                    }
                    if(!match){
                        arg+=dispStr.slice(j-1,j);
                    }else{
                        break;
                    }
                }
                arg=reverseStr(arg);
                if(parseFloat(eval(arg))==parseInt(eval(arg))){
                    tfunc="!";
                    
                    i=j-1+evaluate(tfunc,arg,j,i);
                }else{
                    alert("factorial of a FLOAT number not defined!!!");
                    clearScreen();
                    return;
                }
            }
        }
        
    }
    console.log(bCount);
    console.log(dispStr+" :before bCount final check")
    if(bCount){
        alert("Please include proper brackets!!!");
        clearScreen();
        return;
    }

    console.log(dispStr+":calculating at last");
    let newdiv = document.createElement('div');
    if(dispStr.includes("Undefined")){
        newdiv.innerHTML=`<div>Undefined</div>`;
    }else{
        dispStr = `${eval(dispStr)}`;
        newdiv.innerHTML = `<div>${dispStr}</div>`;
    }
    
    // calcStr = `${eval(dispStr)}`;
    
    display.insertAdjacentHTML('afterbegin', newdiv.innerHTML);
}

function reverseStr(str){
    let newStr="";
    for(let i=str.length;i>0;i--){
        newStr+=str.slice(i-1,i);
    }
    console.log(newStr);
    return(newStr);
}