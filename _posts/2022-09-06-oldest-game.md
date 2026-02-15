---
layout: webgl
title:  "Raytracer"
summary: "Design Intern"
date:   2022-09-06 15:39:40
preview: /assets/postpreview.png
---

![Picture 1](/assets/fullsize.png)

Put down info here, either in bullets or paragraphs.


<script src="/assets/MPTerrain/terrain.js"></script>
<script src="/assets/MPTerrain/math.js"></script>

<form class="controls" action="javascript:void(0);">
    <label>Grid size: <input id="gridsize" type="number" value="50"/></label>
    <label>Faults: <input id="faults" type="number" value="50"/></label>
    <input id="submit" type="submit" value="Regenerate Terrain"/>
</form>
<div class="display">
    <canvas width="300" height="300"></canvas>
</div>