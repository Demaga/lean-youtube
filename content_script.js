function toggle_shorts(val) {
    var rich_sections = document.querySelectorAll("ytd-rich-section-renderer");

    rich_sections.forEach((el) => {
        title = el.querySelector("#title");

        if (title.innerText == 'Shorts') {
            if (val)
                el.style.display = 'none'
            else
                el.style.display = 'block'
        }
    })
}


function toggle_community(val) {
    var rich_sections = document.querySelectorAll("ytd-rich-section-renderer");

    rich_sections.forEach((el) => {
        title = el.querySelector("#title");

        if (title.innerText != 'Shorts') {
            if (val)
                el.style.display = 'none'
            else
                el.style.display = 'block'
        }
    })
}


browser.storage.local.onChanged.addListener(
    (e) => {
        switch (true) {
            case "hide_shorts" in e:
                const ytd_mini_guide_renderer = document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)")
                const ytd_guide_section_renderer = document.querySelector("ytd-guide-section-renderer ytd-guide-entry-renderer:nth-child(2)")
                if (e.hide_shorts.newValue) {
                    if (ytd_mini_guide_renderer) {
                        ytd_mini_guide_renderer.style.display = "none"
                    }
                    if (ytd_guide_section_renderer) {
                        ytd_guide_section_renderer.style.display = "none"
                    }
                    toggle_shorts(true)
                } else {
                    if (ytd_mini_guide_renderer) {
                        ytd_mini_guide_renderer.style.display = "block"
                    }
                    if (ytd_guide_section_renderer) {
                        ytd_guide_section_renderer.style.display = "block"
                    }
                    toggle_shorts(false)
                };
                break;
            case "hide_community" in e:
                if (e.hide_community.newValue) {
                    toggle_community(true)
                } else
                    toggle_community(false)
                break;
        }
    }
)
