function analyzeSymptoms() {
    const symptomsInput = document.getElementById('symptomsInput').value;
    const prescription = generatePrescription(symptomsInput);

    const prescriptionSection = document.getElementById('prescriptionSection');
    const prescriptionText = document.getElementById('prescriptionText');
    prescriptionText.textContent = prescription;
    prescriptionSection.style.display = 'block';
}

function generatePrescription(symptoms) {
    const diagnosis = analyzeDiagnosis(symptoms);
    let prescription = 'No specific prescription. ';

    if (diagnosis.length === 0) {
        prescription += 'Take rest and drink plenty of water.';
    } else {
        prescription += ' Take the following medications:';
        diagnosis.forEach((issue) => {
            prescription += `\n- Medication for ${issue}`;
        });
    }

    return prescription;
}

function analyzeDiagnosis(symptoms) {
    const symptomList = symptoms.toLowerCase().split(',').map(symptom => symptom.trim());
    const diagnosis = [];

    if (symptomList.includes('fever')) {
        diagnosis.push('Fever');
    }
    if (symptomList.includes('cough')) {
        diagnosis.push('Cough');
    }
    if (symptomList.includes('headache')) {
        diagnosis.push('Headache');
    }
    if (symptomList.includes('nausea') || symptomList.includes('vomiting')) {
        diagnosis.push('Nausea/Vomiting');
    }

    return diagnosis;
}

function checkCrucialCondition(symptoms) {
    const symptomList = symptoms.toLowerCase().split(',').map(symptom => symptom.trim());

    const crucialSymptoms = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconsciousness', 'severe allergic reaction', 'severe burns', 'persistent vomiting'];

    for (const symptom of symptomList) {
        if (crucialSymptoms.includes(symptom)) {
            return true; // Condition is crucial
        }
    }

    if (symptomList.includes('fever') && symptomList.includes('stiff neck') && symptomList.includes('headache')) {
        return true; // Could indicate meningitis
    }
    if (symptomList.includes('severe headache') && symptomList.includes('blurred vision')) {
        return true; // Could indicate a stroke
    }
    if (symptomList.includes('abdominal pain') && symptomList.includes('vomiting blood')) {
        return true; // Could indicate internal bleeding
    }

    return false; // Condition is not crucial
}

function bookAppointment() {
    const symptomsInput = document.getElementById('symptomsInput').value;
    const isCrucial = checkCrucialCondition(symptomsInput);
    if (isCrucial) {
        window.location.href = 'appointment.html';
    } else {
        alert('Your condition is not crucial. No appointment needed.');
    }
}
