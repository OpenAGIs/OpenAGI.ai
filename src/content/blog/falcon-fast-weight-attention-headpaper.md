---
title: "HeadPaper｜FALCON：Fast-Weight Attention for Continual Learning（论文对照翻译）"
description: "完整一对一论文翻译（首批核心章节）+ 原文图表PNG与数据表CSV提取，解读FALCON如何用next-latent配对改造fast-weight在线学习。"
date: 2026-03-18
author: "OpenAGI"
authorHandle: "openagi_ai"
tags: ["paper", "headpaper", "falcon", "continual-learning", "ssm", "linear-attention"]
image: "/blog/falcon-2026-03-18/figures/figure-page-p002.png"
---

> 本文基于 HeadPaper Skills 生成：逐段 EN/ZH 对照翻译 + 图表原封提取。

## 论文信息

- **Title**: FALCON: Fast-Weight Attention for Continual Learning  
- **Date**: March 9, 2026  
- **Project**: <https://github.com/yifanzhang-pro/FALCON>

## TL;DR

FALCON 把 SSM/Fast-weight 的状态更新从“经验规则”改写成“在线学习规则”。在 read-after-write 语义下，作者强调正确训练对应是 **(k_{t-1}, v_t)**，不是常见写法 **(k_t, v_t)**。基于这点，提出 FALCON-2/3/3A，并兼顾并行训练友好性。

## 三个标题备选

1. FALCON 论文精读：把 Fast-Weight 记忆改写为“在线回归学习”
2. 从 KV Cache 到固定状态：FALCON 如何做持续学习与下一潜变量预测
3. FALCON（2026）全解：Fast-Weight Attention 的因果对齐与滑窗更新

---

## 原文图表（PNG原封提取）

### Figure（page 2）
![Figure page 2](/blog/falcon-2026-03-18/figures/figure-page-p002.png)

### Figure（page 7）
![Figure page 7](/blog/falcon-2026-03-18/figures/figure-page-p007.png)

### Figure（page 8）
![Figure page 8](/blog/falcon-2026-03-18/figures/figure-page-p008.png)

---

## 逐段对照翻译（核心章节首批）

### P001
**EN**: FALCON: Fast-Weight Attention for Continual Learning.

**ZH**: FALCON：面向持续学习（Continual Learning）的快速权重注意力（Fast-Weight Attention）。

---

### P002
**EN**: State-Space Models (SSMs) and fast-weight memories achieve constant-cost decoding by compressing history into a fixed-size recurrent state, but the local write/forget rule is often treated heuristically.

**ZH**: 状态空间模型（State-Space Models, SSMs）与快速权重记忆（fast-weight memories）通过将历史压缩到固定大小的循环状态中，实现了常数成本解码；但其局部“写入/遗忘”规则往往以启发式方式给出。

---

### P003
**EN**: Under the read-after-write convention adopted here, there is a simple indexing pitfall: a recurrence written in the standard Transformer convention binds (k_t, v_t), whereas the causally aligned internal fast-memory training pair for next-token modeling is (k_{t-1}, v_t), equivalently (k_i, v_{i+1}) under standard indexing.

**ZH**: 在本文采用的 read-after-write 约定下，存在一个常见索引陷阱：按标准 Transformer 记法写的递推绑定的是 \((k_t, v_t)\)；而对 next-token 建模而言，因果对齐的内部快速记忆训练对应该是 \((k_{t-1}, v_t)\)，在标准索引下等价为 \((k_i, v_{i+1})\)。

---

### P004
**EN**: We make this next-latent pairing explicit throughout and cast the state update as online learning: after observing step t, the recurrent state performs an update on the causal pair (k_{t-1}, v_t) and is then read to support prediction at step t+1.

**ZH**: 论文将这种“下一潜变量配对（next-latent pairing）”在全文中显式化，并将状态更新表述为在线学习：在观察到第 \(t\) 步后，循环状态先基于因果对 \((k_{t-1}, v_t)\) 更新，再被读取以支持 \(t+1\) 步预测。

---

### P005
**EN**: Transformers are the ubiquitous backbone of modern NLP ... However, standard attention scales quadratically O(N^2) with sequence length N, creating compute and KV-cache bandwidth bottlenecks for long context.

**ZH**: Transformer 是现代 NLP 的主干架构；但标准注意力的复杂度随序列长度 \(N\) 呈 \(O(N^2)\) 增长，在长上下文下会造成注意力矩阵计算与 KV Cache 带宽的双重瓶颈。

---

### P006
**EN**: Beyond efficiency, long-context modeling is also a continual-learning problem: the model needs a fast memory that binds new evidence online while avoiding catastrophic interference from unbounded accumulation.

**ZH**: 除了效率问题，长上下文建模本质上还是持续学习问题：模型需要一种“快速记忆”，在线绑定新证据，同时避免无界累积导致的灾难性干扰。

---

### P007
**EN**: Transformers externalize this fast memory as a growing KV cache, while SSMs and fast-weight models compress it into a fixed-size recurrent state. The temporal alignment of the update rule determines whether memory is trained on information actually available at prediction time.

**ZH**: Transformer 将快速记忆外化为不断增长的 KV Cache；而 SSM 与 fast-weight 模型则将其压缩为固定大小的循环状态。状态更新规则的时间对齐方式，决定了记忆是否在“预测时真实可用的信息”上被训练。

---

### P008
**EN**: Linear Attention, Fast Weight Programmers, RWKV, and Mamba are competitive with Transformers in selected small/medium-scale regimes while preserving O(N) training and O(1) per-step inference.

**ZH**: 线性注意力（Linear Attention）、Fast Weight Programmers、RWKV、Mamba 等架构在一些中小规模场景中可与 Transformer 竞争，同时保持训练 \(O(N)\) 与推理单步 \(O(1)\) 的复杂度特性。

---

## 方法解读（短版）

- **核心一**：先修正时间配对，再讨论写入规则。  
- **核心二**：把状态更新写成在线回归/优化问题。  
- **核心三**：滑窗 mini-batch 让持续学习更稳，且利于并行。  
- **核心四**：FALCON-3A 解耦写入强度（ρ）与遗忘（α）。

---

## 原文数据表（CSV原样提取）

可直接下载/引用：

- `/blog/falcon-2026-03-18/tables/table-p002-001.csv`
- `/blog/falcon-2026-03-18/tables/table-p002-002.csv`
- `/blog/falcon-2026-03-18/tables/table-p029-003.csv`
- `/blog/falcon-2026-03-18/tables/table-p029-004.csv`
- `/blog/falcon-2026-03-18/tables/table-p029-005.csv`
- `/blog/falcon-2026-03-18/tables/table-p030-006.csv`
- `/blog/falcon-2026-03-18/tables/table-p031-007.csv`

---

## 说明

- 本文为 HeadPaper 首批翻译版本（核心章节）。
- 后续会继续补齐全文逐段对照翻译与实验章节完整表格排版。
- 最终结论以论文原文与作者后续版本为准。
