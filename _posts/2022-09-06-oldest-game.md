---
layout: webgl
title:  "WebGL Terrain Generator"
summary: "WebGL Fault Algorithm Terrain"
date:   2022-09-06 15:39:40
preview: /assets/postpreview.png
---

**About This Project**

The goal of this project is to create a procedurally generated terrain for a mountains in video games.

This project uses a simple fracture-based fractal to make a gird of specified size look like rough terrain. 

* Implemented using WebGL2
* Fault-based terrain generation algorithm
* Real-time 3D rendering with lighting

Adjust the Grid Size and Fault counts.

Press the Button to generate terrain!

<form class="controls" action="javascript:void(0);">
    <label>Grid size: <input id="gridsize" type="number" value="50"/></label>
    <label>Faults: <input id="faults" type="number" value="50"/></label>
    <input id="submit" type="submit" value="Regenerate Terrain"/>
</form>

<div class="display">
    <canvas width="800" height="600"></canvas>
</div>

<script src="/assets/MPTerrain/math.js"></script>
<script src="/assets/MPTerrain/terrain.js"></script>

<style>
.controls {
    margin: 1em 0;
}
.controls > * { 
    margin: 0.5em; 
}
.display {
    line-height: 0;
    margin: 1em 0;
}
.display canvas {
    width: 100%;
    max-width: 100%;
    height: 600px;
    border: 1px solid #ccc;
}
</style>