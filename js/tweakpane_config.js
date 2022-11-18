import { versions, fonts } from "./config.js";
/* Converting the URL parameters into an object. */
const urlParams = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
);
console.log(urlParams);
const pane = new Tweakpane.Pane();
let buildParam = urlParams;
const loadPage = () => {
    // //convert buildParam to url params
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
    //window.location.search = tempUrl;
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
//resolution - the image size, relative to the window size. Default is 1. Lowering this value may improve your performance, especially on high pixel density displays.
pane.addInput(
    { resolution: parseFloat(urlParams.resolution) || 1 },
    "resolution"
).on("change", function (e) {
    buildParam["resolution"] = e.value;
    loadPage();
});
// Width
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
//raindropLength - the vertical scale of "raindrops" in the columns. Can be any number.
pane.addInput(
    { raindropLength: urlParams.raindropLength || 0.75 },
    "raindropLength"
).on("change", function (e) {
    buildParam["raindropLength"] = e.value;
    loadPage();
});
// add Folder Speed
const folderSpeed = pane.addFolder({
    title: "Speed",
});

//animationSpeed - the overall speed of the animation. Can be any number.
folderSpeed
    .addInput(
        { animation: parseFloat(urlParams.animationSpeed) || 1 },
        "animation"
    )
    .on("change", function (e) {
        buildParam["animationSpeed"] = e.value;
        loadPage();
    });
//fallSpeed - the speed of the rain's descent. Can be any number.
folderSpeed
    .addInput({ fall: parseFloat(urlParams.fallSpeed) || 0.3 }, "fall")
    .on("change", function (e) {
        buildParam["fallSpeed"] = e.value;
        loadPage();
    });
//cycleSpeed - the speed that the glyphs change their symbol. Can be any number.
folderSpeed
    .addInput({ cycle: parseFloat(urlParams.cycleSpeed) || 0.03 }, "cycle")
    .on("change", function (e) {
        buildParam["cycleSpeed"] = e.value;
        loadPage();
    });

// Slant : the angle that the 2D raindrops fall, in degrees. Default is 0.
pane.addInput({ slant: urlParams.slant || 0 }, "slant").on(
    "change",
    function (e) {
        buildParam["slant"] = e.value;
        loadPage();
    }
);
//bloomSize - the glow quality, from 0 to 1. Default is 0.4. Lowering this value may help the digital rain run smoother on your device.
pane.addInput(
    { bloomSize: parseFloat(urlParams.bloomSize) || 0.4, max: 1, min: 0 },
    "bloomSize"
).on("change", function (e) {
    buildParam["bloomSize"] = e.value;
    loadPage();
});
//bloomStrength - the glow intensity, from 0 to 1. Default is 0.7.
pane.addInput(
    {
        bloomStrength: parseFloat(urlParams.bloomStrength) || 0.7,
        max: 1,
        min: 0,
    },
    "bloomStrength"
).on("change", function (e) {
    buildParam["bloomStrength"] = e.value;
    loadPage();
});

//ditherMagnitude - the amount to randomly darken pixels, to conceal banding. Default is 0.05.
pane.addInput(
    {
        ditherMagnitude: parseFloat(urlParams.ditherMagnitude) || 0.05,
    },
    "ditherMagnitude"
).on("change", function (e) {
    buildParam["ditherMagnitude"] = e.value;
    loadPage();
});

// Skip Intro
pane.addInput(
    { skipIntro: urlParams.skipIntro != undefined || false },
    "skipIntro"
).on("change", function (e) {
    if (e.value) {
        buildParam["skipIntro"] = "";
    } else {
        delete buildParam.skipIntro;
    }
    loadPage();
});

// add 3D config folder
const folder3D = pane.addFolder({
    title: "3D",
});
// Volumetric
folder3D
    .addInput(
        { Volumetric: urlParams.volumetric != undefined || false },
        "Volumetric"
    )
    .on("change", function (e) {
        if (e.value) {
            buildParam["volumetric"] = true;
        } else {
            delete buildParam.volumetric;
        }
        loadPage();
    });
// Density
folder3D
    .addInput({ Density: urlParams.density || 1.0 }, "Density")
    .on("change", function (e) {
        if (e.value) {
            buildParam["density"] = e.value;
        } else {
            delete buildParam.density;
        }
        loadPage();
    });
// forwardSpeed
folder3D
    .addInput({ forwardSpeed: urlParams.forwardSpeed || 1.0 }, "forwardSpeed")
    .on("change", function (e) {
        if (e.value) {
            buildParam["forwardSpeed"] = e.value;
        } else {
            delete buildParam.forwardSpeed;
        }
        loadPage();
    });

// Add Font
pane.addBlade({
    view: "list",
    label: "Fonts",
    options: Object.keys(fonts).map((e) => {
        return { text: e, value: e };
    }),
    value: urlParams.font || "matrixcode",
}).on("change", function (e) {
    console.log(e.value);
    //new version
    buildParam["font"] = e.value;
    loadPage();
});

// effect - alternatives to the default post-processing effect. Can be "plain", "pride", "stripes", "none", "image" or "mirror".
//("none" displays the 'debug view', a behind-the-scenes look at the anatomy of the effect.)
pane.addBlade({
    view: "list",
    label: "effect",
    options: [
        { text: "plain", value: "plain" },
        { text: "pride", value: "pride" },
        { text: "stripes", value: "stripes" },
        { text: "none", value: "none" },
        { text: "image", value: "image" },
        { text: "mirror", value: "mirror" },
    ],
    value: urlParams.effect || "palette",
}).on("change", function (e) {
    console.log(e.value);
    //new version
    buildParam["effect"] = e.value;
    loadPage();
});
//stripeColors - if you set the effect to "stripes", you can specify the colors of vertical stripes as alternating R,G,B numeric values,
// like so: &stripeColors=1,0,0,1,1,0,0,1,0
pane.addInput(
    { stripeColors: urlParams.stripeColors || "" },
    "stripeColors"
).on("change", function (e) {
    if (e.value) {
        buildParam["stripeColors"] = e.value;
    } else {
        delete buildParam.stripeColors;
    }
    loadPage();
});
// add RGB config folder
const folderRGB = pane.addFolder({
    title: "RGB",
});

//palette — with the normal "palette" effect, you can specify the colors and placement of the colors along the color grade as alternating R,G,B,% numeric values,
//like so: palette=0.1,0,0.2,0,0.2,0.5,0,0.5,1,0.7,0,1
folderRGB
    .addInput({ palette: urlParams.palette || "" }, "palette")
    .on("change", function (e) {
        if (e.value) {
            buildParam["palette"] = e.value;
        } else {
            delete buildParam.palette;
        }
        loadPage();
    });
//backgroundColor, cursorColor, glintColor — other R,G,B values that apply to the corresponding parts of the effect.
folderRGB
    .addInput(
        {
            background: urlParams.backgroundColor
                ? {
                      r: parseInt(urlParams.backgroundColor?.split(",")[0]),
                      g: parseInt(urlParams.backgroundColor?.split(",")[1]),
                      b: parseInt(urlParams.backgroundColor?.split(",")[2]),
                  }
                : { r: 0, g: 0, b: 0 },
        },
        "background"
    )
    .on("change", function (e) {
        if (e.last) {
            console.log(e);
            buildParam["backgroundColor"] =
                parseInt(e.value.r) +
                "," +
                parseInt(e.value.g) +
                "," +
                parseInt(e.value.b);
            //loadPage();
        }
    });
folderRGB
    .addInput({ cursorColor: urlParams.cursorColor || "" }, "cursorColor")
    .on("change", function (e) {
        if (e.value) {
            buildParam["cursorColor"] = e.value;
        } else {
            delete buildParam.cursorColor;
        }
        loadPage();
    });
folderRGB
    .addInput({ glintColor: urlParams.glintColor || "" }, "glintColor")
    .on("change", function (e) {
        if (e.value) {
            buildParam["glintColor"] = e.value;
        } else {
            delete buildParam.glintColor;
        }
        loadPage();
    });
