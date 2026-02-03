---
layout: post
title:  "VRChaeology"
summary: "Tools and Gameplay Programmer"
date:   2022-10-09 15:39:40
preview: /assets/VRch/MainMenuSquare300.png
---

![VRCH_Banner](/assets/VRch/vrch_banner.png)

**Overview** 
VRchaeology revolutionizes the study of archaeology by bringing archaeological field techniques into the classroom through Virtual Reality (VR). This innovative approach allows students to delve into the world of archaeology and unearth the past right from their desks. It serves as a pioneering example of how VR can transform the education of field sciences, making hands-on learning accessible to everyone.

The project was developed under The Stu/dio, a student led work-for-hire game development studio affiliated with the University of Illinois at Urbana-Champaign. The project is sponsored and owned by Dr. Laura Shackelford.

**Platform**

Unreal Engine 5 for PC VR Platforms

**Team Structure**

13 Members:
* 1 Project Manager
* 4 Programmers
* 1 Designer
* 5 Artists
* 1 Sound Design
* 1 Music Composer

---

**Contributions**

**Lab 4 Tools**

* Tape Measurer System
    * Performant Tool for measuring distance and ground level to perform tasks such as setting a 1m by 1m grid
    * Developed adjustable endpoints to intuitively mimic on-the-fly adjustments to measurements.

<img src="/assets/VRch/TM_use.gif" style="width: 100%; height: auto;">

<img src="/assets/VRch/TM_adjust2.gif" style="width: 100%; height: auto;">

* Stake System
    * Tool for placing stakes on the ground that mark the corners of a 1m by 1m grid.
    * Implemented a ray cast system that, upon successful measurements, activate stake targets and their validity for stake placements.

<img src="/assets/VRch/Stake_place.gif" style="width: 100%; height: auto;">

* Hammer Tool
    * Tool for hammering stakes into the ground.
    * Implemented collision with a cooldown system to create a more realistic experience of hammering multiple strikes to fix a stake.

* String Tool
    * Tool for tying stakes together, visibly creating the perimeter for the grid.
    * Implemented instancing and UE5's cable components to seamlessly generate string line and attachment points on Stakes.

**Tool Access Manager**

![TAM_TDD](/assets/VRch/NewToolAccessSystemTDD.png)

**Set grid (Level Scripting)**
* Scripted the 

**Set Grid Mini Tutorial (Level Scripting)**



* Set Grid and Set Grid Mini Tutorial Levels. This includes:
    * Building and Integrating archaeological tools for the Level: Tape Measurer, Stake, Hammer, String
    * Implementing Level Scripting using an in-house Quest and Task system
* Tool Access Manager System (TAM):
    * The Technical Design Doc I made:


