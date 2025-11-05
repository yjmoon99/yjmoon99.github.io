---
title: "SMoLPU"
excerpt: "Sparse MoE-based Speculative Decoding LLM Processor<br/><img src='/images/project/SMoLPU_ISSCC26_2503_2507.png'><br/><img src='/images/project/SMoLPU_ISSCC26_architecture.png'>"
collection: portfolio
---

<img src="/images/project/SMoLPU_ISSCC26_2503_2507.png" alt="SMoLPU ISSCC26" style="max-width: 400px; width: 100%; height: auto; margin: 20px 0;">

<img src="/images/project/SMoLPU_ISSCC26_architecture.png" alt="SMoLPU Architecture" style="max-width: 400px; width: 100%; height: auto; margin: 20px 0;">

My Contributions:
- Development of token adaptive expert refinement and a MoE PSUM management policy
- Design of memory management unit

Each phase in sparse MoE-based speculative decoding LLM system has its own challenges. The decoding stage suffers from significant weight redundancy, caused by both unnecessary activation of experts for mis-predicted (and thus rejected) tokens and sparsity arising since  the expert outputs are scaled by their routing score. In prefill stage, sequential loading of 4 MB experts requires PSUM caching to aggregate all expert outputs, which enlarges the PSUM footprint and further increases EMA. SMoLPU proposes Token adaptive Expert Refinement (TaER) with a weight management unit (WMU) and a PSUM management unit (PMU) that eliminate redundant expert fetching and reduce EMA.
