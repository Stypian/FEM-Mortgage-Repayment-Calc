onload = function() {
    const mortCalc = () => {
        const radioButt = document.querySelectorAll(".mort-calc__input-radio");
        const radioWrap = document.querySelectorAll(".mort-calc__input-wrap--radios");
        const inputs = document.querySelectorAll(".mort-calc__input");
        const inputWrap = document.querySelectorAll(".mort-calc__input-wrap");
        const submit = document.querySelector(".mort-calc__submit");
        const inputColor = document.querySelectorAll(".mort-calc__input-color");
        const inputColorText = document.querySelectorAll(".mort-calc__p--color");
        const errorMessage = document.querySelectorAll(".mort-calc__error-message");
        const normal = document.querySelector(".mort-calc__normal");
        const complete = document.querySelector(".mort-calc__complete");
        const errorArr = [...errorMessage];
        const rightNormal = document.querySelector(".mort-calc__normal");
        const rightComplete = document.querySelector(".mort-calc__complete");
        const clear = document.querySelector(".mort-calc__p--clear");
        const form = document.querySelector(".mort-calc__form");

        //change radio button container background color when checked
        const radioBackground = () => {
            for(let i = 0; i < radioButt.length; i++) {
                if (radioButt[i].checked === true) {
                    radioWrap[i].classList.add("mort-calc__radio-yellow");
                } else if (radioButt[i].checked === false) {
                    radioWrap[i].classList.remove("mort-calc__radio-yellow");
                } 
                radioButt[i].addEventListener("change", radioBackground);
            }
        }
        radioBackground();

        //add active input styles
        const inputFocus = () => {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener("focus", function() {
                    if (!errorMessage[i].classList.contains("mort-calc__error-show")) {
                      inputWrap[i].style.borderColor = 'hsl(61, 70%, 52%)';
                      inputColor[i].style.backgroundColor = 'hsl(61, 70%, 52%)';
                    }
                })
                inputs[i].addEventListener("blur", function() {
                    if (!errorMessage[i].classList.contains("mort-calc__error-show")) {
                        inputWrap[i].style.borderColor = '';
                        inputColor[i].style.backgroundColor = '';
                      }
                })
            }
        }

        //add error messages and colors
        const addErrors = () => {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value.length < 1) {
                    errorMessage[i].classList.add("mort-calc__error-show");
                } else if (inputs[i].value.length > 0) {
                    errorMessage[i].classList.remove("mort-calc__error-show");
                }
                if (errorMessage[i].classList.contains("mort-calc__error-show")) {
                    inputWrap[i].style.borderColor = 'hsl(4, 69%, 50%)';
                    inputColor[i].style.backgroundColor = 'hsl(4, 69%, 50%)';
                    inputColorText[i].style.color = '#fff';
                } else if (!errorMessage[i].classList.contains("mort-calc__error-show")) {
                    inputWrap[i].style.borderColor = '';
                    inputColor[i].style.backgroundColor = '';
                    inputColorText[i].style.color = '';
                }
            }
            if (radioButt[0].checked === false && radioButt[1].checked === false) {
                errorMessage[3].classList.add("mort-calc__error-show");
            } else if (radioButt[0].checked === true || radioButt[1].checked === true) {
                errorMessage[3].classList.remove("mort-calc__error-show");
            }
        }

        //payment calculations
        const calcPayments = () => {
            let repay = document.querySelector(".mort-calc__repay");
            let total = document.querySelector(".mort-calc__total");
            let p = inputs[0].value;
            let t = inputs[1].value;
            let r = inputs[2].value / 100;
            let n = 12;
            let top = p * (r / n) * Math.pow(1 + (r / n), (n * t));
            let bot = Math.pow((1 + (r / n)), (n * t)) - 1;
            let mp = top / bot;
            let rmp = mp.toFixed(2);
            rmp = parseFloat(rmp).toLocaleString();
            let tot1 = (mp * n) * t;
            tot1 = tot1.toFixed(2);
            tot1 = parseFloat(tot1).toLocaleString();
            let int = (p * r) / n;
            int = int.toFixed(2);
            int = parseFloat(int).toLocaleString();
            let intTot = mp - (p / t) / n;
            intTot = (intTot * n) * t;
            intTot = intTot.toFixed(2);
            intTot = parseFloat(intTot).toLocaleString();
            if (radioButt[0].checked === true) {
                repay.innerHTML = `&#163;${rmp}`;
                total.innerHTML = `&#163;${tot1}`;
            } else if (radioButt[1].checked === true) {
                repay.innerHTML = `&#163;${int}`;
                total.innerHTML = `&#163;${intTot}`;
            }
        }

        inputFocus();


        submit.addEventListener("click", function(e) {
            e.preventDefault();
            addErrors();
            if (inputs[0].value.length > 0 && errorArr.every(e => e.classList.contains("mort-calc__error-show") === false)) {
                normal.style.display = 'none';
                complete.style.display = 'flex';
                calcPayments();
            }
        })


        //clear form
        clear.addEventListener("click", function() {
            form.reset();
            for (let i = 0; i < radioWrap.length; i++) {
                radioWrap[i].classList.remove("mort-calc__radio-yellow");
            }
            errorArr.forEach(e => e.classList.remove("mort-calc__error-show"));
            for (let i = 0; i < inputs.length; i++) {
                inputWrap[i].style.borderColor = '';
                inputColor[i].style.backgroundColor = '';
                inputColorText[i].style.color = '';
            }
            normal.style.display = 'flex';
            complete.style.display = 'none';
        })

































    }




















    mortCalc();













}