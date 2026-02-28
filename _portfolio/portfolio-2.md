---
title: "SLYTHERIN"
excerpt: "Redundancy-consciously Designed Video Mamba Accelerator<br/><img src='/images/project/SLYTHERIN_ISCAS25.png'>"
collection: portfolio
---

<img src="/images/project/SLYTHERIN_ISCAS25.png" alt="SLYTHERIN ISCAS25" style="max-width: 550px; width: 100%; height: auto; margin: 20px auto; display: block;">

SLYTHERIN is a chip architecture that embodies the meaning as a space where the Mamba model can move smoothly like a snake, just like "Slytherin" in Harry Potter.

<p style="margin-bottom: 0.3em;"><strong>My Contributions:</strong></p>
<ul style="margin-top: 0;">
<li>Development of total features in SLYTHERIN</li>
<li>Design of total SLYTHERIN</li>
</ul>

This work introduces SLYTHERIN, a redundancy-conscious accelerator design that exposes and eliminates structural redundancy inherent in state-space model (SSM)-based video inference. Recent video models have increasingly adopted SSM to replace attention mechanisms, enabling linear time and space complexity in sequence length, well-suited for long-range video understanding. However, despite its algorithmic efficiency, its deployment on resource-constrained platforms remains challenging due to (1) slow inference latency caused by sequential SSM operations and (2) excessive energy consumption dominated by frequent external memory access (EMA), particularly for high-resolution, long-duration video streams.
SSM-based video inference inherently exhibits multiple forms of structural redundancy stemming from sequential state updates and spatio-temporal input characteristics. To address these redundancies, SLYTHERIN instantiates three architectural mechanisms that jointly optimize computation and memory access. First, an orchestrated task allocator eliminates token-level redundancy by identifying and removing redundant and low-importance tokens through input-adaptive token selection. Second, a reformulated SSM core removes state update redundancy by reordering SSM operations and applying fixed-size block processing, enabling localized state updates with reduced memory traffic. Third, a patch data management unit mitigates EMA energy through difference-based bit-sliced compression that exploits inter-frame locality.