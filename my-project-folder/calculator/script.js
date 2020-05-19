
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand= ''
        this.previousOperand= ''
        this.operation = undefined
    }

    delete(){

    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.appendNumber = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '';
    }

    compute(){
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '/':
                computation = previous / current
                break 
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const previousOperandTextElement = document.querySelector('data-previousOperand')
const currentOperandTextElement = document.querySelector('[data-currentOperand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})