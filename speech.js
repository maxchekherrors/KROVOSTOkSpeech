let isPlayRAP = false;


function sleep(t) {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    })
}

async function makeVibe(text) {
    const speech = window.speechSynthesis;
    if (isPlayRAP) {
        speech.cancel();
        isPlayRAP = false;
    } else {
        chrome.storage.local.get(['RAP'], async function (data) {
            let lang = 'ru-RU';
            const message = new SpeechSynthesisUtterance();
            const audio = new Audio('https://b-track.com/ka/213086?hash=d75751abd55571d3969ade78e0fee81e&expire=1596232800');
            if (Object.keys(data).length !== 0) {
                lang = data.RAP.lang;
            }
            audio.loop = true;
            message.lang = lang;
            message.text = text;
            message.onend = async function () {
                isPlayRAP = false;
                await sleep(300);
                audio.pause();
            };
            isPlayRAP = true;
            audio.play();
            await sleep(300);
            speech.speak(message);

        });
    }
}

window.onkeydown = function (e) {
    if ((e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'л') && e.shiftKey) {
        const selection = window.getSelection();
        const text = selection.toString();
        makeVibe(text);
    }
};