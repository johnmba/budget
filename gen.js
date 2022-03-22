
function total(total_amt, dated){
    let tot_temp = `<div class="buget-row total">
    <span>Total</span> <span>Grand total of amount</span>
    <span>${total_amt}</span> <span>${dated}</span>
    </div>`
    return tot_temp
}

function temp(obj){
    
    let temp = `
        <div class="buget-row">
            <span>${obj.ovahd}</span> <span>${obj.desc}</span>
            <span>${obj.amt}</span> <span>${obj.dated}</span>
        </div>
    `;
    return temp
}

var savedata = function (name, value) {

	var exists = localStorage.getItem(name);
	existing = exists ? exists.split(',') : [];
	existing.unshift(value);
    JSON.stringify(existing)
	localStorage.setItem(name, existing);
    console.log(existing);
};

const date = new Date();
var form = document.forms;

var income = document.querySelectorAll("#incomsectn");
var expense = document.querySelectorAll("#expensectn");
var revsectn = document.createElement("div");
var totrev = document.createElement("div");
var expsectn = document.createElement("div");
var totexp = document.createElement("div");
console.log(localStorage.total_inc)
var draft = "You have $" + localStorage.total_rev + " in draft for you to spend"

window.addEventListener("load", ()=>{
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

        let expenditure = JSON.parse(localStorage.exp);

        expenditure.forEach(element => {

            let exp = document.createElement("div");
            exp.innerHTML = temp(obj=element);

            expense[0].appendChild(exp);
        });
        totexp.innerHTML = total(localStorage.total_exp, expenditure[0].dated);
        expense[0].appendChild(totsectn);
    }else if (typeof localStorage.total_exp == "undefined" && typeof localStorage.rev !== "undefined"){
        expsectn.className = "item nobuge";
        expsectn.innerHTML = draft
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

    var incom = new FormData(e.target);
    incom = Object.fromEntries(incom);
    const newrev = document.createElement("div")

    if (localStorage.total_rev) {
        localStorage.total_rev = Number(localStorage.total_rev) + Number(incom.amt)
    }else{
        localStorage.total_rev = incom.amt
    };
    incom.dated = date.toDateString();

    if (localStorage.rev) {
        localStorage.rev = localStorage.total_rev.unshift(incom)
    }else{
        emty = []
        emty.push(incom)
        localStorage.rev = JSON.stringify(emty)
    };
    //console.log(savedata("rev", incom));

    let norev = document.querySelector("#incomsectn .nobuge");
    if (norev){
        norev.remove()
    };
    console.log(incom)

    let old_total = document.querySelector("#incomsectn .total");
    if(old_total){
        old_total.remove()
    };

    newrev.innerHTML = temp(obj=incom);
    income[0].appendChild(newrev);
    totrev.innerHTML = total(localStorage.total_rev, incom.dated);
    income[0].appendChild(totrev);

    let noexp = document.querySelector("#expensectn .nobuge");
    if (noexp && typeof localStorage.exp == "undefined"){
        noexp.innerHTML = draft
    };
    form.exp.expensa.disabled = false;
    window.location.href = "#incomsectn";
    return
})

form.exp.addEventListener("submit", (e)=>{
    e.preventDefault();

    var expens = new FormData(e.target);
    expens = Object.fromEntries(expens);
    const newexp = document.createElement("div")

    if (localStorage.total_rev) {
        localStorage.total_rev = Number(localStorage.total_rev) + Number(expens.amt);
    } else {
        localStorage.total_rev = expens.amt;
    }

    expens.dated = date.toDateString()

    let noexp = document.querySelector("#expensectn .nobuge")
    if(noexp){
        noexp.remove()
    }
    if (localStorage.exp) {
        localStorage.exp = Array(localStorage.total_rev).unshift(expens)
    }else{
        emty = []
        emty.push(expens)
        localStorage.rev = JSON.stringify(emty)
    };

    let old_total = document.querySelector("#expensectn .total");
    if(old_total){
        old_total.remove()
    };

    newexp.innerHTML = temp(obj=expens);
    expense[0].appendChild(newexp);
    totexp.innerHTML = total(localStorage.total_rev, expens.dated);
    expense[0].appendChild(totexp);
    window.location.href = "#expensectn";

    return
})
