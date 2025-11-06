---
title: "NuVPU"
excerpt: "Neural Video Codec-integrated Video Processor<br/><img src='/images/project/NuVPU_VLSI25_2404_2408.png'><br/><img src='/images/project/NuVPU_VLSI25_architecture.png'>"
collection: portfolio
---

<img src="/images/project/NuVPU_VLSI25_2404_2408.png" alt="NuVPU VLSI25" style="max-width: 400px; width: 100%; height: auto; margin: 20px 0;">

<img src="/images/project/NuVPU_VLSI25_architecture.png" alt="NuVPU Architecture" style="max-width: 400px; width: 100%; height: auto; margin: 20px 0;">

**Tape-out:** 2024/04 | **Wafer-out:** 2024/08

My Contributions:
- Development of frequency-driven mixed compression
- Design of Memory Management Unit

Target NVC increases intermediate data by up to 100×, causing large EMA due to pixel shuffle layers. Therefore, NuVPU proposes 2-step memory optimization scheme to reduce EMA. First, FAC introduces frequency-driven mixed quantization which adjusts the quantization level based on the frequency of each tile, improving the cache hit ratio with 2.9× higher compression efficiency than JPEG at the same PSNR degradation (<0.05dB). Second, ATS dynamically optimizes tile processing order to maintain a high warping ratio within cache capacity. When memory thresholds are exceeded, ATS shifts from spatial to temporal processing to prevent overflow. Together, they achieve an 81.3% reduction in EMA.