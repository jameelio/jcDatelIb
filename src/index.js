import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

///THIS IS HOW TO INVOKE NEW RENDER CALENDAR
document.addEventListener("DOMContentLoaded", function(event) {
    const calElement = document.createElement('div')
    calElement.id = "jcalendar" 
    calElement.style.maxWidth = "550px";
    calElement.className = "d-flex flex-column";
    document.body.appendChild(calElement)

    renderCalendar("jcalendar")
    
})


export default function renderCalendar(element,dateSpecify){
    if(!checkIfElementExists(element)){
        throw "Calender Element initiator not avail";
    }
    

    const calenderDateObj = getCalendarDateInfo();

    let div = document.createElement("div")
          div.className = "d-flex flex-row"

    div.appendChild(returnMnthOptions(calenderDateObj.cm,element)).addEventListener("change",dayListenerHandler);
    div.appendChild(returnYrOptions(calenderDateObj.cy,element)).addEventListener("change",dayListenerHandler);
    
    //document.getElementById(element).appendChild(returnMnthOptions(calenderDateObj.cm,element)).addEventListener("change",dayListenerHandler);
    //document.getElementById(element).appendChild(returnYrOptions(calenderDateObj.cy,element)).addEventListener("change",dayListenerHandler);

    document.getElementById(element).appendChild(div)
    document.getElementById(element).appendChild(initDrawDaysUpdates(element))
    
}


function initDrawDaysUpdates(calId){
    const monthVal = document.getElementById(`mnth-${calId}`).value;
    const yearVal = document.getElementById(`yr-${calId}`).value;
    return returnDaysInMonthCal(monthVal,yearVal,calId)
}

function dayListenerHandler(e){
    const getCalendarDefinedID = e.target.id.split("-")[1];
    
    const monthVal = document.getElementById(`mnth-${getCalendarDefinedID}`).value;
    const yearVal = document.getElementById(`yr-${getCalendarDefinedID}`).value;
    const reDrawTable = returnDaysInMonthCal(monthVal,yearVal,getCalendarDefinedID)
    
    let currentTable = document.getElementById(`${getCalendarDefinedID}`)

    if(currentTable.children){
        currentTable.removeChild(currentTable.children[1])
        currentTable.appendChild(reDrawTable)
    }
}

const returnDaysInMonthCal = (month,year,elId) => {
   
    let daysInMonth = 32 - new Date(year,month,32).getDate();; //31 Days in January
    let startDay = new Date(year, month).getDay(); //Index of start day in Jan 3 (wednesday)
    let endDay = new Date(year,month ,daysInMonth).getDay(); //Index of end day in Jan 5 (friday)


    let calendarTable = returnNewTable(elId);
    let startCountingDays = 1; //day 1

    for(let i = 0; i < 6; i++) { //Maximum 6 Rows in the calendar
        let row = document.createElement("tr")
        
        for(let calendarDay = 0; calendarDay < 7; calendarDay++){ // calendar days populate, sund to sat
            
            if(i===0 && calendarDay < startDay){ 
                let td = document.createElement("td")
                row.append(td) //should be empty

            } 
            else if(startCountingDays > daysInMonth)
            break;
            else {
                let td = document.createElement("td");
                td.textContent = startCountingDays;
                row.append(td);
                row.className = "cursor"
                row.addEventListener("click",showDate)
                startCountingDays ++;
            }
        }   
        calendarTable.append(row)
    }
    return calendarTable;
}

function showDate(e){
    //console.log(e);
    //show date in input
}

const returnNewTable = (tblID) => {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let table = document.createElement("table");
        table.id = "tbl-"+tblID;
        table.className ="table"
    let thead = table.createTHead();
    let tbody = table.createTBody();
    
    for(let day in days){
        let th = document.createElement("th");
        th.innerHTML = days[day];
        thead.appendChild(th)
    }

    return table;
}


function checkIfElementExists(el){
     const calElementInitiator = document.getElementById(el);
     if(typeof(calElementInitiator)!= 'undefined' && calElementInitiator != null)return true;
     else false;    
}


const returnMnthOptions = (currentMonth,elementId) => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    let mnthElement = buildElement("select");
        mnthElement.id = "mnth-" + elementId;
        mnthElement.className = "form-control"

        for(let mnthAbr in months){
          mnthElement.appendChild(populateOptions(months[mnthAbr],mnthAbr))
        }
        mnthElement.selectedIndex = currentMonth;

    return mnthElement;
}

const returnYrOptions = (currentYear,elementId) => { 
    const yearElement = buildElement("select");
        yearElement.id = "yr-" + elementId;
        yearElement.className = "form-control"

    let yearOpt = null;

    for(let i = currentYear-15; i < currentYear+15; i++){
        yearOpt = buildElement("option");
        yearOpt.value = i;
        yearOpt.text = i;    
        yearElement.appendChild(yearOpt);
    }
    yearElement.selectedIndex = 15;

    return yearElement;
}

function populateOptions(item,index){
    let option = null;
        option = buildElement("option")
        option.value = parseInt(index);
        option.text = item;
    return option;
}

function buildElement(elType){
 return document.createElement(elType)
}

function getCalendarDateInfo(){
    const jcDate = new Date();

    return {
        td: jcDate,
        cm: jcDate.getMonth(),
        cy: jcDate.getFullYear()
    }
}