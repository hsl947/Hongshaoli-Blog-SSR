import Vue from "vue";
Vue.prototype.$extend = function (target, options) {
    for (name in options) {
        target[name] = options[name];
    }
    return target;
};

function isGt10(n) {
    return n < 10 ? '0' + n : n;
}
Vue.filter('formatTime', (input) => {
    var d = new Date(input);
    var year = d.getFullYear();
    var month = isGt10(d.getMonth() + 1);
    var day = isGt10(d.getDate());
    var hour = isGt10(d.getHours());
    var minutes = isGt10(d.getMinutes());
    var seconds = isGt10(d.getSeconds());
    if (year) {
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
        // return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    } else {
        return '';
    }
})



