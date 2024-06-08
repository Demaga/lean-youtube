var min_duration = 0;
browser.storage.local.get("min_duration").then((min_duration_val) => {
    if (Object.keys(min_duration_val).length === 0) {
        browser.storage.local.set({ "min_duration": 0 });
    } else {
        min_duration = min_duration_val.min_duration;
    };

})
var max_duration = 36000;
browser.storage.local.get("max_duration").then((max_duration_val) => {
    if (Object.keys(max_duration_val).length === 0) {
        browser.storage.local.set({ "max_duration": 36000 });
    } else {
        max_duration = max_duration_val.max_duration;
    };

})
var hide_shorts = true;
browser.storage.local.get("hide_shorts").then((hide_shorts_val) => {
    if (Object.keys(hide_shorts_val).length === 0) {
        browser.storage.local.set({ "hide_shorts": true });
    } else {
        hide_shorts = hide_shorts_val.hide_shorts;
    };

})
var hide_shorts = false;
browser.storage.local.get("hide_shorts").then((local_obj) => {
    hide_shorts = local_obj.hide_shorts;
})

function listener(details) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    const data = [];

    filter.ondata = (event) => {
        data.push(event.data);
    };

    filter.onstop = (event) => {
        let str = "";
        if (data.length === 1) {
            str = decoder.decode(data[0]);
        } else {
            for (let i = 0; i < data.length; i++) {
                const stream = i !== data.length - 1;
                str += decoder.decode(data[i], { stream });
            }
        }
        var request_type = "";
        try {
            var obj = JSON.parse(str);
            request_type = "browse";
        } catch {
            var initial_data_regex = "var ytInitialData = (?<data>.*?});</script>";
            var obj = str.match(initial_data_regex).groups.data;
            obj = JSON.parse(obj);
            request_type = "home";
        }
        if (!("contents" in obj)) {
            var action = obj["onResponseReceivedActions"][0];
            if ("appendContinuationItemsAction" in action) {
                var videos = action["appendContinuationItemsAction"]["continuationItems"];
                var action_type = "appendContinuationItemsAction";
                request_type = "continuation";
            }
            else if ("reloadContinuationItemsCommand" in action) {
                var videos = action["reloadContinuationItemsCommand"]["continuationItems"];
                var action_type = "reloadContinuationItemsCommand";
                request_type = "continuation";
            }
            else {
                console.error("Unknown endpoint. Returning response as is.");
                str = JSON.stringify(obj);
                filter.write(encoder.encode(str));
                filter.disconnect();
                return
            }
        }
        else {
            try {
                var videos = obj["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["content"]["richGridRenderer"]["contents"];
            } catch (error) {
                console.error("No videos detected. Probably not a video-related endpoint. Full error:", error);
                str = JSON.stringify(obj);
                filter.write(encoder.encode(str));
                filter.disconnect();
                return
            }
        }

        console.log(videos);
        videos = videos.filter((vid) => {
            let total_seconds = 0;
            let seconds = 0;
            let minutes = 0;
            let hours = 0;
            let type = "";
            if ("richItemRenderer" in vid) {
                type = "vid";
            } else if ("continuationItemRenderer" in vid) {
                type = "continuation";
            } else if ("richSectionRenderer" in vid) {
                type = "section";
            }
            else {
                type = "";
            }
            if (type == "vid") {
                let renderer_type = "videoRenderer" in vid["richItemRenderer"]["content"] ? "vid" : "radio";
                if (renderer_type != "vid") {
                    return false
                }

                let renderer = vid["richItemRenderer"]["content"]["videoRenderer"];

                if (!("lengthText" in renderer)) {
                    return false
                }

                let time = renderer["lengthText"]["simpleText"];
                time = time.trim();
                time = time.split(":");
                if (time.length == 3) {
                    seconds = parseInt(time[2]);
                    minutes = parseInt(time[1]);
                    hours = parseInt(time[0]);
                } else {
                    seconds = parseInt(time[1]);
                    minutes = parseInt(time[0]);
                }
                total_seconds = seconds + minutes * 60 + hours * 3600;
                return total_seconds >= min_duration && total_seconds <= max_duration;
            }
            else if (type == "section") {
                let renderer = vid["richSectionRenderer"]["content"]
                if ("richShelfRenderer" in renderer)
                    renderer = renderer["richShelfRenderer"]
                else if ("shelfRenderer" in renderer)
                    renderer = renderer["shelfRenderer"]
                else {
                    console.log("Can't understand which element it is. Allowing")
                    return true
                }
                if ("icon" in renderer) {
                    let icon = renderer["icon"]["iconType"]
                    if (icon.includes("SHORTS") && hide_shorts)
                        return false
                }
                else {
                    let title = renderer["title"];
                    if ("simpleText" in title)
                        title = title["simpleText"]
                    else
                        title = title["runs"][0]["text"];
                    if (title.includes("Shorts") && hide_shorts)
                        return false
                }
                return true
            }
            else {
                return true;
            }
        });
        // console.log(videos);
        if (request_type == "continuation")
            obj["onResponseReceivedActions"][0][action_type]["continuationItems"] = videos;
        else
            obj["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["content"]["richGridRenderer"]["contents"] = videos;
        if (request_type == "browse" || request_type == "continuation") {
            str = JSON.stringify(obj);
        } else if (request_type == "home") {
            initial_data_regex = /var ytInitialData = .*?};<\/script>/;
            str = str.replace(initial_data_regex, "var ytInitialData = " + JSON.stringify(obj) + ";</script>");
        }
        filter.write(encoder.encode(str));
        filter.disconnect();
    };

    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    {
        urls: ["https://www.youtube.com/youtubei/v1/browse?*",
            "https://www.youtube.com/"]
    },
    ["blocking"],
);

browser.storage.local.onChanged.addListener(
    (e) => {
        if ("min_duration" in e)
            min_duration = parseInt(e.min_duration.newValue);
        else if ("max_duration" in e)
            max_duration = parseInt(e.max_duration.newValue);
        else if ("hide_shorts" in e)
            hide_shorts = e.hide_shorts.newValue;
    }
)
