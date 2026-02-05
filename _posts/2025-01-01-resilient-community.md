---
layout: post
title:  "Resilient Community"
summary: "Programmer"
date:   2025-01-01 00:00:00
preview: /assets/RC/Itch_Logo_BG_square_300.png
---

![RC_Banner](/assets/RC/HDBanner_scaled.png)

**Overview**

Resilient Community is a board game-to-PC/mobile port. The board game was originally developed by Prof. Eun Cha & Abby Beck to teach students electric infrastructure decision-making skills. The Stu/dio is bringing access to the educational experience to digital platforms, where the game will increase its reach and access to current and future generations of students.

The project was developed under The Stu/dio, a student led work-for-hire game development studio affiliated with the University of Illinois at Urbana-Champaign. Sponsors: Eun Jeong Cha, Luc Paquette, Eric Shaffer, UIUC Computer Science and Civil & Environmental Engineering.

(Publicly available links will not be provided as per requests of Sponsors)

**Platform**

Godot 4 for HTML5 and Web Platforms

**Team Structure**

9 Members:
* 1 Associate Producer
* 1 Project Manager
* 3 Programmers
* 1 Designer
* 1 Artists
* 1 Sound Designer
* 1 Music Composer

---

**Contributions**

**QA Feedback and Updates**
* Resolved turn progression bugs by standardizing the turn count system across the main game loop which removed incorrect cutscene/dialogue triggers.
* Established consistent game terminology through Collaboration with Sponsors to eliminate ambiguity in the game and codebase.

Before:

<figure><img src="/assets/RC/RC_stats_OLD.png" style="width: 100%; height: auto;"><figcaption> Turn Counter was at 0. "Stones" didn't make sense in the context of the game and is not used dialogue.</figcaption></figure>

After:

<figure><img src="/assets/RC/RC_stats_NEW.png" style="width: 100%; height: auto;"><figcaption> Turn Counter starts at 1. "Retrofits" makes more sense in the context of the game as it is used in dialogue.</figcaption></figure>

* Defined a color-based neighborhood naming convention, that replaced an arbitrary income-level descriptions that are neither obvious nor explained, to enhanced player experience.

Before:

<figure><img src="/assets/RC/RC_renamed_neighborhood_OLD.gif" style="width: 100%; height: auto;"><figcaption> Non-functioning neighborhood was named "MultiFamilyHousing" which doesn't indicate exactly which neighborhood needs help.</figcaption></figure>

After:

<figure><img src="/assets/RC/RC_renamed_neighborhood.gif" style="width: 100%; height: auto;"><figcaption> Non-functioning neighborhood is now named "Yellow" which clearly indicates which neighborhood needs help.</figcaption></figure>

**Data Collection Pipeline**
* Identified a critical data collection failure point in the callback process of HTTP GET requests, presented resolutions to sponsors, and expedited fix implementations.
* Redesigned QA pipeline architecture by removing redundant HTTP POST requests, combining them into 1 system that delegates tasks based on certain parameters.

**Iterative Builds and Deployment**
* Established iterative build deployment process for sponsors to track feature implementations and bug fixes efficiently across development cycles.
* Deployed game builds via Itch.io (development builds) and Amazon Web Services (shipment builds), to streamline distribution by providing sponsors with a direct access link that removed installation barriers for students.
