const input = document.querySelector('#input');
const output = document.querySelector('#meaning');
const search = document.querySelector('#search');

search.addEventListener('click', searchWord);

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchWord();
    }
});

async function searchWord() {
    const val = input.value.trim();
    if (val === "") {
        alert("Please enter a word");
    } else {
        try {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${val}`;
            let response = await fetch(url);
            let data = await response.json();
            if (data[0]) {
                const definition = data[0]?.meanings[0]?.definitions[0]?.definition || 'No definition found.';
                const examples = data[0]?.meanings[0]?.definitions[0]?.example || 'No example available.';
                displayResult(definition, examples);
            } else {
                displayResult('No definition found.', 'No example available.');
            }
        } catch {
            displayResult('An error occurred. Please try again later.', '');
        }
        input.value = ''; // Clear the input field
    }
}

function displayResult(definition, example) {
    output.innerHTML = `<p><strong>Definition:</strong> ${definition}</p>
                        <p class="example"><strong>Example:</strong> ${example}</p>`;
    output.classList.add('fade-in');
    setTimeout(() => output.classList.remove('fade-in'), 500);
}
