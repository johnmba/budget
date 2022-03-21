
//function formdata(overhead, currency, amount, description=""){// fuction as object
//    this.ovhd = overhead;
//    this.cur = currency;
//    this.amt = amount;
//    this.desc = description;
//}

function saveTextToFile() {
    const saveText = "tmp";

    // file setting
    const text = saveText;
    const name = "sample.json";
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function saveJsonObjToFile(obj) {
    const saveObj = obj // tmp

    // file setting
    const text = JSON.stringify(saveObj);
    const name = "sample.json";
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function total(total_amt, dated){
    let d = dated
    let tot_temp = `<div class="buget-row total">
    <span>Total</span> <span>Grand total of amount</span>
    <span>${total_amt}</span> <span>${d.getDay()}-${d.getMonth()}-${d.getFullYear()}</span>
    </div>`
    return tot_temp
}

function temp(obj){
    let d = obj.dated
    let temp = `
        <div class="buget-row">
            <span>${obj.ovahd}</span> <span>${obj.desc}</span>
            <span>${obj.amt}</span> <span>${d.getDay()}-${d.getMonth()}-${d.getFullYear()}</span>
        </div>
    `;
    return temp
}

const date = new Date()
var form = document.forms
var revenue = []
var expenditure = []
var total_inc = 0
var total_exp = 0

var income = document.querySelectorAll("#incomsectn")
var expense = document.querySelectorAll("#expensectn")

window.addEventListener("load", ()=>{
    var sectn = document.createElement("div")
    if (revenue.length === 0){
        sectn.id = "norev"
        sectn.className = "item"
        sectn.innerHTML = "There is no generated revenue at the moment; try entering revenues with the form below "
        income[0].appendChild(sectn)
    }else{
        revenue.forEach(element => {
            let inc = document.createElement("div")
            inc.innerHTML = temp(obj=element)
            income[0].appendChild(inc)
        });
        sectn.innerHTML = total(total_amt, date)
        income[0].appendChild(sectn)
    }
    if (revenue.length === 0){
        form.exp.expensa.disabled = true
        sectn.id = "norev"
        sectn.className = "item"
        sectn.innerHTML = "Expenditure is disabled because you have zero revenue, <a href='#income'>click here</a> to record generated revenue"
        expense[0].appendChild(sectn)
    }else{
        expenditure.forEach(element => {
            let inc = document.createElement("div")
            inc.innerHTML = temp(obj=element)
            expense[0].appendChild(inc)
        });
        sectn.innerHTML = total(total_amt, date)
        expense[0].appendChild(sectn)
    }
})

form.inc.addEventListener("submit", (e)=>{
    e.preventDefault();
    var incom = new FormData(form.inc)
    incom = Object.fromEntries(incom)
    incom.dated = date
    let sectn = document.createElement("div")
    sectn.innerHTML = temp(obj=incom)
    income[0].appendChild(sectn)
    let totl = total_inc =+ incom.amt
    sectn.innerHTML = total(totl, incom.dated)
    income[0].appendChild(sectn)
    if (total_exp === 0) {
        document.getElementById("norev").innerHTML = "You have" + total_inc + "in draft for you to spend"
    }
})

form.exp.addEventListener("submit", (e)=>{
    e.preventDefault();
    var expens = new FormData(form.exp)
    expens = Object.fromEntries(expens)
    expens.dated = date
    let sectn = document.createElement("div")
    sectn.innerHTML = temp(obj=expens)
    expense[0].appendChild(sectn)
    let totl = total_exp =+ expens.amt
    sectn.innerHTML = total(totl, expens.dated)
    expense[0].appendChild(sectn)
})