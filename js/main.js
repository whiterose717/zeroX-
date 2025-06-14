// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Human Verification
const verificationModal = document.getElementById('verification-modal');
const verifyBtn = document.getElementById('verify-btn');
const closeBtn = document.querySelector('.close');
const challengeDiv = document.getElementById('verification-challenge');

// Generate a simple math challenge
function generateChallenge() {
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
    
    return answer;
}

// Show verification modal on certain actions
function showVerification(actionCallback) {
    const correctAnswer = generateChallenge();
    verificationModal.style.display = 'block';
    
    verifyBtn.onclick = function() {
        const userAnswer = parseInt(document.getElementById('answer-input').value);
        
        if(userAnswer === correctAnswer) {
            verificationModal.style.display = 'none';
            if(actionCallback) actionCallback();
        } else {
            challengeDiv.innerHTML += `<p class="error">Incorrect answer. Please try again.</p>`;
            generateChallenge();
        }
    };
}

// Close modal
closeBtn.onclick = function() {
    verificationModal.style.display = 'none';
};

// Close when clicking outside modal
window.onclick = function(event) {
    if(event.target === verificationModal) {
        verificationModal.style.display = 'none';
    }
};

// Load news from cybersecurity sources
async function loadNews() {
    const newsGrid = document.getElementById('news-feed');
    newsGrid.innerHTML = '<p>Loading news...</p>';
    
    try {
        // In a real implementation, you would fetch from a backend API
        // that scrapes the news sites or uses their APIs with proper authentication
        
        // Mock data for demonstration
        const mockNews = [
            {
                title: "New Critical Vulnerability Discovered in Popular Web Framework",
                excerpt: "Researchers have found a zero-day vulnerability affecting millions of websites...",
                source: "The Hacker News",
                image: "https://via.placeholder.com/300x180?text=Security+News"
            },
            {
                title: "Major Data Breach Exposes Millions of User Records",
                excerpt: "A leading social media platform confirmed a data breach affecting over 10 million users...",
                source: "Krebs on Security",
                image: "https://via.placeholder.com/300x180?text=Data+Breach"
            },
            {
                title: "Government Releases New Cybersecurity Guidelines",
                excerpt: "New regulations aim to strengthen critical infrastructure against cyber attacks...",
                source: "CISA",
                image: "https://via.placeholder.com/300x180?text=Cybersecurity"
            }
        ];
        
        newsGrid.innerHTML = '';
        mockNews.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card slide-in';
            newsCard.innerHTML = `
                <div class="news-image" style="background-image: url('${news.image}')"></div>
                <div class="news-content">
                    <span class="news-source">${news.source}</span>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <a href="#" class="read-more">Read More →</a>
                </div>
            `;
            newsGrid.appendChild(newsCard);
        });
    } catch (error) {
        newsGrid.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        console.error('Error loading news:', error);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.mission-card, .service-item, .news-card, .tutorial-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('slide-in');
    });
    
    // Check if user needs verification for certain actions
    const actionsRequiringVerification = document.querySelectorAll('[data-verify]');
    actionsRequiringVerification.forEach(action => {
        action.addEventListener('click', (e) => {
            e.preventDefault();
            showVerification(() => {
                window.location.href = action.href;
            });
        });
    });
});