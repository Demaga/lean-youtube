addEventListener("storage", (event) => {
    switch(event.key){
        case "hide_shorts":
            console.log("hide_shorts is changed to",event.newValue);
            if(event.newValue){
                shorts_icon.style.display = "none"
            }else{
                shorts_icon.style.display = "true"
            };
            break;
        case "hide_community":
            console.log("hide_community is changed to",event.newValue);
            break;
        case "hide_livestream":
            console.log("hide_livestream is changed to",event.newValue);
            break;
    }
});
