
function total(total_amt, dated){
    let tot_temp = `<div class="buget-row total">
    <div class="unit _1fb">Total</div> <div class="unit _2fb">Grand total of amount</div>
    <div class="unit _1fb flxc">${total_amt}</div> <div class="unit _1fb">${dated}</div>
    </div>`
    return tot_temp
}

function temp(obj){
    
    let temp = `
        <div class="buget-row">
            <div class="unit _1fb">${obj.ovahd}</div> <div class="unit _2fb">${obj.desc}</div>
            <div class="unit _1fb flxc">${obj.amt}</div> <div class="unit _1fb">${obj.dated}</div>
        </div>
    `;
    return temp
}

const date = new Date();
var form = document.forms;

var income = document.querySelectorAll("#incomsectn");
var revsectn = document.createElement("div");
var totrev = document.createElement("div");
var expense = document.querySelectorAll("#expensectn");
var expsectn = document.createElement("div");
var totexp = document.createElement("div");

window.addEventListener("load", ()=>{

    if(!sessionStorage.getItem("visit")){
        localStorage.clear()
    }

    if (localStorage.rev){
        let revenue = localStorage.rev
        revenue = JSON.parse(revenue)
        revenue.forEach(element => {

            let inc = document.createElement("div");
            inc.innerHTML = temp(obj=element);

            income[0].appendChild(inc)
        });
        totrev.innerHTML = total(localStorage.total_rev, revenue[0].dated);
        income[0].appendChild(totrev)
    }else{
        revsectn.className = "item nobuge";
        revsectn.innerHTML = "There is no generated revenue at the moment; try entering revenues with the form below ";
        income[0].appendChild(revsectn);
    }
    if(localStorage.exp){

        let expenditure = localStorage.exp;
        expenditure =  JSON.parse(expenditure)

        expenditure.forEach(element => {

            let exp = document.createElement("div");
            exp.innerHTML = temp(obj=element);

            expense[0].appendChild(exp);
        });
        totexp.innerHTML = total(localStorage.total_exp, expenditure[0].dated);
        expense[0].appendChild(totexp);
    }else if (typeof localStorage.total_exp == "undefined" && typeof localStorage.rev !== "undefined"){
        expsectn.className = "item nobuge";
        expsectn.innerHTML = "You have $" + localStorage.total_rev + " in draft for you to spend";
        expense[0].appendChild(expsectn)
    }else{
        form.exp.expensa.disabled = true;
        expsectn.className = "item nobuge";
        expsectn.innerHTML = "Expenditure is disabled because you have zero revenue, <a href='#income'>click here</a> to record generated revenue";
        expense[0].appendChild(expsectn)
    };
    return
})

form.inc.addEventListener("submit", (e)=>{
    e.preventDefault();
    sessionStorage.setItem("visit", "true");

    var incom = new FormData(e.target);
    incom = Object.fromEntries(incom);
    const newrev = document.createElement("div")

    if (localStorage.total_rev) {
        localStorage.total_rev = Number(localStorage.total_rev) + Number(incom.amt)
    }else{
        localStorage.total_rev = incom.amt
        console.log(localStorage.total_rev)
    };
    
    incom.dated = date.toDateString();
    if (localStorage.rev) {
        let stored = JSON.parse(localStorage.getItem("rev"))
        stored.unshift(incom)
        localStorage.rev = JSON.stringify(stored) 
    }else{
        let emty = []
        emty.push(incom)
        localStorage.rev = JSON.stringify(emty)
    };

    let norev = document.querySelector("#incomsectn .nobuge");
    if (norev){
        norev.remove()
    };

    let old_total = document.querySelector("#incomsectn .total");
    if(old_total){
        old_total.remove()
    };

    newrev.innerHTML = temp(obj=incom);
    income[0].insertBefore(newrev, income[0].firstChild);
    totrev.innerHTML = total(localStorage.total_rev, incom.dated);
    income[0].appendChild(totrev);

    let noexp = document.querySelector("#expensectn .nobuge");
    if (noexp && typeof localStorage.exp == "undefined"){
        noexp.innerHTML = "You have $" + localStorage.total_rev + " in draft for you to spend, note you cannot spend more than."
    };
    form.exp.expensa.disabled = false;
    window.location.href = "#incomsectn";
    return
})

form.exp.addEventListener("submit", (e)=>{
    e.preventDefault();
    sessionStorage.setItem("visit", "true");

    var expens = new FormData(e.target);
    expens = Object.fromEntries(expens);
    const newexp = document.createElement("div")

    if (localStorage.total_exp) {
        localStorage.total_exp = Number(localStorage.total_exp) + Number(expens.amt);
    } else {
        localStorage.total_exp = expens.amt;
    }

    expens.dated = date.toDateString()

    let noexp = document.querySelector("#expensectn .nobuge")
    if(noexp){
        noexp.remove()
    }
    if (localStorage.exp) {
        let stored = JSON.parse(localStorage.getItem("exp"))
        stored.unshift(expens)
        localStorage.exp = JSON.stringify(stored) 
    }else{
        let emty = []
        emty.push(expens)
        localStorage.exp = JSON.stringify(emty)
    };

    let old_total = document.querySelector("#expensectn .total");
    if(old_total){
        old_total.remove()
    };

    newexp.innerHTML = temp(obj=expens);
    expense[0].insertBefore(newexp, expense[0].firstChild);
    totexp.innerHTML = total(localStorage.total_exp, expens.dated);
    expense[0].appendChild(totexp);
    window.location.href = "#expensectn";
    return
})

const expamt = document.getElementById("expamt")

expamt.addEventListener("change", (event)=>{
    const err = document.createElement("div")
    err.style.fontSize = "small"
    err.id = "err"
    err.style.color = "red"
    err.style.marginLeft = "60px"
    err.style.paddingLeft = "10px"
    err.style.paddingTop = "5px"
    const val = event.target.value
    if(!localStorage.total_exp){
        var spends = 0
    }else{
        spends = Number(localStorage.total_exp)
    }
    const draft = Number(localStorage.total_rev) - spends
    
    if (val > draft) {
        err.innerHTML = "Overdraft $ " + draft + " is not allowed"
        expamt.parentElement.appendChild(err)
        form.exp.expensa.disabled = true
    } else {
        let noerr = document.getElementById("err")
        if (noerr) {
            noerr.remove()
        }
        form.exp.expensa.disabled = false
    }
})
