const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select")


    for(let select of dropdowns){
        for(crrCode in countryList){
            let option = document.createElement("option");
            option.innerText = crrCode;
            option.value = crrCode;
            
            if(select.name === "from" && crrCode === "USD"){
                option.selected ="selected";
            } if (select.name === "to" && crrCode === "INR") {
                option.selected = "selected";
            }
            select.append(option);
        }

        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    }

const updateFlag =(element)=>{
    let currCode = element.value;
    let img = element.parentElement.querySelector("img");
    let link = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    img.src = link;
}


const fromCode = document.querySelector(".from select");
const toCode = document.querySelector(".to select");
const button = document.querySelector(".btn");
const msg = document.querySelector(".msg");



button.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if(amtval =="" || amtval < 1){ // amount value is 1 by default
        amount.value = "1"; 
    }


    let URL = `${BASE_URL}/${fromCode.value.toLowerCase()}/${toCode.value.toLowerCase()}.json`;
    
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = data[toCode.value.toLowerCase()];
    console.log(rate)
    
    let finalamount = amtval*rate;

    msg.innerText = `${amtval}${fromCode.value} = ${finalamount}${toCode.value}`;


});