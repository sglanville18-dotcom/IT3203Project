// Quiz logic for the HTTP self-check page.
// This file grades answers, shows results on the same page, and supports a full reset.
document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quizForm");
  const resetBtn = document.getElementById("resetBtn");
  const resultsPanel = document.getElementById("results");
  const summaryResult = document.getElementById("summaryResult");
  const questionResults = document.getElementById("questionResults");

  const answerKey = {
    blankQuestion: "hypertext transfer protocol",
    q2: "GET",
    q3: "Resource Missing",
    q4: "Encryption",
    q5: ["Headers", "Status Codes", "Request Methods"]
  };

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let totalScore = 0;
    const totalQuestions = 5;
    let resultHtml = "";

    const blankInput = document.getElementById("blankQuestion").value.trim().toLowerCase();
    const blankCorrect = blankInput === answerKey.blankQuestion;
    if (blankCorrect) totalScore++;
    resultHtml += buildResultBlock(1, blankCorrect, "Hypertext Transfer Protocol", blankInput || "No answer entered");

    const q2Answer = getRadioValue("q2");
    const q2Correct = q2Answer === answerKey.q2;
    if (q2Correct) totalScore++;
    resultHtml += buildResultBlock(2, q2Correct, "GET", q2Answer || "No answer selected");

    const q3Answer = getRadioValue("q3");
    const q3Correct = q3Answer === answerKey.q3;
    if (q3Correct) totalScore++;
    resultHtml += buildResultBlock(3, q3Correct, "The requested page or resource could not be found", q3Answer || "No answer selected");

    const q4Answer = getRadioValue("q4");
    const q4Correct = q4Answer === answerKey.q4;
    if (q4Correct) totalScore++;
    resultHtml += buildResultBlock(4, q4Correct, "It adds encryption and helps protect data in transit", q4Answer || "No answer selected");

    const q5Answers = getCheckboxValues("q5");
    const q5Correct = arraysMatch(q5Answers.slice().sort(), answerKey.q5.slice().sort());
    if (q5Correct) totalScore++;
    resultHtml += buildResultBlock(5, q5Correct, "Headers, Status codes, Request methods", q5Answers.length ? q5Answers.join(", ") : "No answer selected");

    const percentScore = Math.round((totalScore / totalQuestions) * 100);
    const passed = percentScore >= 70;

    summaryResult.innerHTML = `
      <div class="${passed ? "pass-box" : "fail-box"}">
        <p><strong>Overall Result:</strong> ${passed ? "PASS" : "FAIL"}</p>
        <p><strong>Total Score:</strong> ${totalScore}/${totalQuestions} (${percentScore}%)</p>
      </div>
    `;

    questionResults.innerHTML = resultHtml;
    resultsPanel.classList.remove("hidden");
    resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetBtn.addEventListener("click", () => {
    quizForm.reset();
    summaryResult.innerHTML = "";
    questionResults.innerHTML = "";
    resultsPanel.classList.add("hidden");
  });

  function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
  }

  function getCheckboxValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((item) => item.value);
  }

  function arraysMatch(firstArray, secondArray) {
    return firstArray.length === secondArray.length && firstArray.every((value, index) => value === secondArray[index]);
  }

  function buildResultBlock(questionNumber, isCorrect, correctAnswer, userAnswer) {
    return `
      <div class="result-item ${isCorrect ? "result-good" : "result-bad"}">
        <p><strong>Question ${questionNumber}</strong></p>
        <p>Result: <span class="${isCorrect ? "correct" : "incorrect"}">${isCorrect ? "Correct" : "Incorrect"}</span></p>
        <p>Your answer: ${userAnswer}</p>
        <p>Correct answer: ${correctAnswer}</p>
      </div>
    `;
  }
});
