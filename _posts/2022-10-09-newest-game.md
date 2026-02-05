---
layout: post
title:  "VRChaeology"
summary: "Programmer"
date:   2022-10-09 15:39:40
preview: /assets/VRch/VRch_Logo_square.png
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

**Archaeology Tools (Gameplay features)**

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

<img src="/assets/VRch/Hammer_hammer.gif" style="width: 100%; height: auto;">

* String Tool
    * Tool for tying stakes together, visibly creating the perimeter for the grid.
    * Implemented instancing and UE5's cable components to seamlessly generate string line and attachment points on Stakes.

<img src="/assets/VRch/String_string1.gif" style="width: 100%; height: auto;">

<img src="/assets/VRch/String_string2.gif" style="width: 100%; height: auto;">

* Flag Tool
    * Tool for placing flags on the floor, marking artifact locations.
    * Implements ray casting for placement, and collisions for deletion of flags.

<img src="/assets/VRch/Flag_place_delete.gif" style="width: 100%; height: auto;">

<img src="/assets/VRch/Flag_place_delete_many.gif" style="width: 100%; height: auto;">

**Tool Access Manager**

* Inspired by Steam's Tool System, implemented a universal Tool Equipping System in which each level can assign the tools it uses.
* Developed the fan-shaped arrangement of tools using 3D Vector math, which dynamically updates depending on the number of tools assigned.

<img src="/assets/VRch/TAM_equip_tutorial.gif" style="width: 100%; height: auto;">

<img src="/assets/VRch/TAM_equip.gif" style="width: 100%; height: auto;">

<img src="/assets/VRch/NewToolAccessSystemTDD.png" style="width: 100%; height: auto;">

<img src="/assets/VRch/TAM_diagram.png" style="width: 50%; height: auto;">

**Level Scripting: Set Grid & Set Grid Mini Tutorial**

* Programmed Level Scripting Tasks using State Machine logic and event dispatchers to control the flow of level Design
* Designed modular states for cleaner tracking and debugging of level flow

<img src="/assets/VRch/Lab4LevelScripting_cropped.png" style="width: 100%; height: auto;">
