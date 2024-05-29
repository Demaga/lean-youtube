browser.storage.local.onChanged.addListener(
    (e) => {
        switch(true){
            case "hide_shorts" in e:
                if(e.hide_shorts.newValue){
                    document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)").style.display = "none"
                    document.querySelector("ytd-rich-section-renderer").style.display = "none"
                }else{
                    document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)").style.display = "block"
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
