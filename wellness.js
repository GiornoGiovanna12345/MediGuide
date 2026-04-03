function calculateWellness() {
    const questions = ['sleep', 'water', 'vegetables', 'redmeat', 'protein', 'sugar', 'bp', 'sugar_level', 
        'exercise_type', 'exercise_freq', 'breathlessness', 'gut', 'headaches', 'stress', 'smoking', 'alcohol'];

    let totalScore = 0;
    let tips = [];
    let unanswered = [];

    const scoreMap = { good: 6, okay: 3, bad: 0, urgent: -5 };

    const tipMap = {
        sleep: {
            bad: 'Your sleep is insufficient — aim for 7-8 hours per night for optimal health.',
            okay: 'Your sleep is slightly below optimal — try to get at least 7 hours.'
        },
        water: {
            bad: 'You are not drinking enough water — aim for at least 2-3 litres daily.',
        },
        vegetables: {
            bad: 'Your vegetable intake is very low — aim for at least 4 servings per day.',
            okay: 'Try to increase your vegetable intake to 4+ servings daily.'
        },
        redmeat: {
            bad: 'You are consuming too much red meat — reduce to 1-2 times per week.',
            okay: 'Try to reduce red meat consumption further for better heart health.'
        },
        protein: {
            bad: 'Your protein intake is low — include more lentils, eggs, chicken or dairy.',
            okay: 'Your protein intake is moderate — try to have more.'
        },
        sugar: {
            bad: 'Your sugar intake is high — cut down on sweets, sodas and processed foods.',
            okay: 'Try to reduce your sugar intake to lower your diabetes risk.'
        },
        bp: {
            bad: 'Your blood pressure is high — reduce salt intake and consult a Cardiologist.',
            okay: 'Your blood pressure is low — stay hydrated and consult a doctor if dizzy.'
        },
        sugar_level: {
            bad: 'Your fasting blood sugar is elevated — consult an Endocrinologist.',
            okay: 'Your blood sugar is slightly elevated — reduce refined carbohydrates.',
            urgent: 'Your fasting blood sugar is critically high — see a doctor immediately.'
        },
        exercise_type: {
            bad: 'You are not exercising — start with 30 minutes of walking daily.'
        },
        exercise_freq: {
            bad: 'You are not exercising enough — aim for at least 4-5 days per week.',
            okay: 'Try to increase your exercise frequency to 5-6 days per week.'
        },
        breathlessness: {
            bad: 'You experience breathlessness during light activity — consult a Pulmonologist.'
        },
        gut: {
            bad: 'You have frequent gut issues — avoid spicy food and consult a Gastroenterologist.'
        },
        headaches: {
            bad: 'You experience frequent headaches — stay hydrated and consult a Neurologist if persistent.'
        },
        stress: {
            bad: 'Your stress levels are high — try meditation, exercise and speaking to a Psychiatrist.',
            okay: 'Your stress is moderate — try mindfulness and regular breaks.'
        },
        smoking: {
            bad: 'You smoke — quitting is the single best thing you can do for your health.',
            okay: 'You smoke occasionally — work towards quitting completely.'
        },
        alcohol: {
            bad: 'Your alcohol consumption is high — reduce intake and consult a doctor.',
            okay: 'Try to reduce alcohol consumption further.'
        }
    };

    const recommendationMap = {
    good: { text: '✓ You are doing great! Keep up your healthy lifestyle.', color: '#2e7d32', colorLight: '#81c784' },
    better: { text: '→ You can do better. Small lifestyle changes will make a big difference.', color: '#ea8e32', colorLight: '#ffc165' },
    urgent: { text: '⚠ Your health needs urgent attention. Please consult a doctor soon.', color: '#c62828', colorLight: '#e35a5a' }
};

    questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (!selected) {
            unanswered.push(q);
            return;
        }
        const value = selected.value;
        totalScore += scoreMap[value] || 0;

        if (tipMap[q] && tipMap[q][value]) {
            tips.push(tipMap[q][value]);
        }
    });

    if (unanswered.length > 0) {
        alert('Please answer all questions before calculating your score.');
        return;
    }

    document.querySelector('.wellness-form').style.display = 'none';
    document.querySelector('.wellness-container h1').style.display = 'none';
    document.querySelector('.wellness-container > p').style.display = 'none';
    document.querySelector('.btn-trial').style.display = 'none';

    const maxScore = questions.length * 6;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const finalScore = Math.max(0, Math.min(100, percentage));

    let rating, recommendation;
    if (finalScore >= 70) {
        rating = "You're Doing Good 🌿";
        recommendation = recommendationMap.good;
    } else if (finalScore >= 40) {
        rating = "You Can Do Better 💪";
        recommendation = recommendationMap.better;
    } else {
        rating = "Urgent Attention Needed ⚠";
        recommendation = recommendationMap.urgent;
    }

    const resultDiv = document.getElementById('wellness-result');
    resultDiv.style.cssText = 'display: block !important; margin-top: 40px;';
    resultDiv.innerHTML = `
        <div class="score-circle-outer" style="background: radial-gradient(circle at 30% 30%, ${recommendation.colorLight}, ${recommendation.color})">
            <div class="score-circle-inner">
                <div class="score-number" style="color: ${recommendation.color}">${finalScore}</div>
                <div class="score-label">out of 100</div>
            </div>
        </div>
        <div class="score-rating" style="color: ${recommendation.color}">${rating}</div>
        <div class="score-tips">
            <h3>Your Personalised Tips</h3>
            <ul>
                ${tips.length > 0 ? tips.map(tip => `<li>${tip}</li>`).join('') : '<li>Great job! No major concerns found.</li>'}
            </ul>
        </div>
        <div class="score-recommendation" style="background-color: ${recommendation.color}; color: white; margin-top: 20px; padding: 15px; border-radius: 10px;">
            ${recommendation.text}
        </div>
        <button class="btn-primary" onclick="location.reload()" style="margin-top: 20px;">
            Retake Quiz
        </button>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}