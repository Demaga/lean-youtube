function listener(details) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();
    console.log(details);

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
        console.log(str);
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
        }
        else {
            var videos = obj["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["content"]["richGridRenderer"]["contents"];
        }

        videos = videos.filter((vid) => {
            console.log(vid);
            let total_seconds = 0;
            let seconds = 0;
            let minutes = 0;
            let hours = 0;
            let type = "continuationItemRenderer" in vid ? "continuation" : "vid";
            if (type == "vid") {
                let renderer_type = "videoRenderer" in vid["richItemRenderer"]["content"] ? "vid" : "radio";
                if (renderer_type != "vid") {
                    return false
                }

                let time = vid["richItemRenderer"]["content"]["videoRenderer"]["lengthText"]["simpleText"];
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
                return total_seconds > 75 && total_seconds < 4800;
            }
            else {
                return true;
            }
        });
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
