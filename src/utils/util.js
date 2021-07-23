/**
 * time ago
 * @param {*} time
 */
export function timeAgo(time) {
    var currentTime = new Date().getTime()
    var between = currentTime - time
    var days = Math.floor(between / (24 * 3600 * 1000))
    if (days === 0) {
        var leave1 = between % (24 * 3600 * 1000)
        var hours = Math.floor(leave1 / (3600 * 1000))
        if (hours === 0) {
            var leave2 = leave1 % (3600 * 1000)
            var minutes = Math.floor(leave2 / (60 * 1000))
            if (minutes === 0) {
                var leave3 = leave2 % (60 * 1000)
                var seconds = Math.round(leave3 / 1000)
                return seconds + ' 秒前'
            }
            return minutes + ' 分钟前'
        }
        return hours + ' 小时前'
    }
    if (days < 0) return '刚刚'
    if (days < 1) {
        return days + ' 天前'
    } else {
        return formatDate(time, 'yyyy/MM/dd hh:mm');
    }
}

function formatDate(date, fmt) {
    date = new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// From <https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php>
export function isUrl(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    if (regexp.test(str)) {
        return true
    } else {
        return false
    }
}

export function isEmpty(content) {
    return content === null || content === undefined || content === ''
}

export function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object
}

export function validEmail(email) {
    var re = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,8}$/
    return re.test(email);
}

export function isQQ(qq) {
    var re = /^[1-9][0-9]{4,9}$/gim;
    return re.test(qq);
}

export const queryStringify = query => {
    const queryString = Object.keys(query)
        .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
        .join('&')
    return queryString
}

export function getUrlKey(name) {
    return (
        decodeURIComponent(
            (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
                location.href
            ) || "")[1].replace(/\+/g, "%20")
        ) || null
    );
}

function trimTailBr(str) {
    return str.replace(/((\s|&nbsp;)*\r?\n)+$/g, '');
}

function limitBr(str) {
    return str.replace(/((\s|&nbsp;)*\r?\n){3,}/g, "\r\n\r\n");
}

function trimHeadBr(str) {
    return str.replace(/^((\s|&nbsp;)*\r?\n)+/g, '');
}

export function return2Br(str) {
    str = trimHeadBr(str);
    str = trimTailBr(str);
    str = limitBr(str);
    return str.replace(/\r?\n/g, "<br />");
}


//判断一个元素是否在可视区域内
export function isInVisibleArea(elem, root) {
    if (!elem || !elem.getBoundingClientRect) return false;

    var clientHeight = window.innerHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 这里需要加上根节点距顶端的距离
    var rootOffsetTop = root.offsetTop;
    var offsetTop = elem.offsetTop + rootOffsetTop;
    var objHeight = elem.offsetHeight;
    if ((offsetTop + objHeight) < (scrollTop + clientHeight) && (offsetTop + objHeight) > scrollTop) {
        return true;
    }

    return false;
}

/**
 * 移除 JSON 内值为空的数据
 * @param {*} obj json 对象
 */
export function removeJsonEmpty(obj) {
    for (let k in obj) {
        let v = obj[k];
        if (v === '') {
            delete obj[k];
        } else if (v.constructor == Object) {
            removeJsonEmpty(v);
        }
    }
}