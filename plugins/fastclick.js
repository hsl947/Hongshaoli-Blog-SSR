
import FastClick from "fastclick";
if (process.browser) {
    // 去除300ms延迟
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            FastClick.attach(document.body);
        },
        false
    );

}