// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Check length
    if (password.length >= 8) {
        document.getElementById('req-length').style.color = '#4bb543';
        strength += 1;
    } else {
        document.getElementById('req-length').style.color = '#ff3c38';
    }
    
    // Check uppercase letters
    if (/[A-Z]/.test(password)) {
        document.getElementById('req-uppercase').style.color = '#4bb543';
        strength += 1;
    } else {
        document.getElementById('req-uppercase').style.color = '#ff3c38';
    }
    
    // Check numbers
    if (/[0-9]/.test(password)) {
        document.getElementById('req-number').style.color = '#4bb543';
        strength += 1;
    } else {
        document.getElementById('req-number').style.color = '#ff3c38';
    }
    
    // Check special characters
    if (/[^A-Za-z0-9]/.test(password)) {
        document.getElementById('req-special').style.color = '#4bb543';
        strength += 1;
    } else {
        document.getElementById('req-special').style.color = '#ff3c38';
    }
    
    // Update strength meter
    const meter = document.getElementById('strength-meter');
    if (strength === 0) {
        meter.style.width = '0%';
        meter.style.backgroundColor = '#ff3c38';
    } else if (strength === 1) {
        meter.style.width = '25%';
        meter.style.backgroundColor = '#ff3c38';
    } else if (strength === 2) {
        meter.style.width = '50%';
        meter.style.backgroundColor = '#ffa400';
    } else if (strength === 3) {
        meter.style.width = '75%';
        meter.style.backgroundColor = '#009ffd';
    } else if (strength === 4) {
        meter.style.width = '100%';
        meter.style.backgroundColor = '#4bb543';
    }
    
    return strength;
}

// Check password match
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const matchDiv = document.getElementById('password-match');
    
    if (password && confirmPassword) {
        if (password === confirmPassword) {
            matchDiv.innerHTML = '<span style="color:#4bb543">Passwords match!</span>';
            return true;
        } else {
            matchDiv.innerHTML = '<span style="color:#ff3c38">Passwords do not match</span>';
            return false;
        }
    }
    return false;
}

// Form validation
document.addEventListener('DOMContentLoaded', () => {
    // Password strength check
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // Password match check
    const confirmPasswordInput = document.getElementById('confirm-password');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this to your backend
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Login attempt with:', email, password);
            alert('Login functionality would connect to your backend in a real implementation');
        });
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check password strength and match
            const password = document.getElementById('password').value;
            const strength = checkPasswordStrength(password);
            const isMatch = checkPasswordMatch();
            
            if (strength < 3) {
                alert('Please choose a stronger password');
                return;
            }
            
            if (!isMatch) {
                alert('Passwords do not match');
                return;
            }
            
            if (!document.getElementById('terms').checked) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            // In a real implementation, you would send this to your backend
            const formData = {
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                username: document.getElementById('username').value,
                password: password
            };
            
            console.log('Signup attempt with:', formData);
            alert('Signup functionality would connect to your backend in a real implementation');
        });
    }
});

// Human verification for sensitive actions
function requireVerification(actionCallback) {
    const verificationModal = document.getElementById('verification-modal');
    const verifyBtn = document.getElementById('verify-btn');
    const challengeDiv = document.getElementById('verification-challenge');
    
    // Generate a simple math challenge
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    switch(operator) {
        case '+': answer = num1 + num2; break;
        case '-': answer = num1 - num2; break;
        case '*': answer = num1 * num2; break;
    }
    
    challengeDiv.innerHTML = `
        <p>Please solve this simple math problem to verify you're human:</p>
        <p class="challenge">${num1} ${operator} ${num2} = ?</p>
        <input type="number" id="answer-input" placeholder="Your answer">
    `;
    
    verificationModal.style.display = 'block';
    
    verifyBtn.onclick = function() {
        const userAnswer = parseInt(document.getElementById('answer-input').value);
        
        if(userAnswer === answer) {
            verificationModal.style.display = 'none';
            if(actionCallback) actionCallback();
        } else {
            challengeDiv.innerHTML += `<p class="error" style="color:#ff3c38">Incorrect answer. Please try again.</p>`;
        }
    };
}