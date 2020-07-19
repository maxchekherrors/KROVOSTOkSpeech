
document.getElementById('lang_form')
    .addEventListener('change', function(evt){
    let lang = evt.target.value;
    chrome.storage.local.set({
        "RAP":{
            "lang":lang
        }
    },null);
});