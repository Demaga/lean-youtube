browser.storage.local.onChanged.addListener(
    (e) => {
        switch (true) {
            case "hide_shorts" in e:
                const ytd_mini_guide_renderer = document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)")
                const ytd_guide_section_renderer = document.querySelector("ytd-guide-section-renderer ytd-guide-entry-renderer:nth-child(2)")
                console.log("ytd_mini_guide_renderer", ytd_mini_guide_renderer)
                console.log("ytd_guide_section_renderer", ytd_guide_section_renderer)
                if (e.hide_shorts.newValue) {
                    if (ytd_mini_guide_renderer) {
                        ytd_mini_guide_renderer.style.display = "none"
                    }
                    if (ytd_guide_section_renderer) {
                        ytd_guide_section_renderer.style.display = "none"
                    }
                    document.querySelector("ytd-rich-section-renderer").style.display = "none"
                } else {
                    if (ytd_mini_guide_renderer) {
                        ytd_mini_guide_renderer.style.display = "block"
                    }
                    if (ytd_guide_section_renderer) {
                        ytd_guide_section_renderer.style.display = "block"
                    }
                    document.querySelector("ytd-rich-section-renderer").style.display = "block"
                };
                break;
            case "hide_community" in e:
                break;
            case "hide_livestream" in e:
                break;
        }
    }
)
