function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
}

function openProject(project) {

    let content = "";

    if (project === "p1") {
        content = `
        <h3>Multi-Cloud Disaster Recovery</h3>
        <p>
        Designed and implemented a multi-cloud disaster recovery architecture
        using AWS and Google Cloud to ensure data availability and fault tolerance.
        Enabled automatic backup of AWS S3 and EC2 to Google Cloud Storage and VM.
        </p>
        <p><b>Tools:</b> AWS, Google Cloud</p>
        `;
    }

    if (project === "p2") {
        content = `
        <h3>Dog Breed Detection</h3>
        <p>
        Built an AI model to identify dog breeds using image recognition and
        improved accuracy using Amazon Rekognition services.
        </p>
        <p><b>Tools:</b> Amazon Rekognition</p>
        `;
    }

    if (project === "p3") {
        content = `
        <h3>AI Hospital Chatbot</h3>
        <p>
        Developed a chatbot for hospital appointment booking and symptom-based
        suggestions with nearby hospital recommendations.
        </p>
        <p><b>Tools:</b> Amazon Lex</p>
        `;
    }

    document.getElementById("projectDetails").innerHTML = content;
}
