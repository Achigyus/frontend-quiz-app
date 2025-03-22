"use strict";
// let mainBottom: HTMLElement | null = document.getElementById('main_bottom')
// let mainTop: HTMLElement | null = document.getElementById('main_top')
// let mainCont: HTMLElement | null = document.getElementById('main_cont')
// let headerCont: HTMLElement | null = document.getElementById('header_cont')
// let homeBtns1: NodeList = document.querySelectorAll('.main_botom_quiz_card')
// let themeToggle = document.getElementById('dark_light_toggle_switch') as HTMLInputElement | null
// const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// const sunIcon = document.getElementById("sunIcon") as HTMLImageElement | null;
// const moonIcon = document.getElementById("moonIcon") as HTMLImageElement | null;
// // vars
// let apiUrl = 'http://localhost:3000'
// let quizData: QuizData | null = null;
// let numberOfQuestions = 0
// let title = ''
// let icon = ''
// let currentQuestion: number
// let currentAnswer = ''
// let options = {
//     0: 'A',
//     1: 'B',
//     2: 'C',
//     3: 'D'
// }
// let correctAnswers = 0
// // Functions
// function updateTheme(theme: 'dark' | 'light'): void {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setItem('theme', theme);
//     if (sunIcon && moonIcon) {
//         sunIcon.src = theme === "dark" ? "./assets/images/icon-sun-light.svg" : "./assets/images/icon-sun-dark.svg";
//         moonIcon.src = theme === "dark" ? "./assets/images/icon-moon-light.svg" : "./assets/images/icon-moon-dark.svg";
//     }
// }
// function handleClick(e: Event) {
//     let element = e.target as HTMLElement
//     let id = element.id
//     console.log(element.id)
//     console.log(e)
//     if (id) {
//         fetchData(id)
//     }
// }
// async function fetchData(route: string) {
//     try {
//         let res = await fetch(`${apiUrl}/${route}`)
//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`)
//         }
//         const data = await res.json()
//         console.log(data)
//         quizData = data
//         updateVars(data)
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }
// let eg = {
//     "_id": "67d98bd7a01da6ce7ff02f1c",
//     "title": "Accessibility",
//     "icon": "./assets/images/icon-accessibility.svg",
//     "questions": [
//         {
//             "question": "What does 'WCAG' stand for?",
//             "options": [
//                 "Web Content Accessibility Guidelines",
//                 "Web Compliance Accessibility Guide",
//                 "Web Content Accessibility Goals",
//                 "Website Compliance and Accessibility Guidelines"
//             ],
//             "answer": "Web Content Accessibility Guidelines"
//         },
//         {
//             "question": "Which element is used to provide alternative text for images for screen reader users?",
//             "options": [
//                 "<alt>",
//                 "<figcaption>",
//                 "<description>",
//                 "<img alt='description'>"
//             ],
//             "answer": "<img alt='description'>"
//         },
//         {
//             "question": "What does ARIA stand for in web development?",
//             "options": [
//                 "Accessible Rich Internet Applications",
//                 "Advanced Responsive Internet Assistance",
//                 "Accessible Responsive Internet Applications",
//                 "Automated Responsive Internet Actions"
//             ],
//             "answer": "Accessible Rich Internet Applications"
//         },
//         {
//             "question": "Which of the following is not a principle of the WCAG?",
//             "options": [
//                 "Perceivable",
//                 "Dependable",
//                 "Operable",
//                 "Understandable"
//             ],
//             "answer": "Dependable"
//         },
//         {
//             "question": "Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?",
//             "options": [
//                 "3:1",
//                 "4.5:1",
//                 "7:1",
//                 "2:1"
//             ],
//             "answer": "4.5:1"
//         },
//         {
//             "question": "Which of the following elements is inherently focusable, meaning it can receive focus without a 'tabindex' attribute?",
//             "options": [
//                 "<div>",
//                 "<span>",
//                 "<a href='...'>",
//                 "<p>"
//             ],
//             "answer": "<a href='...'>"
//         },
//         {
//             "question": "What is the purpose of the 'lang' attribute in an HTML page?",
//             "options": [
//                 "To specify the scripting language",
//                 "To define the character set",
//                 "To indicate the language of the page content",
//                 "To declare a language pack"
//             ],
//             "answer": "To indicate the language of the page content"
//         },
//         {
//             "question": "Which guideline ensures that content is accessible by keyboard as well as by mouse?",
//             "options": [
//                 "Keyboard Accessible",
//                 "Mouse Independence",
//                 "Device Independence",
//                 "Operable Controls"
//             ],
//             "answer": "Keyboard Accessible"
//         },
//         {
//             "question": "What is the role of 'skip navigation' links in web accessibility?",
//             "options": [
//                 "To skip over primary navigation to the main content",
//                 "To provide shortcuts to different sections of the website",
//                 "To help users skip unwanted sections like advertisements",
//                 "To bypass broken links in the navigation"
//             ],
//             "answer": "To skip over primary navigation to the main content"
//         },
//         {
//             "question": "Which of these tools can help in checking the accessibility of a website?",
//             "options": [
//                 "W3C Validator",
//                 "Google Lighthouse",
//                 "CSS Validator",
//                 "JavaScript Console"
//             ],
//             "answer": "Google Lighthouse"
//         }
//     ]
// }
// interface QuizQuestion {
//     question: string;
//     options: string[];
//     answer: string;
// }
// interface QuizData {
//     _id: string;
//     title: string;
//     icon: string;
//     questions: QuizQuestion[];
// }
// function updateVars(object: QuizData) {
//     if (object) {
//         title = object.title;
//         numberOfQuestions = object.questions.length;
//         icon = object.icon;
//         currentQuestion = 0;
//         updateUI(object.questions[0]);
//     }
//     // console.log(title, numberOfQuestions, icon)
// }
// function updateUI(question: QuizQuestion) {
//     currentAnswer = question.answer;
//     if (mainCont) mainCont.innerHTML = '';
//     if (headerCont) {
//         let headerImg = headerCont.querySelector('img') as HTMLImageElement;
//         headerImg.src = icon;
//         let imgCont = headerCont.querySelector('.header_logo_img_cont') as HTMLDivElement;
//         imgCont.classList = `header_logo_img_cont ${title.toLowerCase()}`;
//         let headerTitle = headerCont.querySelector('p') as HTMLParagraphElement;
//         headerTitle.textContent = title;
//         headerCont.classList.add('active')
//     }
//     let form: HTMLFormElement = document.createElement('form');
//     form.innerHTML = `
//         <div class="top_form_div">
//             <label class="form_range_label" for="form_range">Question ${currentQuestion + 1} of ${numberOfQuestions}</label>
//             <label class="form_qtn_label" for="form_qtn">${question.question.replace('<br>', '&lt;br&gt')}</label>
//             <div class="form_range_cont">
//                 <div class="form_range"></div>
//             </div>
//         </div>
//         <div class="bottom_form_div" id="optionsContainer"></div>
//     `;
//     let formRange: HTMLInputElement | null = form.querySelector('.form_range');
//     if (formRange) {
//         let valuePercentage: number = ((currentQuestion) / 10) * 100;
//         // Update the track gradient
//         formRange.style.width = `${valuePercentage}%`;
//     }
//     let optionsContainer: HTMLElement | null = form.querySelector('#optionsContainer');
//     question.options.forEach((option: string, index: number) => {
//         let optionInput: HTMLInputElement = document.createElement('input');
//         optionInput.type = 'radio';
//         optionInput.name = 'answer'; // Same name for all radio buttons
//         optionInput.id = `option_${index}`;
//         optionInput.value = option; // Set value for comparison
//         let optionLabel: HTMLLabelElement = document.createElement('label');
//         optionLabel.setAttribute('for', `option_${index}`);
//         let optionDiv: HTMLDivElement = document.createElement('div');
//         optionDiv.classList.add('option_div', 'fw500');
//         optionDiv.textContent = options[index as keyof typeof options]
//         optionLabel.appendChild(optionDiv)
//         optionLabel.append(option, optionInput);
//         optionLabel.classList.add('fw500');
//         optionsContainer?.append(optionLabel);
//     });
//     let subBtn = document.createElement('button')
//     subBtn.id = 'submitBtn'
//     subBtn.type = 'submit'
//     subBtn.textContent = 'Submit Answer'
//     subBtn.className = 'fw500'
//     optionsContainer?.appendChild(subBtn)
//     let errorP = document.createElement('p')
//     errorP.className = 'error_p'
//     let errorImg = document.createElement('img')
//     errorImg.src = './assets/images/icon-error.svg'
//     errorP.append(errorImg, 'Please select an answer')
//     optionsContainer?.appendChild(errorP)
//     let submitBtn: HTMLButtonElement | null = form.querySelector('#submitBtn');
//     let errorPElement: HTMLParagraphElement | null = form.querySelector('.error_p');
//     form.addEventListener('submit', (e: Event) => {
//         e.preventDefault();
//         let selectedOption: HTMLInputElement | null = form.querySelector('input[name="answer"]:checked') as HTMLInputElement;
//         let selectedOptionLabel: HTMLLabelElement | null = form.querySelector(`label[for="${selectedOption?.id}"]`) as HTMLLabelElement;
//         if (selectedOption) {
//             if (selectedOption.value === currentAnswer) {
//                 console.log('Correct!');
//                 correctAnswers++
//                 console.log(correctAnswers)
//                 selectedOptionLabel?.classList.add('correct')
//                 let correctImg = document.createElement('img')
//                 correctImg.className = 'anwered_option_img'
//                 correctImg.src = './assets/images/icon-correct.svg'
//                 selectedOptionLabel?.append(correctImg)
//             } else {
//                 console.log('Incorrect.');
//                 selectedOptionLabel?.classList.add('incorrect')
//                 let inCorrectImg = document.createElement('img')
//                 inCorrectImg.className = 'anwered_option_img'
//                 inCorrectImg.src = './assets/images/icon-incorrect.svg'
//                 selectedOptionLabel?.append(inCorrectImg)
//                 let correctOptionLabel: HTMLLabelElement | null = form.querySelector(`label[for="option_${question.options.indexOf(currentAnswer)}"]`) as HTMLLabelElement;
//                 let correctImg = document.createElement('img')
//                 correctImg.className = 'anwered_option_img'
//                 correctImg.src = './assets/images/icon-correct.svg'
//                 correctOptionLabel?.append(correctImg)
//             }
//             if (formRange) {
//                 let valuePercentage: number = ((currentQuestion+1) / 10) * 100;
//                 // Update the track gradient
//                 formRange.style.width = `${valuePercentage}%`;
//             }
//             document.querySelectorAll('input[name="answer"]').forEach((input) => {
//                 (input as HTMLInputElement).disabled = true;
//                 let label = document.querySelector(`label[for="${input.id}"]`);
//                 if (label) label.classList.add('disabled_option');
//             });
//             // Change "Submit" to "Next"
//             if (submitBtn) {
//                 submitBtn.textContent = 'Next Question';
//                 submitBtn.type = 'button';
//                 // Load next question when "Next" is clicked
//                 submitBtn.addEventListener('click', () => {
//                     if (currentQuestion < numberOfQuestions - 1) {
//                         currentQuestion++;
//                         if (quizData?.questions[currentQuestion]) {
//                             updateUI(quizData.questions[currentQuestion]);
//                         } else {
//                             console.error('Question data is undefined.');
//                         }
//                     } else {
//                         console.log('Quiz finished!');
//                         upDateEndOfQuiz()
//                     }
//                 }, { once: true });
//             }
//         } else {
//             if (errorPElement) {
//                 errorPElement.classList.add('active')
//                 setTimeout(() => {
//                     errorPElement.classList.remove('active')
//                 }, 3000)
//             }
//             console.log('No answer selected.');
//         }
//     });
//     mainCont?.appendChild(form);
// }
// function upDateEndOfQuiz() {
//     if (mainCont) {
//         mainCont.innerHTML = `
//         <div class="top_form_div">
//           <div class="quiz_comp_p">
//             <p class="you_comp">Quiz completed</p>
//             <p class="you_score"><strong>You scored...</strong></p>
//           </div>
//         </div>
//         <div class="bottom_form_div" id="optionsContainer">
//           <div class="score_cont">
//             <div class="main_logo_title">
//               <div class="main_logo_img_cont ${title.toLowerCase()}">
//                 <img src="${icon}" alt="#" class="main_logo_img" id="main_logo_img">
//               </div>
//               <p class="main_title fw500" id="main_title">${title}</p>
//             </div>
//             <p class="quiz_score fw500">${correctAnswers}</p>
//             <p class="total_questions fw400">out of 10</p>
//           </div>
//           <button type="submit" id="submitBtn" class="fw500">Play Again</button>
//         </div>
//     `;
//         let optionsContainer = mainCont.querySelector('#submitBtn');
//         optionsContainer?.addEventListener('click', (e) => {
//             if (mainCont) mainCont.innerHTML = `
//             <div class="main_top" id="main_top">
//           <h1 class="main_top_h1 fw300">Welcome to the <span>Frontend Quiz!</span></h1>
//           <p class="main_top_p fw400">Pick a subject to get started.</p>
//         </div>
//         <div class="main_bottom" id="main_bottom">
//           <button class="main_botom_quiz_card fw500" id="html">
//             <div class="main_botom_quiz_card_img_cont">
//               <img src="./assets/images/icon-html.svg" alt="#" class="main_botom_quiz_card_img">
//             </div>
//             HTML
//           </button>
//           <button class="main_botom_quiz_card fw500" id="css">
//             <div class="main_botom_quiz_card_img_cont">
//               <img src="./assets/images/icon-css.svg" alt="#" class="main_botom_quiz_card_img">
//             </div>
//             CSS
//           </button>
//           <button class="main_botom_quiz_card fw500" id="javascript">
//             <div class="main_botom_quiz_card_img_cont">
//               <img src="./assets/images/icon-js.svg" alt="#" class="main_botom_quiz_card_img">
//             </div>
//             JavaScript
//           </button>
//           <button class="main_botom_quiz_card fw500" id="accessibility">
//             <div class="main_botom_quiz_card_img_cont">
//               <img src="./assets/images/icon-accessibility.svg" alt="#" class="main_botom_quiz_card_img">
//             </div>
//             Accessibility
//           </button>
//         </div> 
//         `;
//             headerCont?.classList.remove('active')
//             mainCont?.querySelectorAll('.main_botom_quiz_card')?.forEach((node) => {
//                 node?.addEventListener('click', handleClick)
//             })
//         });
//         correctAnswers = 0;
//     }
// }
// const savedTheme = localStorage.getItem("theme") ||
//     (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
// updateTheme(savedTheme as 'dark' | 'light');
// if (themeToggle) {
//     themeToggle.checked = savedTheme === "dark";
// }
// // Event Listeners
// homeBtns1?.forEach((node) => {
//     node?.addEventListener('click', handleClick)
// })
// themeToggle?.addEventListener("change", () => {
//     updateTheme(themeToggle?.checked ? "dark" : "light");
// })
