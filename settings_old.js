let hide_shorts = document.getElementById("hide_shorts");

browser.storage.local.get("hide_shorts").then((hide_shorts_val) => {
    if (!!hide_shorts_val)
        hide_shorts.checked = hide_shorts_val.hide_shorts;
})
hide_shorts.addEventListener("change", function () {
    browser.storage.local.set({ "hide_shorts": this.checked }).then(() => {
    })
});

let hide_community = document.getElementById("hide_community");

browser.storage.local.get("hide_community").then((hide_community_val) => {
    hide_community.checked = hide_community_val.hide_community;
})
hide_community.addEventListener("change", function () {
    browser.storage.local.set({ "hide_community": this.checked }).then(() => {
    })
});


let min_duration = document.getElementById("min_duration");
browser.storage.local.get("min_duration").then((min_duration_val) => {
    if (!!min_duration_val.min_duration)
        min_duration.value = min_duration_val.min_duration;
})
min_duration.addEventListener("input", function () {
    browser.storage.local.set({ "min_duration": this.value }).then(() => { })
});

let max_duration = document.getElementById("max_duration");
browser.storage.local.get("max_duration").then((max_duration_val) => {
    if (!!max_duration_val.max_duration)
        max_duration.value = max_duration_val.max_duration;
})
max_duration.addEventListener("input", function () {
    browser.storage.local.set({ "max_duration": this.value }).then(() => { })
});

/*Advanced settings*/



let hide_subscriptions = document.getElementById("hide_subscriptions");

browser.storage.local.get("hide_subscriptions").then((hide_subscriptions_val) => {
    hide_subscriptions.checked = hide_subscriptions_val.hide_subscriptions;
})
hide_subscriptions.addEventListener("change", function () {
    browser.storage.local.set({ "hide_subscriptions": this.checked }).then(() => {
    })
});


let hide_recommendations = document.getElementById("hide_recommendations");

browser.storage.local.get("hide_recommendations").then((hide_recommendations_val) => {
    hide_recommendations.checked = hide_recommendations_val.hide_recommendations;
})
hide_recommendations.addEventListener("change", function () {
    browser.storage.local.set({ "hide_recommendations": this.checked }).then(() => {
    })
});

let hide_mixes = document.getElementById("hide_mixes");

browser.storage.local.get("hide_mixes").then((hide_mixes_val) => {
    hide_mixes.checked = hide_mixes_val.hide_mixes;
})
hide_mixes.addEventListener("change", function () {
    browser.storage.local.set({ "hide_mixes": this.checked }).then(() => {
    })
});

let hide_livestreams = document.getElementById("hide_livestreams");

browser.storage.local.get("hide_livestreams").then((hide_livestreams_val) => {
    hide_livestreams.checked = hide_livestreams_val.hide_livestreams;
})
hide_livestreams.addEventListener("change", function () {
    browser.storage.local.set({ "hide_livestreams": this.checked }).then(() => {
    })
});



let advanced_settings_btn = document.getElementById("advanced_settings_toggle");
let advanced_settings_list = document.getElementById("advanced_settings");
console.log(advanced_settings_list)
let show_advanced_settings_value = false

advanced_settings_btn.addEventListener("click", advanced_settings_toggle);


function advanced_settings_toggle(){
    show_advanced_settings_value = !show_advanced_settings_value
    if(show_advanced_settings_value){
        advanced_settings_list.style.display = "none";
    }else{
        advanced_settings_list.style.display = "inline";
    }
}



import { cssToggle } from './dynamic_css.js';

console.log("darkmode off");
cssToggle.toggle('darkMode', 'body { background-color: #333; color: #fff; }');
console.log("darkmode on");