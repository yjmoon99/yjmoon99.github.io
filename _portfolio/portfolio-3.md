---
title: "NuVPU"
excerpt: "Neural Video Codec-integrated Video Processor<br/><img src='/images/project/NuVPU_VLSI25_2404_2408.png'><br/><img src='/images/project/NuVPU_VLSI25_architecture.png'>"
collection: portfolio
---

<img src="/images/project/NuVPU_VLSI25_2404_2408.png" alt="NuVPU VLSI25" style="max-width: 400px; width: 100%; height: auto; margin: 20px auto; display: block;">
<div style="background-color: #ffffff; border: 1px solid #e0e0e0; padding: 12px 15px; margin: 15px 0; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
<strong style="color: #333333; font-size: 0.95em;">⚡ Youngjin:</strong> <span style="color: #000000; font-weight: 600; font-size: 0.95em;"> Architect & FE Designer (Memory Management Unit)</span>
</div>
<img src="/images/project/NuVPU_VLSI25_architecture.png" alt="NuVPU Architecture" style="max-width: 400px; width: 100%; height: auto; margin: 20px auto; display: block;">


**Tape-out:** 2024/04 | **Wafer-out:** 2024/08

<p style="margin-bottom: 1.5em;"></p>

<p style="margin-bottom: 0.3em;"><strong>My Contributions:</strong></p>
<ul style="margin-top: 0;">
<li>Development of frequency-driven mixed compression</li>
<li>Design of Memory Management Unit</li>
</ul>

Target NVC increases intermediate data by up to 100×, causing large EMA due to pixel shuffle layers. Therefore, NuVPU proposes 2-step memory optimization scheme to reduce EMA. First, FAC introduces frequency-driven mixed quantization which adjusts the quantization level based on the frequency of each tile, improving the cache hit ratio with 2.9× higher compression efficiency than JPEG at the same PSNR degradation (<0.05dB). Second, ATS dynamically optimizes tile processing order to maintain a high warping ratio within cache capacity. When memory thresholds are exceeded, ATS shifts from spatial to temporal processing to prevent overflow. Together, they achieve an 81.3% reduction in EMA.