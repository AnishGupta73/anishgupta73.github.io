---
layout: post
title:  "Dimension Swapping Platformer"
summary: "Creator/Designer/Programmer"
date:   2022-09-07 15:39:40
preview: /assets/DimSwapGame/index.apple-touch-icon.png
---

This game, temporarily named "Dimension Swapping Platformer" is a 2D puzzle-platformer built in Godot 4 where the player navigates between two parallel dimensions, each containing different platforms. Shifting between worlds by pressing LSHIFT or Right Click is the core mechanic: platforms only exist in one dimension, so progression requires reading the environment and swapping

<iframe 
  src="/assets/DimSwapGame/index.html" 
  width="800" 
  height="450" 
  frameborder="0"
  allowfullscreen>
</iframe>

Quick Controls Tutorial:

* Move with WASD keys or arrow keys

* Swap dimensions with LSHIFT, Z key, or Right Click with mouse


## Technical Highlights

**Signal-based dimension system** 
Platforms self-register into a group during `_ready()` and receive the player's `dimension_swapped` signal, wired at runtime by the level. This decouples platforms from
the player entirely; placing a new platform in a level requires no manual wiring.

**Unified platform script with auto-detection** 
A single `platform.gd` script handles both TileMapLayer-based and StaticBody2D-based platforms by inspecting its own children at startup, applying one-way
collision and dimension visibility logic through different APIs depending on which type it is.

**Runtime one-way collision via TileData API** 
Godot's scene format silently strips one-way polygon properties from `.tscn` files, so one-way collision is applied programmatically on load using the
`TileData` API, iterating each tile and polygon in the atlas source.

**Collision-aware fade transitions** 
When a platform's dimension becomes active, collision is enabled *before* the fade-in begins so the player can land on it during the animation. When it becomes
inactive, collision is removed *after* the fade-out completes so the player never falls through a partially visible platform.

**Death and respawn sequence** 
On death, the camera detaches from the player, saves its world position, and freezes while the player falls naturally under gravity. A timed red flash plays before the
camera re-attaches, the player respawns, and smoothing is snapped to prevent the camera panning back from the death point.

**Goal entry polish** 
Rather than cutting to the next level instantly, inputs are disabled on goal contact and friction naturally decelerates the player. The level waits frame-by-frame until the player
is both grounded and fully stopped before playing idle and starting the level-end sequence.

**Checkpoint system with duck-typing** 
Checkpoints detect valid bodies using `has_method("respawn")` rather than type checks, keeping them decoupled from the player class. The `AnimatedSprite2D`
activates on first contact and the updated spawn position persists until the level is restarted.