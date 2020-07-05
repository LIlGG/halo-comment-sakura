const emojiData = require( '../components/EmojiPicker/data/emojis2.js') 

export function renderedEmojiHtml(html) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let emotions = doc.getElementsByClassName("emotion-item");
    for(let i = 0; i < emotions.length; i++) {
        let emojiName = emotions[i].getAttribute("data-icon");
        
        for(let j = 0; j < emojiData["default"].length; j++) {
            if(emojiData["default"][j]["name"] === emojiName) {
                let emoji = emojiData["default"][j];
                let img = emotions[i].getElementsByClassName("img")[0];
                       
                let dataStyle = "";
                Object.keys(emoji.style).forEach(function(item) {
                    dataStyle += item + ":" + emoji.style[item] + ";";
                })
                img.style.cssText = dataStyle;
                break;
            }
        }
    }
    return doc.body.innerHTML;
}
