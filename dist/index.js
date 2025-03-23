"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let mainBottom = document.getElementById('main_bottom');
let mainTop = document.getElementById('main_top');
let mainCont = document.getElementById('main_cont');
let headerCont = document.getElementById('header_cont');
let homeBtns1 = document.querySelectorAll('.main_botom_quiz_card');
let themeToggle = document.getElementById('dark_light_toggle_switch');
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
// vars
// let apiUrl = 'https://frontend-quiz-app-3tqr.onrender.com'
let apiUrl = 'http://localhost:3000';
let quizData = null;
let numberOfQuestions = 0;
let title = '';
let icon = '';
let currentQuestion;
let currentAnswer = '';
let options = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D'
};
let correctAnswers = 0;
// Functions
function updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (sunIcon && moonIcon) {
        sunIcon.src = theme === "dark" ? "./assets/images/icon-sun-light.svg" : "./assets/images/icon-sun-dark.svg";
        moonIcon.src = theme === "dark" ? "./assets/images/icon-moon-light.svg" : "./assets/images/icon-moon-dark.svg";
    }
}
function handleClick(e) {
    let element = e.target;
    let id = element.id;
    console.log(element.id);
    console.log(e);
    if (id) {
        fetchData(id);
    }
}
function fetchData(route) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield fetch(`${apiUrl}/${route}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = yield res.json();
            console.log(data);
            quizData = data;
            updateVars(data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
function updateVars(object) {
    if (object) {
        title = object.title;
        numberOfQuestions = object.questions.length;
        icon = object.icon;
        currentQuestion = 0;
        updateUI(object.questions[0]);
    }
    // console.log(title, numberOfQuestions, icon)
}
function updateUI(question) {
    currentAnswer = question.answer;
    if (mainCont)
        mainCont.innerHTML = '';
    if (headerCont) {
        let headerImg = headerCont.querySelector('img');
        headerImg.src = icon;
        let imgCont = headerCont.querySelector('.header_logo_img_cont');
        imgCont.classList = `header_logo_img_cont ${title.toLowerCase()}`;
        let headerTitle = headerCont.querySelector('p');
        headerTitle.textContent = title;
        headerCont.classList.add('active');
    }
    let form = document.createElement('form');
    form.innerHTML = `
        <div class="top_form_div">
            <label class="form_range_label" for="form_range">Question ${currentQuestion + 1} of ${numberOfQuestions}</label>
            <label class="form_qtn_label" for="form_qtn">${question.question.replace('<br>', '&lt;br&gt')}</label>
            <div class="form_range_cont">
                <div class="form_range"></div>
            </div>
        </div>
        <div class="bottom_form_div" id="optionsContainer"></div>
    `;
    let formRange = form.querySelector('.form_range');
    if (formRange) {
        let valuePercentage = ((currentQuestion) / 10) * 100;
        // Update the track gradient
        formRange.style.width = `${valuePercentage}%`;
    }
    let optionsContainer = form.querySelector('#optionsContainer');
    question.options.forEach((option, index) => {
        let optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'answer'; // Same name for all radio buttons
        optionInput.id = `option_${index}`;
        optionInput.value = option; // Set value for comparison
        let optionLabel = document.createElement('label');
        optionLabel.setAttribute('for', `option_${index}`);
        let optionDiv = document.createElement('div');
        optionDiv.classList.add('option_div', 'fw500');
        optionDiv.textContent = options[index];
        optionLabel.appendChild(optionDiv);
        optionLabel.append(option, optionInput);
        optionLabel.classList.add('fw500');
        optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.append(optionLabel);
    });
    let subBtn = document.createElement('button');
    subBtn.id = 'submitBtn';
    subBtn.type = 'submit';
    subBtn.textContent = 'Submit Answer';
    subBtn.className = 'fw500';
    optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.appendChild(subBtn);
    let errorP = document.createElement('p');
    errorP.className = 'error_p';
    let errorImg = document.createElement('img');
    errorImg.src = './assets/images/icon-error.svg';
    errorP.append(errorImg, 'Please select an answer');
    optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.appendChild(errorP);
    let submitBtn = form.querySelector('#submitBtn');
    let errorPElement = form.querySelector('.error_p');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let selectedOption = form.querySelector('input[name="answer"]:checked');
        let selectedOptionLabel = form.querySelector(`label[for="${selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.id}"]`);
        if (selectedOption) {
            if (selectedOption.value === currentAnswer) {
                console.log('Correct!');
                correctAnswers++;
                console.log(correctAnswers);
                selectedOptionLabel === null || selectedOptionLabel === void 0 ? void 0 : selectedOptionLabel.classList.add('correct');
                let correctImg = document.createElement('img');
                correctImg.className = 'anwered_option_img';
                correctImg.src = './assets/images/icon-correct.svg';
                selectedOptionLabel === null || selectedOptionLabel === void 0 ? void 0 : selectedOptionLabel.append(correctImg);
            }
            else {
                console.log('Incorrect.');
                selectedOptionLabel === null || selectedOptionLabel === void 0 ? void 0 : selectedOptionLabel.classList.add('incorrect');
                let inCorrectImg = document.createElement('img');
                inCorrectImg.className = 'anwered_option_img';
                inCorrectImg.src = './assets/images/icon-incorrect.svg';
                selectedOptionLabel === null || selectedOptionLabel === void 0 ? void 0 : selectedOptionLabel.append(inCorrectImg);
                let correctOptionLabel = form.querySelector(`label[for="option_${question.options.indexOf(currentAnswer)}"]`);
                let correctImg = document.createElement('img');
                correctImg.className = 'anwered_option_img';
                correctImg.src = './assets/images/icon-correct.svg';
                correctOptionLabel === null || correctOptionLabel === void 0 ? void 0 : correctOptionLabel.append(correctImg);
            }
            if (formRange) {
                let valuePercentage = ((currentQuestion + 1) / 10) * 100;
                // Update the track gradient
                formRange.style.width = `${valuePercentage}%`;
            }
            document.querySelectorAll('input[name="answer"]').forEach((input) => {
                input.disabled = true;
                let label = document.querySelector(`label[for="${input.id}"]`);
                if (label)
                    label.classList.add('disabled_option');
            });
            // Change "Submit" to "Next"
            if (submitBtn) {
                submitBtn.textContent = 'Next Question';
                submitBtn.type = 'button';
                // Load next question when "Next" is clicked
                submitBtn.addEventListener('click', () => {
                    if (currentQuestion < numberOfQuestions - 1) {
                        currentQuestion++;
                        if (quizData === null || quizData === void 0 ? void 0 : quizData.questions[currentQuestion]) {
                            updateUI(quizData.questions[currentQuestion]);
                        }
                        else {
                            console.error('Question data is undefined.');
                        }
                    }
                    else {
                        console.log('Quiz finished!');
                        upDateEndOfQuiz();
                    }
                }, { once: true });
            }
        }
        else {
            if (errorPElement) {
                errorPElement.classList.add('active');
                setTimeout(() => {
                    errorPElement.classList.remove('active');
                }, 3000);
            }
            console.log('No answer selected.');
        }
    });
    mainCont === null || mainCont === void 0 ? void 0 : mainCont.appendChild(form);
}
function upDateEndOfQuiz() {
    if (mainCont) {
        mainCont.innerHTML = `
        <div class="top_form_div">
          <div class="quiz_comp_p">
            <p class="you_comp">Quiz completed</p>
            <p class="you_score"><strong>You scored...</strong></p>
          </div>

        </div>
        <div class="bottom_form_div" id="optionsContainer">
          <div class="score_cont">
            <div class="main_logo_title">
              <div class="main_logo_img_cont ${title.toLowerCase()}">
                <img src="${icon}" alt="#" class="main_logo_img" id="main_logo_img">
              </div>
              <p class="main_title fw500" id="main_title">${title}</p>
            </div>
            <p class="quiz_score fw500">${correctAnswers}</p>
            <p class="total_questions fw400">out of 10</p>
          </div>
          <button type="submit" id="submitBtn" class="fw500">Play Again</button>
        </div>
    `;
        let optionsContainer = mainCont.querySelector('#submitBtn');
        optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.addEventListener('click', (e) => {
            var _a;
            if (mainCont)
                mainCont.innerHTML = `
            <div class="main_top" id="main_top">
          <h1 class="main_top_h1 fw300">Welcome to the <span>Frontend Quiz!</span></h1>
          <p class="main_top_p fw400">Pick a subject to get started.</p>
        </div>

        <div class="main_bottom" id="main_bottom">
          <button class="main_botom_quiz_card fw500" id="html">
            <div class="main_botom_quiz_card_img_cont">
              <img src="./assets/images/icon-html.svg" alt="#" class="main_botom_quiz_card_img">
            </div>
            HTML
          </button>

          <button class="main_botom_quiz_card fw500" id="css">
            <div class="main_botom_quiz_card_img_cont">
              <img src="./assets/images/icon-css.svg" alt="#" class="main_botom_quiz_card_img">
            </div>
            CSS
          </button>

          <button class="main_botom_quiz_card fw500" id="javascript">
            <div class="main_botom_quiz_card_img_cont">
              <img src="./assets/images/icon-js.svg" alt="#" class="main_botom_quiz_card_img">
            </div>
            JavaScript
          </button>

          <button class="main_botom_quiz_card fw500" id="accessibility">
            <div class="main_botom_quiz_card_img_cont">
              <img src="./assets/images/icon-accessibility.svg" alt="#" class="main_botom_quiz_card_img">
            </div>
            Accessibility
          </button>
        </div> 
        `;
            headerCont === null || headerCont === void 0 ? void 0 : headerCont.classList.remove('active');
            (_a = mainCont === null || mainCont === void 0 ? void 0 : mainCont.querySelectorAll('.main_botom_quiz_card')) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
                node === null || node === void 0 ? void 0 : node.addEventListener('click', handleClick);
            });
        });
        correctAnswers = 0;
    }
}
const savedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
updateTheme(savedTheme);
if (themeToggle) {
    themeToggle.checked = savedTheme === "dark";
}
// Event Listeners
homeBtns1 === null || homeBtns1 === void 0 ? void 0 : homeBtns1.forEach((node) => {
    node === null || node === void 0 ? void 0 : node.addEventListener('click', handleClick);
});
themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.addEventListener("change", () => {
    updateTheme((themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.checked) ? "dark" : "light");
});
