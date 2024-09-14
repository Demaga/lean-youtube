// function timeout(func, value, time) {
//     window.setTimeout(() => {
//         func(value)
//     }, time);
// }
// var hide_shorts = false;
// browser.storage.local.get("hide_shorts").then((local_obj) => {
//     hide_shorts = local_obj.hide_shorts;
//     if (hide_shorts) {
//         toggle_shorts(true)
//         timeout(toggle_shorts, true, 500);
//         timeout(toggle_shorts, true, 3000);
//         timeout(toggle_shorts, true, 5000);

//     }
// })
// var hide_community = false;
// browser.storage.local.get("hide_community").then((local_obj) => {
//     hide_community = local_obj.hide_community;
//     if (hide_community) {
//         toggle_community(true)
//         timeout(toggle_community, true, 500);
//         timeout(toggle_community, true, 3000);
//         timeout(toggle_community, true, 5000);
//     }
// })



// function toggle_shorts(val) {
//     var rich_sections = document.querySelectorAll("ytd-rich-section-renderer");

//     rich_sections.forEach((el) => {
//         title = el.querySelector("#title");

//         if (title.innerText == 'Shorts') {
//             if (val)
//                 el.style.display = 'none'
//             else
//                 el.style.display = 'block'
//         }
//     })

//     const ytd_mini_guide_renderer = document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)")
//     const ytd_guide_section_renderer = document.querySelector("ytd-guide-section-renderer ytd-guide-entry-renderer:nth-child(2)")

//     if (hide_shorts) {
//         if (ytd_mini_guide_renderer) {
//             ytd_mini_guide_renderer.style.display = "none"
//         }
//         if (ytd_guide_section_renderer) {
//             ytd_guide_section_renderer.style.display = "none"
//         }
//     } else {
//         if (ytd_mini_guide_renderer) {
//             ytd_mini_guide_renderer.style.display = "block"
//         }
//         if (ytd_guide_section_renderer) {
//             ytd_guide_section_renderer.style.display = "block"
//         }
//     }
// }


// function toggle_community(val) {
//     var rich_sections = document.querySelectorAll("ytd-rich-section-renderer");

//     rich_sections.forEach((el) => {
//         title = el.querySelector("#title");

//         if (title.innerText != 'Shorts') {
//             if (val)
//                 el.style.display = 'none'
//             else
//                 el.style.display = 'block'
//         }
//     })
// }

var settings;

browser.storage.local.get("settings").then((local_settings) => {
    settings = local_settings.settings;
})


browser.storage.local.onChanged.addListener(
    (e) => {
        if (!("settings" in e)) {
            return;
        }

        var new_settings = e.settings.newValue;

        console.log(new_settings);
        console.log(settings);

        Object.keys(new_settings).forEach(key => {
            if (new_settings[key] != settings[key]) {
                if (key == "hide_shorts") {
                    console.log("hide_shorts");
                }
                else if (key == "hide_subscriptions") {
                    console.log("hide_subscriptions");
                    if (new_settings[key])
                        document.querySelector("div#sections ytd-guide-section-renderer:nth-child(2)").classList.add("hidden");
                    else
                        document.querySelector("div#sections ytd-guide-section-renderer:nth-child(2)").classList.remove("hidden");
                }
            }
        });

        settings = new_settings;
    }
)
