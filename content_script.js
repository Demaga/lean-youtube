let ytd_guide_renderer  
if(!!document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)")){
    ytd_guide_renderer = document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)")
}else if(!!document.querySelector("ytd-guide-section-renderer>ytd-guide-entry-renderer:nth-child(2)")){
    ytd_guide_renderer = document.querySelector("ytd-guide-section-renderer>ytd-guide-entry-renderer:nth-child(2)")
}


browser.storage.local.onChanged.addListener(
    (e) => {
        switch(true){
            case "hide_shorts" in e:
                if(e.hide_shorts.newValue){

                    ytd_guide_renderer.style.display = "none"
                    document.querySelector("ytd-rich-section-renderer").style.display = "none"
                }else{
                    ytd_guide_renderer.style.display = "block"
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
