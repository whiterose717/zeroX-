// human-verification.js
document.addEventListener('DOMContentLoaded', function() {
    const verificationForm = document.getElementById('human-verification');
    if (verificationForm) {
      verificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
          alert('Please complete the CAPTCHA verification.');
          return;
        }
        
        const answer = document.getElementById('verification-answer').value.trim();
        const expectedAnswer = verificationForm.dataset.answer;
        
        if (answer.toLowerCase() !== expectedAnswer.toLowerCase()) {
          alert('Incorrect answer. Please try again.');
          return;
        }
        
        // If verification passes, submit the form
        verificationForm.submit();
      });
      
      // Generate a simple math question
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operators = ['+', '-', '*'];
      const operator = operators[Math.floor(Math.random() * operators.length)];
      
      let question = '';
      let answer = 0;
      
      switch(operator) {
        case '+':
          question = `${num1} + ${num2}`;
          answer = num1 + num2;
          break;
        case '-':
          question = `${num1} - ${num2}`;
          answer = num1 - num2;
          break;
        case '*':
          question = `${num1} * ${num2}`;
          answer = num1 * num2;
          break;
      }
      
      document.getElementById('verification-question').textContent = question;
      verificationForm.dataset.answer = answer.toString();
    }
    
    // Initialize reCAPTCHA
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(function() {
        grecaptcha.execute('your-recaptcha-site-key', {action: 'submit'});
      });
    }
  });