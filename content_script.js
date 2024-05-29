browser.storage.local.onChanged.addListener(
    (e) => {
        console.log(document.querySelector(".ytd-mini-guide-renderer"))
        switch(true){
            case "hide_shorts" in e:
                console.log("hide_shorts is changed to",e.hide_shorts.newValue);
                if(e.hide_shorts.newValue){
                    document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)").style.display = "none"
                }else{
                    document.querySelector(".ytd-mini-guide-renderer>ytd-mini-guide-entry-renderer:nth-child(2)").style.display = "block"
                };
                break;
            case "hide_community" in e:
                console.log("hide_community is changed to",e.hide_community.newValue);
                break;
            case "hide_livestream" in e:
                console.log("hide_livestream is changed to",e.hide_livestream.newValue);
                break;
            case "min_duration" in e:
                console.log("hide_livestream is changed to",e.min_duration.newValue);
                min_duration = parseInt(e.min_duration.newValue);
                break;
            case "max_duration" in e:
                console.log("hide_livestream is changed to",e.max_duration.newValue);
                max_duration = parseInt(e.max_duration.newValue);
                break;
        }
        console.log("event",e);
    }
)