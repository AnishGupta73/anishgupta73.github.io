---
layout: webgl
title:  "Raytracer"
summary: "Design Intern"
date:   2022-09-06 15:39:40
preview: /assets/postpreview.png
---

![Picture 1](/assets/fullsize.png)

Put down info here, either in bullets or paragraphs.


<!DOCTYPE html>
<html>
<head>
<title>Name</title>
<script src="/assets/MPTerrain/terrain.js"></script>
<script src="/assets/MPTerrain/math.js"></script>
    <style>
    body {
        margin: 0; border: none; padding: 0;
        display: flex; flex-direction: column;
        width: 100%; height: 100vh;
    }
    .controls {
        flex: 0 0 auto;
    }
    .controls > * { margin: 1em; }
    .display {
        flex-grow: 1;
        line-height: 0rem;
    }
    </style>
</head>
<body>
    <form class="controls" action="javascript:void(0);">
        <label>Grid size: <input id="gridsize" type="number" value="50"/></label>
        <label>Faults: <input id="faults" type="number" value="50"/></label>
        <input id="submit" type="submit" value="Regenerate Terrain"/>
    </form>
    <div class="display">
        <canvas width="300" height="300"></canvas>
    </div>
</body>
</html>