import Vue from 'vue';
import Tips from './index.vue';

let tipTem = Vue.extend(Tips);
let instance;
let timer = null;

let tips = (message, time = 6000) => {
    
    if(!instance) {
        instance = new tipTem();
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
    }

    if(timer) {
        clearTimeout(timer);
        timer = null;
        instance.show = false;
        instance.message = "";
    }
    instance.time = 3000;

    if(typeof message === 'string') {
        instance.message = message;
    } else {
        return;
    }

    if (typeof time === 'number') {
        instance.time = time;
    }

    instance.show = true;
    timer = setTimeout(()=> {
        instance.show = false;
        clearTimeout(timer);
        timer = null;
        instance.message = "";
    }, instance.time)
}

tips.install = (Vue) => {
    Vue.prototype.$tips = tips;
}

export default tips;
