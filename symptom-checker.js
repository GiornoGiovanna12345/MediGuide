function checkSymptoms() {
    const checkboxes = document.querySelectorAll('.symptoms-grid input[type="checkbox"]:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);

    if (selected.length === 0) {
        alert('Please select at least one symptom.');
        return;
    }

    const result = diagnose(selected);
    displayResult(result);
}

function diagnose(symptoms) {
    const conditions = [
        {
            name: 'Cold / Flu',
            doctor: 'Primary Care Physician',
            keywords: ['fever', 'headache', 'cough', 'sore throat', 'fatigue'],
            severity: 'Mild'
        },
        {
            name: 'Asthma',
            doctor: 'Pulmonologist',
            keywords: ['cough', 'wheezing', 'shortness of breath', 'chest pain'],
            severity: 'Moderate'
        },
        {
            name: 'Coronary Artery Disease',
            doctor: 'Cardiologist',
            keywords: ['chest pain', 'shortness of breath', 'sweating', 'fatigue'],
            severity: 'Severe'
        },
        {
            name: 'Thyroid Disorder',
            doctor: 'Endocrinologist',
            keywords: ['weight changes', 'mood fluctuations', 'fatigue', 'anxiety'],
            severity: 'Moderate'
        },
        {
            name: 'Type 2 Diabetes',
            doctor: 'Endocrinologist',
            keywords: ['frequent urination', 'excessive thirst', 'blurred vision', 'fatigue', 'weight changes'],
            severity: 'Moderate to Severe'
        },
        {
            name: 'Urinary Tract Infection (UTI)',
            doctor: 'Urologist',
            keywords: ['frequent urination', 'abdominal pain', 'fever'],
            severity: 'Mild to Moderate'
        },
        {
            name: 'Generalised Anxiety Disorder',
            doctor: 'Psychiatrist',
            keywords: ['anxiety', 'sleep issues', 'mood fluctuations', 'fatigue'],
            severity: 'Moderate'
        },
        {
            name: 'Allergic Dermatitis',
            doctor: 'Dermatologist',
            keywords: ['skin rash', 'itching', 'cough', 'wheezing'],
            severity: 'Mild'
        },
        {
            name: 'Glaucoma',
            doctor: 'Ophthalmologist',
            keywords: ['blurred vision', 'headache', 'sensitivity to light'],
            severity: 'Severe'
        },
        {
            name: 'Rheumatoid Arthritis',
            doctor: 'Rheumatologist',
            keywords: ['joint pain', 'stiffness', 'fatigue', 'back pain'],
            severity: 'Moderate'
        },
        {
            name: 'Migraine',
            doctor: 'Neurologist',
            keywords: ['headache', 'sensitivity to light', 'nausea', 'blurred vision', 'dizziness'],
            severity: 'Moderate'
        },
        {
            name: 'Food Poisoning',
            doctor: 'Primary Care Physician',
            keywords: ['nausea', 'vomiting', 'abdominal pain', 'fever', 'loss of appetite'],
            severity: 'Mild to Moderate'
        },
        {
            name: 'Irritable Bowel Syndrome (IBS)',
            doctor: 'Gastroenterologist',
            keywords: ['abdominal pain', 'bloating', 'nausea', 'loss of appetite'],
            severity: 'Mild to Moderate'
        }
    ];

    let bestMatch = null;
    let highestScore = 0;

    conditions.forEach(condition => {
        const matches = condition.keywords.filter(k => symptoms.includes(k)).length;
        const score = matches / condition.keywords.length;
        if (score > highestScore) {
            highestScore = score;
            bestMatch = condition;
        }
    });

    return bestMatch || { name: 'Unknown', doctor: 'General Physician', severity: 'Unknown' };
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h2>Possible Condition: ${result.name}</h2>
        <p><strong>Recommended Specialist:</strong> ${result.doctor}</p>
        <p><strong>Severity:</strong> ${result.severity}</p>
        <p style="margin-top:15px; font-size:0.85rem; color:#888;">
            This is not a diagnosis. Please consult a ${result.doctor} for proper medical advice.
        </p>
    `;
}