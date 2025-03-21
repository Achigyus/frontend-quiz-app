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
let header_logo = document.getElementById('header_logo_img');
let header_title = document.getElementById('header_title');
let homeBtns1 = document.querySelectorAll('.main_botom_quiz_card');
let themeToggle = document.getElementById('dark_light_toggle_switch');
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
// vars
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
let eg = {
    "_id": "67d98bd7a01da6ce7ff02f1c",
    "title": "Accessibility",
    "icon": "./assets/images/icon-accessibility.svg",
    "questions": [
        {
            "question": "What does 'WCAG' stand for?",
            "options": [
                "Web Content Accessibility Guidelines",
                "Web Compliance Accessibility Guide",
                "Web Content Accessibility Goals",
                "Website Compliance and Accessibility Guidelines"
            ],
            "answer": "Web Content Accessibility Guidelines"
        },
        {
            "question": "Which element is used to provide alternative text for images for screen reader users?",
            "options": [
                "<alt>",
                "<figcaption>",
                "<description>",
                "<img alt='description'>"
            ],
            "answer": "<img alt='description'>"
        },
        {
            "question": "What does ARIA stand for in web development?",
            "options": [
                "Accessible Rich Internet Applications",
                "Advanced Responsive Internet Assistance",
                "Accessible Responsive Internet Applications",
                "Automated Responsive Internet Actions"
            ],
            "answer": "Accessible Rich Internet Applications"
        },
        {
            "question": "Which of the following is not a principle of the WCAG?",
            "options": [
                "Perceivable",
                "Dependable",
                "Operable",
                "Understandable"
            ],
            "answer": "Dependable"
        },
        {
            "question": "Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?",
            "options": [
                "3:1",
                "4.5:1",
                "7:1",
                "2:1"
            ],
            "answer": "4.5:1"
        },
        {
            "question": "Which of the following elements is inherently focusable, meaning it can receive focus without a 'tabindex' attribute?",
            "options": [
                "<div>",
                "<span>",
                "<a href='...'>",
                "<p>"
            ],
            "answer": "<a href='...'>"
        },
        {
            "question": "What is the purpose of the 'lang' attribute in an HTML page?",
            "options": [
                "To specify the scripting language",
                "To define the character set",
                "To indicate the language of the page content",
                "To declare a language pack"
            ],
            "answer": "To indicate the language of the page content"
        },
        {
            "question": "Which guideline ensures that content is accessible by keyboard as well as by mouse?",
            "options": [
                "Keyboard Accessible",
                "Mouse Independence",
                "Device Independence",
                "Operable Controls"
            ],
            "answer": "Keyboard Accessible"
        },
        {
            "question": "What is the role of 'skip navigation' links in web accessibility?",
            "options": [
                "To skip over primary navigation to the main content",
                "To provide shortcuts to different sections of the website",
                "To help users skip unwanted sections like advertisements",
                "To bypass broken links in the navigation"
            ],
            "answer": "To skip over primary navigation to the main content"
        },
        {
            "question": "Which of these tools can help in checking the accessibility of a website?",
            "options": [
                "W3C Validator",
                "Google Lighthouse",
                "CSS Validator",
                "JavaScript Console"
            ],
            "answer": "Google Lighthouse"
        }
    ]
};
function updateVars(object) {
    if (object) {
        title = object.title;
        numberOfQuestions = object.questions.length;
        if (header_title)
            header_title.textContent = title;
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
    let form = document.createElement('form');
    form.innerHTML = `
        <div class="top_form_div">
            <label class="form_range_label" for="form_range">Question ${currentQuestion + 1} of ${numberOfQuestions}</label>
            <label class="form_qtn_label" for="form_qtn">${question.question}</label>
            <input type="range" class="form_range" name="form_range" min="1" max="10">
        </div>
        <div class="bottom_form_div" id="optionsContainer"></div>
        <button type="submit" id="submitBtn">Submit</button>
    `;
    let formRange = form.querySelector('.form_range');
    if (formRange) {
        let valuePercentage = ((currentQuestion) / 10) * 100;
        formRange.style.background = `linear-gradient(to right, #A4FFAF ${valuePercentage}%, #18171F ${valuePercentage}%)`;
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
        optionLabel.textContent = option;
        optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.append(optionInput, optionLabel);
    });
    let submitBtn = form.querySelector('#submitBtn');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let selectedOption = form.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            if (selectedOption.value === currentAnswer) {
                console.log('Correct!');
                correctAnswers++;
                console.log(correctAnswers);
            }
            else {
                console.log('Incorrect.');
            }
            // Change "Submit" to "Next"
            if (submitBtn) {
                submitBtn.textContent = 'Next';
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
            console.log('No answer selected.');
        }
    });
    mainCont === null || mainCont === void 0 ? void 0 : mainCont.appendChild(form);
}
function upDateEndOfQuiz() {
    if (mainCont)
        mainCont.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="top_form_div">
            <p>Quiz completed</p>
            <p><em>You scored...</em></p>
        </div>
        <div class="bottom_form_div" id="optionsContainer">
            <div class="header_logo_img_cont">
                <img src=${icon} alt="#" class="header_logo_img" id="header_logo_img">
            </div>
            <p class="header_title" id="header_title">${title}</p>
            <p class="quiz_score">${correctAnswers}</p>
            <p class="total_questions">out of ${numberOfQuestions}</p>
        </div>
        <button type="submit" id="submitBtn">Play Again</button>
    `;
    let optionsContainer = div.querySelector('#submitBtn');
    optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.addEventListener('click', (e) => {
        var _a;
        if (mainCont)
            mainCont.innerHTML = `
            <div class="main_top" id="main_top">
                <h1 class="main_top_h1">Welcome to the <span>Frontend Quiz!</span></h1>
                <p class="main_top_p">Pick a subject to get started.</p>
            </div>  

            <div class="main_bottom" id="main_bottom">
                <button class="main_botom_quiz_card" id="html">
                    <div class="main_botom_quiz_card_img_cont">
                    <img src="#" alt="#" class="main_botom_quiz_card_img">
                    </div>
                    HTML
                </button>

                <button class="main_botom_quiz_card" id="css">
                    <div class="main_botom_quiz_card_img_cont">
                    <img src="#" alt="#" class="main_botom_quiz_card_img">
                    </div>
                    CSS
                </button>

                <button class="main_botom_quiz_card" id="javascript">
                    <div class="main_botom_quiz_card_img_cont">
                    <img src="#" alt="#" class="main_botom_quiz_card_img">
                    </div>
                    JavaScript
                </button>

                <button class="main_botom_quiz_card" id="accessibility">
                    <div class="main_botom_quiz_card_img_cont">
                    <img src="#" alt="#" class="main_botom_quiz_card_img">
                    </div>
                    Accessibility
                </button>
            </div>
        `;
        (_a = mainCont === null || mainCont === void 0 ? void 0 : mainCont.querySelectorAll('.main_botom_quiz_card')) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
            node === null || node === void 0 ? void 0 : node.addEventListener('click', handleClick);
        });
    });
    mainCont === null || mainCont === void 0 ? void 0 : mainCont.appendChild(div);
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
