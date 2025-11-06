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

Mamba has recently emerged as a powerful sequence modeling framework designed to replace transformers, offering linear time and space complexity for in-context learning tasks such as long-range video understanding. While video mamba achieves high accuracy with efficient scalability, its deployment on resource-constrained edge platforms is hindered by two critical challenges: (1) slow inference latency caused by its inherently iterative state-space model (SSM) operations, and (2) excessive energy consumption due to frequent external memory access (EMA), particularly when processing high resolution, long-duration video streams. To address these limitations, SLYTHERIN introduces redundancy-centric architectural components that jointly optimize computation and memory access.
First, a 6-stage pipelined task allocator dynamically identifies and skips computations via orchestrated redundancy management, effectively reducing computational load. Second, a reformed computing SSM core improves throughput by
 decoupling mamba's sequential bottlenecks through operation reordering and eliminating redundant computation dependen
cies. Third, a patch data management unit mitigates EMA induced energy overhead through a difference-based bit sliced compression scheme that exploits spatio-temporal data locality
