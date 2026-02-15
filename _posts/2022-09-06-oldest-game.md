---
layout: webgl
title:  "WebGL Terrain Generator"
summary: "WebGL Fault Algorithm Terrain"
date:   2022-09-06 15:39:40
preview: /assets/postpreview.png
---

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

## About This Project

This terrain generator uses a fault algorithm to create realistic-looking terrain. Adjust the grid size and number of faults, then click "Regenerate Terrain" to see different variations.

**Technical Details:**
- Implemented using WebGL2
- Fault-based terrain generation algorithm
- Real-time 3D rendering with lighting