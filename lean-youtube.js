function getElementsByXpath(path, node = document, return_type = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE) {
    return document.evaluate(path, node, null, return_type, null);
}

const time_settings = {
    "min": [15, 1, 0],
    "max": [0, 30, 1]
}

function getTotalSeconds(arr) {
    return arr[0] + arr[1] * 60 + arr[2] * 3600;
}

function main(url) {
    console.log("intercepted", url);
    var community_elements = getElementsByXpath('//ytd-rich-section-renderer[descendant::*[contains(text(), "Останні дописи")]]');
    // console.log(community_elements);
    for (var i = 0; i < community_elements.snapshotLength; i++) {
        var element = community_elements.snapshotItem(i);
        element.parentNode.removeChild(element);
        console.log("community element removed");
    }

    var shorts_elements = getElementsByXpath('//ytd-rich-section-renderer[descendant::*[contains(text(), "YouTube Shorts")]]');
    // console.log(shorts_elements);
    for (var i = 0; i < shorts_elements.snapshotLength; i++) {
        var element = shorts_elements.snapshotItem(i);
        element.parentNode.removeChild(element);
        console.log("shorts element removed");
    }

    var shorts_sidebar = getElementsByXpath('//ytd-reel-shelf-renderer', document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
    if (shorts_sidebar)
        shorts_sidebar.remove();

    let videos = getElementsByXpath('//*[self::ytd-rich-item-renderer or self::ytd-compact-video-renderer]');
    console.log(videos);
    for (var i = 0; i < videos.snapshotLength; i++) {
        var element = videos.snapshotItem(i);
        let time = getElementsByXpath('.//span[contains(@class,"time-status")]/text()', element, XPathResult.STRING_TYPE).stringValue;
        time = time.trim();
        time = time.split(":");
        if (time.length == 3) {
            var seconds = parseInt(time[2]);
            var minutes = parseInt(time[1]);
            var hours = parseInt(time[0]);
        } else {
            var seconds = parseInt(time[1]);
            var minutes = parseInt(time[0]);
            var hours = 0;
        }
        let mix = getElementsByXpath('.//*[contains(text(), "Мікс")]', element, XPathResult.FIRST_ORDERED_NODE_TYPE);

        if (getTotalSeconds([seconds, minutes, hours]) > getTotalSeconds(time_settings["max"])) {
            element.parentNode.removeChild(element);
            console.log("Video removed because too long", time);
        } else if (getTotalSeconds([seconds, minutes, hours]) < getTotalSeconds(time_settings["min"])) {
            element.parentNode.removeChild(element);
            console.log("Video removed because too short", time);
        } else if (mix.singleNodeValue) {
            element.parentNode.removeChild(element);
            console.log("Video removed because mix");
        }
    }
}

browser.webRequest.onCompleted.addListener((url) => { main(url) }, {
    urls: ["https://www.youtube.com/youtubei/v1/browse*"],
});

