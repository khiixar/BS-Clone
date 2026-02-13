
// Age Gate
function closeAgeGate() {
    document.getElementById('age-gate').style.display = 'none';
    localStorage.setItem('ageVerified', 'true');
}

function rejectAge() {
    alert('Sorry, you must be 18 or older to access this site.');
    window.location.href = 'https://www.google.com';
}

// Check if already verified
window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('ageVerified') === 'true') {
        const gate = document.getElementById('age-gate');
        if (gate) gate.style.display = 'none';
    }
});

// FAQ Accordion
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const allAnswers = document.querySelectorAll('.faq-answer');

    allAnswers.forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });

    answer.classList.toggle('active');
}

// Size selector for product pages
function selectSize(element) {
    document.querySelectorAll('.size-option').forEach(opt => {
        opt.style.background = 'white';
        opt.style.color = 'black';
    });
    element.style.background = 'black';
    element.style.color = 'white';
}
