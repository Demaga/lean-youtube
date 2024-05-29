async function checkPermissions() {
    function getPermissions() {
        return browser.permissions.getAll();
      }
    const currentPermissions = await getPermissions();
    if(!currentPermissions.origins.includes("*://*.youtube.com/*")){
        document.getElementById("give_permission").style.display = "block";
    }
}
checkPermissions();

async function requestPermissions() {
    await browser.permissions.request({
        origins: ["*://*.youtube.com/*"]
    });
}

let give_permission_btn = document.getElementById("give_permission_btn");
give_permission_btn.addEventListener("click", function () {
    requestPermissions()
    window.close()
    //document.getElementById("give_permission").style.display = "none";
});



let hide_shorts = document.getElementById("hide_shorts");

browser.storage.local.get("hide_shorts").then((hide_shorts_val) => {
    if (hide_shorts_val == true) {
        browser.storage.local.set({ "hide_shorts": true })
    };
    hide_shorts.checked = hide_shorts_val.hide_shorts;
})
hide_shorts.addEventListener("change", function () {
    browser.storage.local.set({ "hide_shorts": this.checked }).then(() => {
    })
});

let hide_community = document.getElementById("hide_community");

browser.storage.local.get("hide_community").then((hide_community_val) => {
    if (hide_community_val == true) {
        browser.storage.local.set({ "hide_community": true })
    };
    hide_community.checked = hide_community_val.hide_community;
})
hide_community.addEventListener("change", function () {
    browser.storage.local.set({ "hide_community": this.checked }).then(() => {
    })
});

let hide_livestream = document.getElementById("hide_livestream");

browser.storage.local.get("hide_livestream").then((hide_livestream_val) => {
    if (hide_livestream_val == true) {
        browser.storage.local.set({ "hide_livestream": true })
    };
    hide_livestream.checked = hide_livestream_val.hide_livestream;
})
hide_livestream.addEventListener("change", function () {
    browser.storage.local.set({ "hide_livestream": this.checked }).then(() => {
    })
});


let min_duration = document.getElementById("min_duration");
let min_duration_output = document.getElementById("min_duration_output");
browser.storage.local.get("min_duration").then((min_duration_val) => {
    if (!!min_duration_val == false) {
        browser.storage.local.set({ "min_duration": 60 });
    }else{
        min_duration.value = min_duration_val.min_duration;
        min_duration_output.innerHTML = min_duration_val.min_duration;
    };
    
})
min_duration.addEventListener("input", function () {
    if(this.value<60 || this.value>600){
        //mabe make some allert for invalid numbers
    }else(
        browser.storage.local.set({ "min_duration": this.value }).then(() => {
            min_duration_output.innerHTML = this.value;
        })
    )
    
});
min_duration.addEventListener("focusout", function () {
    if(this.value<60){
        this.value=60
        min_duration_output.innerHTML = 60;
    }else if(this.value>600){
        this.value=600
        min_duration_output.innerHTML = 600;
    }
});

let max_duration = document.getElementById("max_duration");
let max_duration_output = document.getElementById("max_duration_output");
browser.storage.local.get("max_duration").then((max_duration_val) => {
    if (!!max_duration_val == false) {
        browser.storage.local.set({ "max_duration": 3600 });
    }else{
        max_duration.value = max_duration_val.max_duration;
        max_duration_output.innerHTML = max_duration_val.max_duration;
    };
    
})
max_duration.addEventListener("input", function () {
    if(this.value<601 || this.value>3600){
        //mabe make some allert for invalid numbers
    }else(
        browser.storage.local.set({ "max_duration": this.value }).then(() => {
            max_duration_output.innerHTML = this.value;
        })
    )

});
max_duration.addEventListener("focusout", function () {
    if(this.value<601){
        this.value=601
        max_duration_output.innerHTML = 601;
    }else if(this.value>3600){
        this.value=3600
        max_duration_output.innerHTML = 3600;
    }
});