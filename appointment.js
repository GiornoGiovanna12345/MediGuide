function bookAppointment(){
    const name=document.getElementById('patient-name').value;
    const age=document.getElementById('patient-age').value;
    const doctor=document.getElementById('doctor-type').value;
    const date=document.getElementById('appointment-date').value;
    const reason=document.getElementById('reason').value;
    
    if(!name||!age||!doctor||!date||!reason){
        alert('Please fill in all fields before booking.');
        return;
    }

    const appointment={name,age,doctor,date,reason};

    let appointments=JSON.parse(localStorage.getItem('appointments'))||[];
    appointments.push(appointment);
    localStorage.setItem('appointments',JSON.stringify(appointments));

    displayHistory();
    clearForm();
    alert('Appointment booked successfully!');
}

function displayHistory(){
    const historyList = document.getElementById('history-list');
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    if (appointments.length === 0) {
        historyList.innerHTML = '<p style="color:#888;">No appointments booked yet.</p>';
        return;
    }

    historyList.innerHTML = '';
    appointments.forEach((appt) => {
        const card = document.createElement('div');
        card.className = 'history-card';
        card.innerHTML = `
            <h3>${appt.name}, Age ${appt.age}</h3>
            <p><strong>Specialist:</strong> ${appt.doctor}</p>
            <p><strong>Date:</strong> ${appt.date}</p>
            <p><strong>Reason:</strong> ${appt.reason}</p>
        `;
        historyList.appendChild(card);
    });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('appointments');
        displayHistory();
    }
}

function clearForm() {
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-age').value = '';
    document.getElementById('doctor-type').value = '';
    document.getElementById('appointment-date').value = '';
    document.getElementById('reason').value = '';
}

displayHistory();

