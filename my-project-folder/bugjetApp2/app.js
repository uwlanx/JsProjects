//Budget controller

let budgetController = (function(){
    let Expense = function(id,description,value){
        this.id =id;
        this.description= description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome >0){
            this.percentage = Math.round((this.value/totalIncome)*100)
        }else{
            this.percentage = -1;
        }
       
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    let Income = function(id,description,value){
        this.id =id;
        this.description= description;
        this.value = value;
    };

    let calctlateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
            data.totals[type]= sum;
        })
    };

    let data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals:{
            exp:0,
            inc:0
        },
        budeget: 0,
        percentage: -1
    };

    return {
        addItem: function(type,des,val){
            let newItem,ID;

            //creat new id for the next element
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }else{
                ID = 0;
            }

           //Creat Item based on the income and Expenses
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
                // data.allItems[type].push(newItem);
            } else if (type === 'inc'){
                newItem = new Income(ID,des,val);
                // data.allItems[type].push(newItem);                
            }
            
            //push the new item  into our data  structure
            data.allItems[type].push(newItem)

            //Return the new element 
            return newItem;
        },
         deleteItem: function(type,id){
             let ids,index;
             ids = data.allItems[type].map(function(current){
                 return current.id;
             });

             index = ids.indexOf(id);

             if(index !==-1){
                data.allItems[type].splice(index,1);
             }


         },

         calculateBudget: function(){
            //1. Calculate total income and expenses 
                calctlateTotal('inc');
                calctlateTotal('exp');
            //2. Calculate the budget: income - expenses
            data.budeget = data.totals.inc - data.totals.exp;
            //3. calculate the percentage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
            }else{
                data.percentage = -1;
            }
        },  

        calculatePersentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            let allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function(){
            return {
                budget: data.budeget,
                totalInc:data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };

        },

        testing: function(){
            console.log(data);
        }
    };
    
})();

//UIController 
let UIController = (function(){

    let DOMstrings = {
        inputType:'.add__type',
        inputDescrption: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budegetLebel:'.budget__value',
        incomeLebel: '.budget__income--value',
        expensesLebel: '.budget__expenses--value',
        percentageLebel: '.budget__expenses--percentage',
        container: '.container',
        expencePerceLebel: '.item__percentage',
        dateLebel: '.budget__title--month'
    
    };

    
    let formatNumber = function(num,type){
        var numSplit, int, dec;
       
            
            num = Math.abs(num);
            num = num.toFixed(2);

            numSplit = num.split('.');

            int = numSplit[0];
            if(int.length > 3){
                int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3 , int.length);
            }

            dec = numSplit[1];

            return (type === 'exp' ? '-': '+') + '' +int +'.' + dec;

    };

    let nodeListForEach = function(list, callback){
        for(var i = 0; i < list.length; i++){
            callback(list[i],i)
        }
    };

    return {
        getInput: function(){
            return {
                 type: document.querySelector(DOMstrings.inputType).value, //will be inc or exp
                 description: document.querySelector(DOMstrings.inputDescrption).value,
                 value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }
           
        },
        addListItem: function(obj,type){
            let html, newHTML, element;
            // creat HTML sting with place holer text

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix">
                <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div></div></div>`;

            } else if(type ==='exp'){
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description% rent</div>
                <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>
                <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div></div></div>`;
            }

            // Replace the placeholder with the actual data 
            newHTML = html.replace('%id%',obj.id);
            newHTML = newHTML.replace('%description%',obj.description);
            newHTML = newHTML.replace('%value%',formatNumber(obj.value,type));

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
            
        },

        deleteListItem: function(selectorId){
            let el =  document.getElementById(selectorId)
            el.parentNode.removeChild(el);
        },

        clearFileds:function(){
            let fields,fieldsArr;
            fields= document.querySelectorAll(DOMstrings.inputDescrption + ','+ DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (currentelement,index,array) {                
                currentelement.value = "";
            });

            fieldsArr[0].focus();
        },
        displayBudget: function(obj){
           
            let type;
            obj.budeget > 0 ? type = 'inc': type = 'exp';

            document.querySelector(DOMstrings.budegetLebel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLebel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMstrings.expensesLebel).textContent = formatNumber(obj.totalExp,'exp');
            

            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLebel).textContent =  obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageLebel).textContent =  '---';
            }
        },

        displayPercentages: function(percentages){
            //select all node list
            let fields = document.querySelectorAll(DOMstrings.expencePerceLebel);
            //console.log(fields);
         
            nodeListForEach(fields , function(current, index){
                if(percentages[index] > 0){
                    current.textContent =percentages[index] + '%';
                }else{
                    current.textContent = '---';
                }               
            });

        },
        displayMonth: function(){
            let year,now,month, months;
            now = new Date();

            months = ['January','February','March','April','May','June', 'July','August','September', 'October', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLebel).textContent =months[month]  + ' ' + year;

        },

        changeType : function(){
            let fields  = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescrption + ',' +
                DOMstrings.inputValue
            );
            nodeListForEach(fields,function(cur){
                cur.classList.toggle('red-focus');
            });

        },

        getDOMstring: function(){
            return DOMstrings;
            

        }

    };
 
})();


//Global App Controller 
var controller = (function(budgetctrl,UIctrl){
    let setupEventlitners = function(){
        
        var DOM = UIctrl.getDOMstring();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAdditem);
        document.addEventListener('keypress',function(event){
        if (event.keyCode === 13 || event.which === 13){
            ctrlAdditem();
        }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change',UIctrl.changeType);
    };

    let updateBudet = function() {
        //1. Calculat the budget 
            budgetctrl.calculateBudget();
        //2. Display  the budget on the UI
            var budeget = budgetctrl.getBudget();
        //3. Display the <budget on the UI
           UIctrl.displayBudget(budeget);

    };

    updatePersentages = function(){
        //1. Update percentages
        budgetctrl.calculatePersentages();

        //2. Read the percentage from the budget controler
        var percentages = budgetctrl.getPercentages();

        //3. Update the UI with the new prcentages 
        UIctrl.displayPercentages(percentages);

    };
    let ctrlAdditem  = function(){
        var input, newItem;
        //1. Get the input field data
         input = UIctrl.getInput();   

         if(input.description !=="" && !isNaN(input.value) && input.value > 0){
            //2. Add the item to the budget controller 
            newItem = budgetctrl.addItem(input.type, input.description, input.value);
            
            //3. Add the item to the UI 
            UIctrl.addListItem(newItem,input.type);

            //4. Clear the field 
            UIctrl.clearFileds();
            //5.Calculate and update the budeget
             updateBudet();
            
             // 6. Calculate and Update Percentages 
             updatePersentages();
         }      
    };
   
    let ctrlDeleteItem = function(event){
        var itemID, splitID, type,ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1.  Delete the item from the data structure
            budgetctrl.deleteItem(type,ID);

            //2.  Delete from the UI
            UIctrl.deleteListItem(itemID);

            //3.  Update and show the new element 
            updateBudet();

            // 4. Calculate and Update Percentages 
             updatePersentages();

        }
    }
   return {
       init: function(){
         console.log('Application has started.')
         UIctrl.displayMonth();
         UIctrl.displayBudget({
            budget: 0,
            totalInc:0,
            totalExp: 0,
            percentage: -1
         });
        setupEventlitners();
       }
   } 

})(budgetController,UIController);

controller.init();

