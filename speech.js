document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const result = event.results[event.resultIndex];
        const transcript = result[0].transcript;

        // Send the transcript to your server
        fetch('/send_text', {
            method: 'POST',
            body: new URLSearchParams({ text: transcript }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        output.textContent = transcript;
    };

    recognition.start();
});

