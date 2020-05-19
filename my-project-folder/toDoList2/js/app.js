// select the HTML elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list")
const input = document.getElementById("input");

// Classes names
const CHECK = "fa fa-check-circle";
const UNCHECK = "fa fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables

let LIST, id;

// get the items from the local storage
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface 
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}
// clear the local storage 
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// Show today's date
const options = {weekday : "long", month:"short", day:"numeric"}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add a to do function
function addToDo(toDo, id, done, trash){

    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = ` <li class="item">
    <i class="fa ${DONE} co" job="complete" id="0"></i>
    <p class="text" ${LINE}>${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="0"></i>
    </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
addToDo("Drink water", 1, false, true);

// add an item to the list uses the enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        // if the input is not empty
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
                // add the items to the local storage (this code must be added where the LIST array is updated)
                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
        }
        input.value = "";
    }
})

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = List[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}
// target the item created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }
    // add the items to the local storage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
})