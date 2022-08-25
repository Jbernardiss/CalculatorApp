

let calc = {

    display: document.getElementById("display"),
    buttons: document.getElementsByClassName("buttons"),
    numButtons: document.getElementsByClassName("numButtons"),
    opButtons: document.getElementsByClassName("opButtons"),
    clearButton: document.getElementById("clearButton"),
    resetButton: document.querySelector(".resetButton"),
    equalButton: document.querySelector(".equalButton"),
    percentageButton: document.querySelector(".percentageButton"),
    signButton: document.querySelector(".signButton"),
    operation: "",
    deleteDisplayText: false,
    numBuffer: [],
    result: "",

    updateDisplay: function(button) {
        if(this.deleteDisplayText == true) {
            this.clearDisplay()
            this.deleteDisplayText = false
        }
        this.resetButton.textContent = "C"
        this.display.textContent += button.textContent
    },

    clearDisplay: function() {
        this.display.textContent = ""
    },

    calcPercentage: function() {
        this.display.textContent = parseFloat((this.display.textContent)/100)  
    },

    flipSign: function() {

        if(this.display.textContent[0] == "+") {
            this.display.textContent = this.display.textContent.replace("+", "-")
            return "-"
        } else if(this.display.textContent[0] == "-") {
            this.display.textContent = this.display.textContent.replace("-", "+")
            return "+"
        } else if((this.display.textContent[0] != "-") && (this.display.textContent[0] != "+")) {
            this.display.textContent = `-${this.display.textContent}`
            return "-"
        }
    },

    resetCalc: function() {
        this.clearDisplay()
        this.resetButton.textContent = "AC"
        this.numBuffer = []
    },

    setOperation: function(button) {
        this.deleteDisplayText = true
        this.operation = button.textContent
        this.numBuffer.push(parseFloat(this.display.textContent))
    },

    exeOperation: function() {
        this.numBuffer.push(parseFloat(this.display.textContent))

        if(this.operation == "+") {
            this.result = this.numBuffer[0] + this.numBuffer[1]
        } else if(this.operation == "-") {
            this.result = this.numBuffer[0] - this.numBuffer[1]
        } else if(this.operation == "×") {
            this.result = this.numBuffer[0] * this.numBuffer[1]
        } else if(this.operation == "÷") {
            this.result = this.numBuffer[0] / this.numBuffer[1]
        } else if(this.operation == "") {
            this.result = this.display.textContent
        }

        this.display.textContent = `${this.result}`
    }
}



calc.resetButton.addEventListener("click", () => calc.resetCalc())
calc.equalButton.addEventListener("click", () => calc.exeOperation())
calc.percentageButton.addEventListener("click", () => calc.calcPercentage())
calc.signButton.addEventListener("click", () => calc.flipSign())

for(let button of calc.numButtons) {
    button.addEventListener("click", () => calc.updateDisplay(button))
}

for(let button of calc.opButtons) {
    button.addEventListener("click", () => calc.setOperation(button))
}
