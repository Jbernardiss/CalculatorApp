

let calc = {

    /** Object representing the calculator */

    display: document.getElementById("display"), 
    buttons: document.getElementsByClassName("buttons"), 
    numButtons: document.getElementsByClassName("numButtons"), 
    opButtons: document.getElementsByClassName("opButtons"), 
    clearButton: document.getElementById("clearButton"),
    resetButton: document.querySelector(".resetButton"),
    equalButton: document.querySelector(".equalButton"),
    percentageButton: document.querySelector(".percentageButton"),
    signButton: document.querySelector(".signButton"),
    operation: "", // Variable which stores the operation to be executed
    deleteDisplayText: false, // Variable which controls whether display text should be deleted when inserting a new number or not

     // Buffer which stores the numbere of the operation. It should always contain only 2 number. The first number is stored from the display 
     // when any of the operation buttons is pressed. The second number is stored from the display when equal button is pressed.
     // There's no need for more spaces because if you wanna do calculations with the results of the previous operation it is stored when you 
     // press the operation button.
    numBuffer: [],
    result: "", // Variable which holds the float of the result to be printed

    updateDisplay: function(button) {

        /** Prints new charachters to the display 
         * Called when any number button is pressed
        */

        if(this.deleteDisplayText == true) { // After setting a new operation(clicking +, -, *, /) it is needed to clear the numbers already 
            this.clearDisplay()              // present in the display so the second number of the operation can be input. So there's a 
            this.deleteDisplayText = false   // control variable which tells if the display needs to be clear or not.
        }
        this.resetButton.textContent = "C" // Sets Clear button to C since it starts with AC(All Clear) written on it
        this.display.textContent += button.textContent // Adds the button text(number) to display text
    },

    clearDisplay: function() {

        /** Clears display */

        this.display.textContent = ""
    },

    calcPercentage: function() {

        /** Calculates percentage of present number in display 
         * Function called when percentage button is pressed
        */

        this.display.textContent = parseFloat((this.display.textContent)/100)  
    },

    flipSign: function() {

        /** Flips the number sign(+ or -) 
         * Function called when sign button is pressed
        */

        if(this.display.textContent[0] == "+") { // Sets the sign as - if the number is already positive
            this.display.textContent = this.display.textContent.replace("+", "-")
            return "-"
        } else if(this.display.textContent[0] == "-") { // Sets the sign as + if the number is already negative
            this.display.textContent = this.display.textContent.replace("-", "+")
            return "+"
        } else if((this.display.textContent[0] != "-") && (this.display.textContent[0] != "+")) { // if number doesn't has a sign it means it's
            this.display.textContent = `-${this.display.textContent}`                             // postive by default so if sets the sign as -
            return "-"
        }
    },

    resetCalc: function() {

        /** Resets all calcualtor functions 
         * Function called when Clear button is pressed
        */

        this.clearDisplay()
        this.resetButton.textContent = "AC"
        this.numBuffer = []
    },

    setOperation: function(button) {

        /** 
         * Sets which operation should be executed when the "=" button is hit 
         *  Function called when any operator button(+,-,*,/) is pressed
        */

        this.deleteDisplayText = true // Sets the delete display control variable as true(Explained in calc.updateDisplay)
        this.operation = button.textContent // Sets the operation variable to the desired operation
        this.numBuffer[0] = parseFloat(this.display.textContent) // Sets first number of the operation in the buffer(2 numbers only always)
    },

    exeOperation: function() {

        /** 
         * Executes and display the operation results 
         *  Function called by pressing equalButton 
        */

        this.numBuffer[1] = (parseFloat(this.display.textContent)) // Sets second number of the operation in the buffer

        // Sets the result variable based on the 
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
