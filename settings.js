class Settings {
    constructor(
        max_duration = 1800,
        min_duration = 61,
        hide_shorts = true,
        hide_community = true,
        hide_subscriptions = false,
        hide_recommendations = true,
        hide_mixes = true,
        hide_livestreams = true
    ) {
        this.max_duration = max_duration;
        this.min_duration = min_duration;
        this.hide_shorts = hide_shorts;
        this.hide_community = hide_community;
        this.hide_subscriptions = hide_subscriptions;
        this.hide_recommendations = hide_recommendations;
        this.hide_mixes = hide_mixes;
        this.hide_livestreams = hide_livestreams;
    }

    save() {
        var { ...settings_obj } = this;
        browser.storage.local.set({
            "settings": settings_obj
        }).then((e) => { })
    }

    restore_defaults() {
        console.log("restore_defaults")

        this.max_duration = 1800;
        this.min_duration = 61;
        this.hide_shorts = true;
        this.hide_community = true;
        this.hide_subscriptions = false;
        this.hide_recommendations = true;
        this.hide_mixes = true;
        this.hide_livestreams = true;

        this.save();
    }

    toggle_value(value) {
        console.log(this);
        console.log('toggle', value);
        this[value] = !this[value];
        this.save();
        console.log(this);
    }
}

async function checkPermissions() {
    const currentPermissions = await browser.permissions.getAll();
    if (!currentPermissions.origins.includes("*://*.youtube.com/*")) {
        document.getElementById("give_permission").style.display = "block";
    }
}
checkPermissions();

async function requestPermissions() {
    await browser.permissions.request({
        origins: ["*://*.youtube.com/*"]
    });
}

let give_permission_btn = document.getElementById("give_permission_btn");
give_permission_btn.addEventListener("click", function () {
    requestPermissions()
    window.close()
});


browser.storage.local.get("settings").then((local_settings) => {
    var settings;
    console.log(local_settings);
    if (local_settings.settings) {
        console.log("settings loaded from localstorage")
        settings = new Settings(local_settings.settings);
    }
    else
        settings = new Settings();

    console.log(settings);

    document.getElementById("restore_defaults").addEventListener("click", (e) => settings.restore_defaults());
    document.getElementById("hide_subscriptions").addEventListener("click", (e) => settings.toggle_value("hide_subscriptions", e.checked));
    document.getElementById("hide_recommendations").addEventListener("click", (e) => settings.toggle_value("hide_recommendations", e.checked));
    document.getElementById("hide_mixes").addEventListener("click", (e) => settings.toggle_value("hide_mixes", e.checked));
    document.getElementById("hide_livestreams").addEventListener("click", (e) => settings.toggle_value("hide_livestreams", e.checked));
});
