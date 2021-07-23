const emojiData = require( '../components/EmojiPicker/data/emojis2.js') 

export function renderedEmojiHtml(html) {
    let parser = new DOMParser();
    let doc = removeNotEmoji(parser.parseFromString(html, "text/html"));
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

/**
 * 判断需要渲染的 HTML 是否属于表情包，如果不属于，则去除此 HTML，仅保留文字
 * issue#17 https://github.com/LIlGG/halo-comment-sakura/issues/17
 */
function removeNotEmoji(doc) {
    let smilies = doc.getElementsByClassName("smilies");
    loopSearchEmoji(smilies, "tieba", (node) => {
        let alt = node.getAttribute('alt');
        let textNode = document.createTextNode(alt);

        node.parentNode.replaceChild(textNode, node);
    });
    return doc;
}

function loopSearchEmoji(nodeList, type, callback) {
    for(let i = 0; i < nodeList.length; i++) {
        var name = nodeList[i].dataset.icon;

        if (!findEmoji(type, name)) {
            callback(nodeList[i])
        }
    }
}

/**
 * 根据条件查找表情
 * @param {*} type 
 * @param {*} name
 * @returns 返回 true 则表示表情存在，返回 false 则表示不存在
 */
function findEmoji(type, name) {
    return emojiData["default"].filter(item => (item.category === type && item.name === name)).length > 0;
}
