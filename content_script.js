browser.storage.local.onChanged.addListener(
    (e) => {
        switch(true){
            case "hide_shorts" in e:
                if(e.hide_shorts.newValue){
                    document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)").style.display = "none"
                }else{
                    document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)").style.display = "block"
                };
                break;
            case "hide_community" in e:
                break;
            case "hide_livestream" in e:
                break;
            case "min_duration" in e:
                min_duration = parseInt(e.min_duration.newValue);
                break;
            case "max_duration" in e:
                max_duration = parseInt(e.max_duration.newValue);
                break;
        }
    }
)