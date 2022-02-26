const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;

}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    console.log('Joke:', jokeString);
    VoiceRSS.speech({
        key: '14168d5699274f5495fbf3456eef9dc4',
        src: jokeString,
        hl: 'en-gb',
        // v: 'Alice',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) { // two part joke
            joke = `${data.setup} ... ${data.delivery}`;
        } else { // one part joke
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        toggleButton();
    } catch (error) {
        // catch errors here
        console.log('whoops', error)
    }
}

// Event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);