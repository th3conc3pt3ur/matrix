import { versions } from "./config.js";
/* Converting the URL parameters into an object. */
const urlParams = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
);
console.log(urlParams);
const pane = new Tweakpane.Pane();
let buildParam = urlParams;
const loadPage = () => {
    //convert buildParam to url params
    let keys = Object.keys(buildParam);
    let value = Object.values(buildParam);
    let tempUrl = "";
    keys.forEach((key, i) => {
        if (i === 0) {
            tempUrl += "?";
        } else {
            tempUrl += "&";
        }
        tempUrl += key + "=" + value[i];
    });
    window.location.assign(
        window.location.origin + window.location.pathname + tempUrl
    );
};
// Add Versions Blade
pane.addBlade({
    view: "list",
    label: "Versions",
    options: Object.keys(versions).map((e) => {
        return { text: e, value: e };
    }),
    value: urlParams.version || "",
}).on("change", function (e) {
    console.log(e.value);
    //new version
    buildParam["version"] = e.value;
    loadPage();
});

// Skip Intro Param
const PARAMS = {
    Width: 80,
};
pane.addBlade({
    view: "slider",
    label: "width",
    min: 0,
    max: 100,
    value: parseInt(urlParams.width) || 80,
}).on("change", function (e) {
    console.log(e.value);
    //new version
    buildParam["width"] = e.value;
    loadPage();
});
