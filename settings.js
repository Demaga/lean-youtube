let hide_shorts = document.getElementById("hide_shorts");
browser.storage.local.get("hide_shorts").then((hide_shorts_val) => {
    console.log(hide_shorts_val);
    if (!hide_shorts_val == false) {
        browser.storage.local.set({ "hide_shorts": true })
    };
    hide_shorts.checked = hide_shorts_val.hide_shorts;
})
hide_shorts.addEventListener("change", function () {
    browser.storage.local.set({ "hide_shorts": this.checked }).then(() => {
        console.log("hide_shorts set to", this.checked);
    })
});

let hide_community = document.getElementById("hide_community");
browser.storage.local.get("hide_community").then((hide_community_val) => {
    if (!hide_community_val == false) {
        browser.storage.local.set({ "hide_community": true })
    };
    hide_community.checked = hide_community_val.hide_community;
})
hide_community.addEventListener("change", function () {
    browser.storage.local.set({ "hide_community": this.checked }).then(() => {
        console.log("hide_community set to", this.checked);
    })
});

let min_duration = document.getElementById("min_duration");
let min_duration_output = document.getElementById("min_duration_output");
browser.storage.local.get("min_duration").then((min_duration_val) => {
    console.log(min_duration_val);
    if (!min_duration_val == false) {
        browser.storage.local.set({ "min_duration": 61 });
    };
    min_duration.value = min_duration_val.min_duration;
    min_duration_output.innerHTML = min_duration_val.min_duration;
})
min_duration.addEventListener("input", function () {
    browser.storage.local.set({ "min_duration": this.value }).then(() => {
        console.log("min_duration set to", this.value);
        min_duration_output.innerHTML = this.value;
    })
});

let max_duration = document.getElementById("max_duration");
let max_duration_output = document.getElementById("max_duration_output");
browser.storage.local.get("max_duration").then((max_duration_val) => {
    console.log(max_duration_val);
    if (!max_duration_val == false) {
        browser.storage.local.set({ "max_duration": 36000 });
    };
    max_duration.value = max_duration_val.max_duration;
    max_duration_output.innerHTML = max_duration_val.max_duration;
})
max_duration.addEventListener("input", function () {
    browser.storage.local.set({ "max_duration": this.value }).then(() => {
        console.log("max_duration set to", this.value);
        max_duration_output.innerHTML = this.value;
    })
});