---
title: "FALCON 论文完整中文翻译（仅中文+图片）"
description: "HeadPaper 完成版：仅保留完整中文翻译与PNG图片，公式密集区域以图片替换。"
date: 2026-03-18
author: "OpenAGI"
authorHandle: "openagi_ai"
tags: ["paper", "headpaper", "falcon", "translation"]
image: "/blog/falcon-2026-03-18/figures/figure-page-p002.png"
---

# FALCON 论文完整中文翻译（仅中文+图片）

## 论文原图

![figure-page-p002.png](/blog/falcon-2026-03-18/figures/figure-page-p002.png)

![figure-page-p007.png](/blog/falcon-2026-03-18/figures/figure-page-p007.png)

![figure-page-p008.png](/blog/falcon-2026-03-18/figures/figure-page-p008.png)

![formula-page-p001.png](/blog/falcon-2026-03-18/figures/formula-page-p001.png)

![formula-page-p002.png](/blog/falcon-2026-03-18/figures/formula-page-p002.png)

![formula-page-p003.png](/blog/falcon-2026-03-18/figures/formula-page-p003.png)

![formula-page-p004.png](/blog/falcon-2026-03-18/figures/formula-page-p004.png)

![formula-page-p005.png](/blog/falcon-2026-03-18/figures/formula-page-p005.png)

![formula-page-p006.png](/blog/falcon-2026-03-18/figures/formula-page-p006.png)

![formula-page-p007.png](/blog/falcon-2026-03-18/figures/formula-page-p007.png)

![formula-page-p008.png](/blog/falcon-2026-03-18/figures/formula-page-p008.png)

![formula-page-p009.png](/blog/falcon-2026-03-18/figures/formula-page-p009.png)

![formula-page-p010.png](/blog/falcon-2026-03-18/figures/formula-page-p010.png)

![formula-page-p011.png](/blog/falcon-2026-03-18/figures/formula-page-p011.png)

![formula-page-p012.png](/blog/falcon-2026-03-18/figures/formula-page-p012.png)

![formula-page-p013.png](/blog/falcon-2026-03-18/figures/formula-page-p013.png)

![formula-page-p014.png](/blog/falcon-2026-03-18/figures/formula-page-p014.png)

![formula-page-p015.png](/blog/falcon-2026-03-18/figures/formula-page-p015.png)

![formula-page-p016.png](/blog/falcon-2026-03-18/figures/formula-page-p016.png)

![formula-page-p017.png](/blog/falcon-2026-03-18/figures/formula-page-p017.png)

![formula-page-p018.png](/blog/falcon-2026-03-18/figures/formula-page-p018.png)

![formula-page-p019.png](/blog/falcon-2026-03-18/figures/formula-page-p019.png)

![formula-page-p020.png](/blog/falcon-2026-03-18/figures/formula-page-p020.png)

![formula-page-p021.png](/blog/falcon-2026-03-18/figures/formula-page-p021.png)

![formula-page-p022.png](/blog/falcon-2026-03-18/figures/formula-page-p022.png)

![formula-page-p023.png](/blog/falcon-2026-03-18/figures/formula-page-p023.png)

![formula-page-p024.png](/blog/falcon-2026-03-18/figures/formula-page-p024.png)

![formula-page-p025.png](/blog/falcon-2026-03-18/figures/formula-page-p025.png)

![formula-page-p026.png](/blog/falcon-2026-03-18/figures/formula-page-p026.png)

![formula-page-p027.png](/blog/falcon-2026-03-18/figures/formula-page-p027.png)

![formula-page-p028.png](/blog/falcon-2026-03-18/figures/formula-page-p028.png)

![formula-page-p029.png](/blog/falcon-2026-03-18/figures/formula-page-p029.png)

![formula-page-p030.png](/blog/falcon-2026-03-18/figures/formula-page-p030.png)

![formula-page-p031.png](/blog/falcon-2026-03-18/figures/formula-page-p031.png)

![formula-page-p032.png](/blog/falcon-2026-03-18/figures/formula-page-p032.png)

![formula-page-p038.png](/blog/falcon-2026-03-18/figures/formula-page-p038.png)

![formula-page-p039.png](/blog/falcon-2026-03-18/figures/formula-page-p039.png)

![formula-page-p040.png](/blog/falcon-2026-03-18/figures/formula-page-p040.png)

![formula-page-p041.png](/blog/falcon-2026-03-18/figures/formula-page-p041.png)

![formula-page-p042.png](/blog/falcon-2026-03-18/figures/formula-page-p042.png)

![formula-page-p043.png](/blog/falcon-2026-03-18/figures/formula-page-p043.png)

![formula-page-p044.png](/blog/falcon-2026-03-18/figures/formula-page-p044.png)

![formula-page-p045.png](/blog/falcon-2026-03-18/figures/formula-page-p045.png)

![formula-page-p046.png](/blog/falcon-2026-03-18/figures/formula-page-p046.png)

![formula-page-p047.png](/blog/falcon-2026-03-18/figures/formula-page-p047.png)

![formula-page-p048.png](/blog/falcon-2026-03-18/figures/formula-page-p048.png)

![formula-page-p049.png](/blog/falcon-2026-03-18/figures/formula-page-p049.png)

![formula-page-p050.png](/blog/falcon-2026-03-18/figures/formula-page-p050.png)

![formula-page-p051.png](/blog/falcon-2026-03-18/figures/formula-page-p051.png)

![formula-page-p052.png](/blog/falcon-2026-03-18/figures/formula-page-p052.png)

![formula-page-p053.png](/blog/falcon-2026-03-18/figures/formula-page-p053.png)

![formula-page-p054.png](/blog/falcon-2026-03-18/figures/formula-page-p054.png)

![formula-page-p055.png](/blog/falcon-2026-03-18/figures/formula-page-p055.png)

![formula-page-p056.png](/blog/falcon-2026-03-18/figures/formula-page-p056.png)

## 完整中文翻译

**P0001** F ALCON：快速重量关注
持续学习
固件 A 作者
2026 年 3 月 9 日
摘要
状态空间模型（SSM）和快速权重存储器通过以下方式实现恒定成本解码
将历史记录压缩为固定大小的循环状态，但本地写/忘记规则通常是
启发式地对待。根据这里采用的先写后读约定，有一个简单的
索引陷阱：以标准 Transformer 约定编写的递归绑定（kt，vt），
而用于下一个令牌建模的因果对齐内部快速记忆训练对是
(kt−1, vt)，相当于标准索引下的(ki, vi+1)。我们进行下一个潜在配对
显式贯穿整个过程并将状态更新投射为在线学习：在观察stept之后，
循环状态对因果对(kt−1, vt)执行更新，然后被读取以支持
stept+1 处的预测。
项目页面：https://github.com/yifanzhang-pro/FALCON
1 简介
Transformers (Vaswani et al., 2017) 是现代自然语言无处不在的支柱
处理、支持基础大型语言模型 (LLM)，例如 GPT-4（Achiam 等人，
2023）、Gemini（Team 等人，2023）和 Llama（Touvron 等人，2023）。变压器的功效
源于自注意力机制，该机制模拟全局依赖关系以生成丰富的、
上下文感知的表示。然而，这种能力是有代价的：标准注意力量表
二次O(N 2)，序列长度为N。这种复杂性给
长上下文处理，其中注意力矩阵和内存所需的计算
键值 (KV) 缓存的带宽变得令人望而却步。
除了效率之外，长上下文建模也是一个持续学习的问题：模型需要
快速记忆可以在线绑定新证据，同时避免来自无限的灾难性干扰
积累。 Transformer 将这种快速内存外部化为不断增长的键值 KV 缓存。 SSM
另一方面，快速权重模型将其压缩为固定大小的循环状态。在这个
设置时，状态更新规则充当局部学习规则，其时间对齐决定
快速记忆是否根据预测时实际可用的信息进行训练（Sun
等，2024；刘等人，2024a； Behrouz 等人，2024；王等人，2025）。
诸如 Linear Attention (Katharopoulos et al., 2020)、Fast Weight Programmers (Schlag et al., 2021)、RWKV (Peng et al., 2023) 和 Mamba (Gu and Dao, 2023) 等架构
1

![formula-page-p002.png](/blog/falcon-2026-03-18/figures/formula-page-p002.png)

**P0002** 在中小型体系的选定基准上与变形金刚具有竞争力，同时
在训练中保持 O(N) 缩放比例，在推理过程中保持每步 O(1) 复杂性。
尽管取得了这些进步，但管理循环状态的更新规则，即模型如何编写
记忆中的记忆和遗忘，仍然主要是启发式的。此外，一旦确定了严格的
本文使用先写后读语义，存在一个简单的索引陷阱：许多重复
是根据标准 Transformer 约定编写的，因此是 bind(kt, vt)。在此之下
惯例，stept 中揭示的因果训练示例将新观察到的 targetvt 与
在stept−1 中计算的前缀特征。同样，在标准 Transformer 索引下，
预测关联是(ki, vi+1)。我们使这种依赖于约定的下一个潜在配对变得明确
整个过程。
Titans 和 ATLAS 将循环状态视为通过优化内部训练来训练的快速记忆
流上的目标（Behrouz 等人，2024，2025a）。我们的贡献是正交的：我们使
自回归训练显式配对（写后读下的 kt−1→vt）并导出与 SSD 式块并行训练保持兼容的封闭形式一阶更新（Dao 和 Gu，2024）。在
特别是，F ALCON-3 在滑动窗口上使用单个小批量梯度步骤。它的回归
形成关联扫描/并行流展开，而其内积对应物 F ALCON-
3A 承认隐藏注意力的展开。相比之下，许多线性注意力/SSD 公式依赖于
纯加性内积写入。
在这项工作中，我们通过自回归的视角探讨了基于状态的建模的基础
下一个潜在预测。我们将状态更新形式化为显式在线优化问题
并明确我们的先读后写下一个潜在约定所需的一步转换。在我们的
框架中，循环状态矩阵St充当线性预测器，尝试映射前缀
写出 featurext := phi(kt−1)tov t。通过分析 SSM 和线性注意力作为在线优化器，
我们确定不同的目标函数、平方误差回归与负内积
目标（相当于非正则化情况下的内积最大化），驱动他们
各自的动态。我们的贡献如下：
• 我们将循环状态解释为通过在线学习规则更新的快速权重。的
增益 βt 控制可塑性（Liu et al., 2024a），岭系数 λt 导致遗忘，并且
滑动窗口变体实现了有界排练信号，减轻了长距离
干扰。
• FALCON-2：我们从归一化最小均方导出改进的 Delta 更新规则
（NLMS）算法。通过引入输入范数归一化和每列自适应
增益和衰减，F ALCON-2 明确考虑了不同的输入规范和异构
输出特征动态，同时保持并行效率。
• FALCON-3：我们通过小批量将回归目标推广到滑动状态机制
SGD，产生有限窗口优化信号，减轻远程干扰和
使用可并行算法进行噪声累积，以实现硬件友好的训练和推理。
这与ATLAS中引入的Omega学习规则密切相关（Behrouz et al., 2025a），
它在滑动上下文窗口上优化内部记忆目标，而不仅仅是
最新的令牌。
FALCON-3A：我们引入了与滑动状态对应的内积，将块并行训练与滑动窗口累积规则和解耦参数化相结合
可塑性和遗忘的影响：写入系数ρt控制注入幅度，而a
无量纲衰减分数αt 控制遗忘。
3

![formula-page-p004.png](/blog/falcon-2026-03-18/figures/formula-page-p004.png)

**P0003** 这里εattn≥0是一个小稳定器。仅当读取规范化器时才使用规范化形式
是非负的，例如对于正特征图，其中 phi(·)≥0 元素，因此 z⊤
t ψ(qt)≥0。在
签名特征设置（包括没有额外正性约束的恒等映射），
εattn 只防止被零除，并且不会使分母类似注意力；在这种情况下，
下面介绍的无分母形式是数学上相关的默认值。
因果关系和索引。 (2.3) 遵循标准 Transformer 约定：在positiont我们
从更新后的状态（St，zt）中读取，所得表示用于预测tokent+1。
我们的下一个潜在对齐将写入流移动一位：在观察vt之后，我们将其写入
先前的 keykt−1，或等效地，在标准索引下 i =t−1 下的 (ki, vi+1)。这产生
写后读循环
yt = S⊤
t φ(qt)
z⊤
t ψ(qt) +εattn
,S t =S t−1+ψ(kt−1)v⊤
t ,z t =z t−1+ψ(kt−1),(2.4)
其中εattn≥0是一个小稳定剂。定义移位密钥流~kt :=k t−1, 方程（2.4）匹配
等式。 (2.3) 将kt 替换为~kt 后；实质性的变化是键值对齐(~kt,vt)。
归一化与非归一化线性注意力。方程中的分母。 (2.2) 使用归一化器
statez t 重新调整读数。许多 SSM/SSD 风格的架构反而会降低分母
(andz t) 并使用非标准化内积读取：
yt =S⊤
t ψ(qt),S t = (1−ηtλt)St−1+ηtψ(kt−1)v⊤
，（2.5）
通过用 k t 替换 kt−1 来恢复未移位的约定。在这种无分母的形式中，
有界状态幅度和可控记忆时间尺度是通过显式衰减来强制执行的（例如，
λt> 0) 和/或增益控制。 4.3节表明加性更新正是梯度下降
内积目标。
这个递推是第 4.3 节中内积目标的梯度下降更新。
当 λt = 0 时，写入纯粹是加性秩一赫布学习；当λt > 0时，是可加的
加上标量收缩。如第 2.1 节所述，Mamba-2 证明无归一化器重现是
功能上相当于SSD框架下的特定类别的SSM。
2.3 台达网络
Fast Weight Programmers 和 Delta Networks (Schlag et al., 2021) 将序列建模公式化为
价值检索函数的在线学习。设St−1∈Rd×dv表示快速权状态矩阵。
标准 Delta Networks 采用错误驱动更新，而不是纯粹的累加累积
从状态重建之间的瞬时平方误差的梯度导出
当前键和值：
ℓt(S) := 1
2
S⊤kt−vt

2
2
.(2.6)
这里，S⊤kt 表示模型对给定 keykt 的 valuevt 的预测。相对于的梯度
状态为 ∇Sℓt(S) =k t
（
S⊤kt−vt
）⊤。
步长约定。我们用 ηt 表示梯度步长（之前的 DeltaNet 文献经常写道
该数量为βt)。这使得符号与第 3 节保持一致，其中 βt 表示 NLMS 增益
5

**P0004** 和 ηt 得到的步长。步长为 ηt 的在线梯度下降的单步得出
德尔塔规则：
St =S t−1−ηt kt(S⊤
t−1kt−vt)⊤= (I−ηtktk⊤
t )St−1+ηtktv⊤
t.(2.7)
一阶因子(I−ηtktk⊤
t ) 沿当前关键点方向执行有针对性的收缩/编辑。
仅在特殊情况下，它才变成子空间正交 tokt 上的正交投影
ηt = 1/∥kt∥2
2. 这与线性注意力的纯加性更新形成对比。
门控 Delta 网络。门控 Delta 网络的最新研究（Yang 等人，2024a）观察到
Delta规则的隐式遗忘完全取决于kt和状态之间的对齐，
这可能不足以快速进行上下文切换。他们将曼巴风格的门控与
通过引入显式衰减门αt∈[0,1] 的 delta 规则：
St =g t(I−ηtktk⊤
t )St−1+ηtktv⊤
，（2.8）
其中我们写 gt∈[0, 1]（Yang 等人（2024a）中表示为 αt 的门）以避免符号过载。
这种门控 Delta 规则提供了两种互补机制：gt 允许全局状态衰减
（与 SSM 类似），而一级项 (I−ηtktk⊤
t ) 对键值执行有针对性的编辑
协会。
3 自回归下一个潜在预测
在本节中，我们将循环状态更新形式化，而不是作为历史的启发式积累，
但作为一个显式优化问题。根据此处采用的先写后读约定，
在线目标必须在时间上与下一个令牌预测保持一致。标准达美网络
最小化∥S⊤kt−vt∥2，即，它们在对（kt，vt）上进行训练。根据我们的惯例，因果训练
stept 中显示的示例将新观察到的 targetvt 与现有的前缀特征配对
当v t 被预测时（在stept−1）。这产生了下一个潜在配对kt−1→vt（等价地，
标准 Transformer 索引下的 ki→vi+1）。
我们假设隐藏状态S充当在线训练的线性预测器来映射kt−1→vt。
考虑一个键序列{kt}T
t=1 和值{vt}T
t=1。我们将状态更新制定为在线
岭回归问题（Behrouz 等人，2024；Wang 等人，2025；Behrouz 等人，2025a）。
在stept处，写特征必须是从前缀到t−1可计算的，而写特征必须是可计算的
只有在显示 stept 后，目标才可用。因此，我们的下一个潜在对齐配对
前一个键与当前值，xt ≜ phi(kt−1)andy t ≜ vt （其中 phi 中的恒等式
非核化情况），并通过在线岭回归步骤进行更新（Wang 等人，2025；Behrouz
等，2024、2025a）。 steptis 处的瞬时正则化最小二乘目标：
ℓt(S)≜ 1
2
S⊤xt−yt

2
2
+ λt
2∥S∥2
F,(3.1)
其中λt≥0是正则化系数。同时全批次最小化累积损失
对应于 MesaNet (von Oswald et al., 2025) 等方法中找到的离线解决方案，高效
自回归建模需要在线近似。因此我们采用在线梯度
血统（OGD）。
符号。在核化线性注意力中，写入内存的密钥通常是特征向量
ψ(k)εRm 而不是原始密钥 kεRd。本节中的所有推导均经过解释
xt = phi (kt−1) ∈ R m , S t ∈ R m × d v ,
6

![formula-page-p007.png](/blog/falcon-2026-03-18/figures/formula-page-p007.png)

![formula-page-p008.png](/blog/falcon-2026-03-18/figures/formula-page-p008.png)

![formula-page-p009.png](/blog/falcon-2026-03-18/figures/formula-page-p009.png)

![formula-page-p010.png](/blog/falcon-2026-03-18/figures/formula-page-p010.png)

![formula-page-p011.png](/blog/falcon-2026-03-18/figures/formula-page-p011.png)

![formula-page-p012.png](/blog/falcon-2026-03-18/figures/formula-page-p012.png)

![formula-page-p013.png](/blog/falcon-2026-03-18/figures/formula-page-p013.png)

![formula-page-p014.png](/blog/falcon-2026-03-18/figures/formula-page-p014.png)

![formula-page-p015.png](/blog/falcon-2026-03-18/figures/formula-page-p015.png)

**P0005** 算法2并行化FALCON-2（Chunk-wise Forward，λt = 0）
要求：移位写入特征KεRL×dx，查询特征QεRL×dx，值VεRL×dv，每通道步长ηεRL×dv且ηt，j≥0。块大小C（假设C|L）。
确保：仅投影仪递归的输出 O ∈ RL × dv (λt = 0)。
1：将长度-L 轴划分为 M = L/C 连续块。对于每个块 m，令
K(m), Q(m) εRC×dx 和 V (m) εRC×dv 和 η(m) εRC×dv 表示通常的行优先
切片。
2：对于WY/Gram代数，使用列主块矩阵
K(m) :=K⊤
(m)∈Rdx×C,Q (m) :=Q⊤
(m)∈Rdx×C。
3:InitializeS in←0dx×dv ▷(或者提供的初始状态)
4：初始化输出缓冲器O←0L×dv。
5:形式= 1,...,Mdo
6:K←K(米),Q←Q(米),V←V(米),η←η(米)
7:Σ← √η▷ C×d v
8:G←K ⊤K▷ C×C(共享基 Gram)
9:M←tril(Q ⊤K,0)▷ C×C（未缩放分数；先写后读）
10:H←Q ⊤Sin,P←K ⊤Sin ▷ C×dv
11:▷对于每个通道j，构建L j =I+ tril(G⊙(Σ:,jΣ⊤
:,j),−1) 并求解Ljzj =Σ :,j⊙V:,j
且 L jγj =Σ :,j⊙P:,j
12：Z←批量求解Tri
（
{Lj}dv
j=1,V⊙Σ
）
▷ C×dv；专栏
13: ←BatchedSolveTri
（
{Lj}dv
j=1,P⊙Σ
）
▷ C×dv；柱jisγ j
14:B←Σ⊙(Z−Γ)▷ C×d v
15:O (m)←H+MB▷ C×d v（块输出）
16:S out←Sin +KB▷ d x×dv（块退出状态）
17:WriteO (m)←O(m) ▷存储到行(m−1)C+1 :mCofO
18:S in←Sout ▷传播到下一个块
19：结束
20：返回O。
因此，精确等价需要步长重新调整 ���j,t = �j,t/γj,t 和逆衰减
重新调整每列写入目标。当钳位处于非活动状态时 (λtηj,t< 1−εγ)，这与
与未夹紧的复发完全一致；否则，它是具有较小值的数字安全替代项
收缩路径中的有效衰减。在实践中，我们使用 chunk-local log-prefix 来实现这一点
衰减而不是全局产品ct,j；附录D给出了显式的内核。
块并行实现。FALCON-2 可以通过分块来进行序列并行训练
长度轴并在每个块内使用 Gram/WY 表示。对于每个通道的步长，
每个价值维度都有自己的单位下三角系统，但所有系统共享相同的
基本 Gram 矩阵G=K ⊤Kinside 一个块。算法 2 总结了分块前向传递
对于仅投影仪的情况（λt = 0）；附录 D 导出了这种对偶形式并讨论了 λt > 0
扩展。
16

![formula-page-p017.png](/blog/falcon-2026-03-18/figures/formula-page-p017.png)

![formula-page-p018.png](/blog/falcon-2026-03-18/figures/formula-page-p018.png)

**P0006** 定义窗口平均统计量
́C(B)
t：= 1
转氨酶
乙(B)
t , N(B)
t：= 1
转氨酶
乙（乙）
t。
那么窗口平均损失的梯度是
∇Sℓreg,(B)
t (St−1) = C(B)
t St−1−́N(B)
t+λtSt−1。
更新规则。我们应用块归一化梯度步骤：
St =S t−1−ηt∇Sℓreg,(B)
t (St−1).(4.11)
替换梯度产生仿射更新
圣=
（
Idx−ηt( ́C(B) )
t+λtIdx)
）
St−1+ηt N(B)
t.(4.12)
同样，收集更新前状态的残差
St = (1−ηtλt)St−1+ ηt
转氨酶
Σ
j∈It
xj
（
vj−S⊤
t−1xj
)⊤.(4.13)
这是方程（3.3）的直接小批量模拟：所有窗口残差均在
预更新状态St−1，并且更新平均它们的一阶梯度。
Fort≥2，我们对窗口平均协方差使用保守的迹/能量归一化：
́E(B)
t := tr( ¯C(B)
) = 1
转氨酶
Σ
j∈It
∥xj∥2
2 = tr(C(B)
)
转氨酶
, η t = β t
́E(B)
t+λt+ε
, β t∈(0,2), ε>0。
由于 ℓreg,(B)
t 是 L(B)
使用 L(B) 进行 t 平滑
t = λmax( ́C(B)
t ) +λt 和 λmax( ́C(B)
t )≤tr( ́C(B)
t ) = E(B)
t ,
每当 L(B)
t > 0此归一化确保 ηt∈(0, 2/L(B)
t ) 对于任何 βt ∈ (0, 2)，所以引理 3.1
适用于平滑度L(B)
t 并保证每步下降。如果L(B)
t = 0（等价地，C(B)
时间=0
且 λt = 0), 则 ́N(B)
t = 0 也是如此，更新是无操作的。至关重要的是，因为我们优化了
窗口平均值，均为 ́N(B)
t 和 E(B)
t = tr( ¯C(B)
t ）是平均值而不是总和，因此它们的典型值
比例不随标称窗口大小而增长 B.如果写入功能本身是 RMS 归一化的
（例如， 是恒等式或近似保持范数），则 ¯E(B)
对于任意B，t ≈dx；对于一个通用的
kernel mapphi，正确的说法就是 ́E(B)
t 跟踪已实现的平均写入功能
能量。因此，无论是注入 ηt ¯N(B)
t 或衰减分数 αt :=ηtλt 是系统性的
通过增加而放大 B.如果启用了第 4.1 节的尺度耦合脊参数化，
将本小节中的 λt 替换为 λeff
t := ´λt ´E(B)
t。在当前的实现中，这
构建 λeff 时，窗口平均能量用作仅统计乘数
t（分离
/ 通过乘法器停止梯度），而步长分母仍然使用 live¯E(B)
t。
重要的是，不需要具体化 dx×dx 矩阵 C (B)
t 应用渐变：如果我们堆叠
窗口将特征写入Xt∈Rdx×|It|，然后
́C(B)
t St−1= 1
转氨酶
Xt
（
X⊤
t St−1
）
,(4.14)
19

![formula-page-p020.png](/blog/falcon-2026-03-18/figures/formula-page-p020.png)

![formula-page-p021.png](/blog/falcon-2026-03-18/figures/formula-page-p021.png)

![formula-page-p022.png](/blog/falcon-2026-03-18/figures/formula-page-p022.png)

![formula-page-p023.png](/blog/falcon-2026-03-18/figures/formula-page-p023.png)

![formula-page-p024.png](/blog/falcon-2026-03-18/figures/formula-page-p024.png)

![formula-page-p025.png](/blog/falcon-2026-03-18/figures/formula-page-p025.png)

![formula-page-p026.png](/blog/falcon-2026-03-18/figures/formula-page-p026.png)

![formula-page-p027.png](/blog/falcon-2026-03-18/figures/formula-page-p027.png)

**P0007** 5 实验
我们的主要实证评估是大约 124M-130M 参数的语言建模。我们
使用匹配的 50B 代币预算训练 FineWeb-Edu 上的所有模型，并评估保留的模型
困惑度和下游任务的准确性。然后我们使用两个支持诊断： 可变长度
多位加法，隔离因果存储和长度外推，以及长上下文
检索，探索干扰下的记忆。除非表行另有说明，否则快速权重
模型使用第 4.1 节的缩放公式，并且下一个潜在对齐是通过以下方式实现的
使用 ZeroBOSwrite 功能将写入密钥流移动一个位置，因此第一次写入是
无操作。对于 FALCON-2A，行标签 ctxβ 和 ctx η 是运行标识符，指示学习的是否
控制被解释为NLMS增益βt或归一化后写入系数ηt；的
4.3 节中的理论以增益参数化形式写成方程（4.8）。血统讨论
直接适用于增益参数化形式； direct-etat 运行应被理解为经验
除非对 λt > 0 的所有步骤单独强制执行 ηtλt< 2。对于 FALCON-3A，
实际递归总是使用第4.5节的解耦(ρt,αt)参数化；标签如
ctxη-ctxλ 是旧版运行名称，应仅读取为上下文相关的可塑性/衰减标签，
不是字面量 (ηt,λt) 状态变量。 QK-RMSNorm 和 QK-ℓ2 表示查询/密钥标准化
在快速重量块内使用。
5.1 语言建模实验
我们训练 124M-130M 参数模型，进行 100,000 个优化步骤，序列长度为 1,024
全局批量大小为 480，总预算约为 49.2B 代币（约 50B）。的
Transformer 基线使用带有 RoPE 和 SwiGLU 的 LLaMA 风格架构。经常性基线
包括 RetNet/LightningAttn、Mamba-2、DeltaNet 和门控 DeltaNet。完成的猎鹰
这种规模的语言建模运行是 FALCON-2A 变体。除非明确消融，否则快速权重模型在注意力投影上使用 QK-RMSNorm 和轻量级短卷积。
对于这些运行，所有模型都使用 AdamW 在 bfloat16 中进行训练，绑定输入/输出嵌入，
Pre-Norm RMSNorm，无偏差项，无 dropout。我们使用μP式的宽度缩放，基础学习
速率 10−3，余弦衰减和 2,000 个预热步骤，(β1,β2) = (0.9, 0.95)，权重衰减 0.1，并且
梯度裁剪为 1.0。所有运行均在单个 4-GPU 节点（H100 或 H200）上执行。我们报道
教师强制的困惑和零样本/单样本下游精度。
在验证集困惑度上，如表 1 所示，FALCON 有竞争力，但不均匀
强于最佳基线。我们的变体包括 FALCON-2A.3（QK-RMSNorm、ctxη-ctxλ）
给出了最好的困惑度，在 FineWeb-Edu 验证中达到 17.64，而 Gated DeltaNet 仍然如此
此处比较的模型中整体最强。表2显示，相同的next-latent
更新也相当好地转移到下游评估：FALCON-2A.2 取得了最佳成绩
在此比较中，其零射击平均值，其单射击平均值仍与 Mamba-2 具有竞争力
和变压器。在 FALCON 系列中，QK-RMSNorm 改善了相对于
QK-ℓ2 归一化，而 ctxη 相对于相应的 ctxβ 提高了平均下游精度
变体。因此，主要的收获并不是在这种规模上取得一致的胜利，而是我们的自回归
对齐的、标准化的快速权重更新在现实的预训练下保持语言模型的质量
预算。
28

**P0008** 表 1 在 FineWeb-Edu 上针对 50B 代币预算训练的具有 124M-130M 参数的模型比较。
越低越好。
模型困惑↓
维基百科。左键。精细教育。
124M-130M参数
(124M) 变压器（带绳索）33.25 47.43 17.38
(130M) RetNet/LightningAttn36.86 65.16 18.79
(130M) 曼巴-234.53 48.74 17.70
(130M) DeltaNet34.19 52.84 17.84
(130M) 门控 DeltaNet30.99 46.70 17.32
我们的
(130M)FALCON-2A.1 (QK-ℓ2-范数, ctxβ-ctxλ) 34.41 47.93 17.70
(130M)FALCON-2A.2 (QK-ℓ2-范数, ctxη-ctxλ) 34.20 51.01 17.70
(130M)FALCON-2A.3 (QK-RMSNorm, ctxη-ctxλ)34.02 49.84 17.64
表 2 语言模型转移到下游任务。零样本和单样本精度。精度使用
ACC；标记为*use acc_n 的任务如 lm-evaluation-harness 中所示。平均。是未加权平均值
8 项任务。
模型精度↑
PIQA Hella。* 酒诺。 ARC-e ARC-c* OBQA* 社交 IQA SciQ 平均。
零射击（0-shot）
124M-130M参数
(124M) 变压器（带绳索）65.67 37.54 51.70 52.36 27.65 31.60 38.84 79.90 48.16
(130M) RetNet/LightningAttn64.91 35.36 49.64 57.62 26.28 32.20 37.97 80.40 48.05
(130M) 曼巴-266.32 36.89 50.75 58.16 26.62 32.60 38.38 80.70 48.80
(130M) DeltaNet66.38 37.15 52.33 57.37 26.79 34.00 39.00 78.00 48.88
(130M) 门控 DeltaNet65.51 37.75 49.72 58.88 27.90 31.60 38.28 80.60 48.78
我们的
(130M)FALCON-2A.1 (QK-ℓ2-范数, ctxβ-ctxλ)66.05 37.27 50.67 57.62 27.65 31.60 38.95 81.1048.86
(130M)FALCON-2A.2 (QK-ℓ2-范数, ctxη-ctxλ)67.03 37.29 52.33 57.37 25.94 33.20 38.84 82.4049.30
(130M)FALCON-2A.3 (QK-RMSNorm, ctxη-ctxλ)66.10 37.55 50.12 59.01 26.79 32.00 37.82 82.2048.95
一发（一发）
(124M) 变压器（带绳索）66.43 37.55 50.28 59.64 29.01 30.00 39.82 84.60 49.67
(130M) RetNet/LightningAttn65.13 35.19 49.64 56.78 25.85 28.80 36.44 81.50 47.42
(130M) 曼巴-266.70 36.61 51.07 58.63 26.96 32.40 37.97 82.90 49.16
(130M) DeltaNet66.27 36.67 50.36 57.70 27.39 32.00 37.72 79.90 48.50
(130M) 门控 DeltaNet65.40 37.81 51.30 58.29 26.88 30.00 37.26 81.60 48.57
我们的
(130M)FALCON-2A.1 (QK-ℓ2-范数, ctxβ-ctxλ)66.81 37.41 50.75 57.53 27.99 32.40 37.92 81.8049.08
(130M)FALCON-2A.2 (QK-ℓ2-范数, ctxη-ctxλ)66.38 36.97 52.96 57.32 27.82 31.40 37.56 83.2049.20
(130M)FALCON-2A.3 (QK-RMSNorm, ctxη-ctxλ)65.78 37.22 49.72 58.88 27.73 31.40 37.97 82.4048.89
5.2 变长算术加法任务
我们使用可变长度的多位加法作为因果存储的受控压力测试
遵循 Kaiser 和 Sutskever (2015) 的推断。每个样本均呈现一位数字提示
29

![formula-page-p030.png](/blog/falcon-2026-03-18/figures/formula-page-p030.png)

**P0009** 表4 长上下文检索结果。124M-130M参数训练的模型比较
FineWeb-Edu 上的 50B 代币预算。所有条目均为长上下文检索准确率（%，越高越好）
根据匹配的评估协议。显示为 TBD 的条目表示尚未完成的运行
写作时，并没有在文本中讨论。
模型 NIAH 风格↑上下文回忆/构图↑
S-NIAH-1024 S-NIAH-2048 MultiQuery-NIAH VarTrack CommonWords
124M-130M参数
(124M) 变压器（带绳索）100.00 7.81 1.95 0.31 8.75
(130M) RetNet/LightningAttn待定 待定 待定 待定
(130M) 曼巴-243.75TBD12.11 10.31 0.16
(130M) DeltaNet85.93 12.50 13.28 14.69 2.97
(130M) 门控 DeltaNet71.88 9.38 3.13 18.13 0.00
我们的
(130M)FALCON-2A.1（QK-ℓ2-范数，ctxβ-ctxλ）待定 待定 待定 待定
(130M)FALCON-2A.2（QK-ℓ2-范数，ctxη-ctxλ）待定 待定 待定 待定
(130M)FALCON-2A.3 (QK-RMSNorm, ctxη-ctxλ) 待定 待定 待定 待定
6 相关工作
高效序列建模和状态空间对偶性。标准变压器（Vaswani 等人，
2017）由于注意力的具体化而产生quadraticO(N 2)计算和内存成本
矩阵。为了解决这个问题，线性注意力（Katharopoulos et al., 2020）通过内核特征图重新排序矩阵乘法，有效地将上下文视为循环累积
外部产品。其他次二次注意力替换包括随机特征近似
到softmax注意力，例如Performer（Choromanski et al., 2020）、长卷积算子
例如 Hyena (Poli et al., 2023) 和保留型循环注意力 (Sun et al., 2023) 或
RNN-Transformer 混合体（Peng 等人，2023）。结构化状态空间的并行开发
模型 (SSM)，例如 S4 (Gu et al., 2021) 和 Mamba (Gu and Dao, 2023)，利用离散化
连续时间动态来实现类似的线性缩放。最近，Mamba-2（道和古，
2024）将这些范式统一在结构化状态空间二元性（SSD）下，证明选择性
SSM 在算法上与具有半可分离掩码的线性注意力对偶。而 Mamba-2 和
相关的 SSD 风格模型侧重于硬件利用率（通过块并行扫描）和表现力
离散化，它们很大程度上保留了附加或门控累积作为状态写入规则。相反，我们的工作重新审视引起状态更新的目标。我们通过自回归推导
对齐的、NLMS 稳定的回归更新和保持兼容的滑动窗口变体
具有 SSD 风格的块并行训练。
快速权重和 Delta 网络。快速权重的概念（Schmidhuber，1992）指出
神经网络可以维护一个由立即更新的高容量短期记忆矩阵
输入流。施拉格等人。 (2021) 将其形式化为线性变压器秘密地快速重量
程序员提出了 Delta Network，它通过梯度步骤更新状态
预测误差而不是赫布加法。杨等人。 (2024a) 通过 Gated Delta 扩展了这一点
网络，引入 Mamba 式门控以提高稳定性。然而，这些先前的方法
通常将更新规则视为架构选择而不是优化问题。
31

**P0010** 自适应过滤和在线回归。快速权重模型中使用的增量规则更新是
与经典自适应滤波密切相关，其中 LMS delta 规则及其归一化变体
（NLMS）是用于规模鲁棒在线回归的标准算法，以及二阶方法，例如
因为递归最小二乘法 (RLS) 以更高的成本提供精确的在线岭更新（Sayed，2011）。
我们基于 NLMS 的 FALCON-2 更新可以被视为导入这些稳定性/标准化
将原则纳入严格因果关系下的快速重量注意力，同时保持与现代的兼容
线性递归的并行实现（Yang 等人，2024b；Dao 和 Gu，2024；Cirone 和
萨尔维，2025）。
上下文学习作为隐式优化。最近的理论工作解释了前向传递
Transformers 在上下文示例中执行隐式（预处理）梯度下降
（Von Oswald 等人，2023；Ahn 等人，2023；Cheng 等人，2023）。冯·奥斯瓦尔德等人。 （2025）明确
通过提出解决前向最小二乘问题的 Mesa-Layers 来实现这一点
通过。 MesaNet 通过求解（或近似求解，取决于
停止标准）通过共轭梯度的顺序线性系统，设计明确针对
以块并行方式，以增加推理计算为代价。与网络类比
分层即分解，我们的方法符合这种层作为优化器的哲学（Chiang
et al., 2007），但将解决方案限制为严格的在线更新。我们形式化状态空间
模型作为在线岭回归器预测下一个嵌入。这种观点使我们能够
将滑动窗口注意力机制与循环状态更新统一起来，从而产生滑动窗口
状态机制：通过小批量进行有限窗口遗忘的数学基础方法
SGD（Behrouz 等人，2025a），弥合了局部注意力和全局复发之间的差距。
上下文工程和内存管理。设计更好的注意力的补充
以及硬件高效的循环快速存储器（Guo 等人，2025；Zhang 等人，2025b），
一系列工作研究情境工程：管理和转变呈现给他人的情境
模型。这包括 KV 缓存压缩、量化或驱逐方案，以减少
长上下文开销，同时保留显着信息（Liu et al., 2024c；Xiao et al., 2024；
张等人，2025a)。其他方法通过多时间尺度记忆来看待情境学习
将短期激活与突触/可塑性快速权重相结合的系统（Schlag et al., 2021；
Behrouz 等人，2025b)。
7 结论
在本文中，我们将自回归序列模型重新定义为显式的下一个潜在预测
问题。根据始终使用的先写后读约定，常见的快速权重循环
暂时移动一步；我们通过使用一个框架来明确这一转变，其中
状态映射skt−1tov t。在此镜头的基础上，我们推出了F ALCON-2（NLMS-归一化
增量更新），F ALCON-3（通过单个小批量梯度步骤的滑动窗口回归），以及
内积对应物F ALCON-2A/F ALCON-3A。在我们的受控添加任务中
∼130M FineWeb-Edu 语言建模实验，这些更新具有强大的竞争力
线性循环基线，同时使用显式自回归对齐的下一个潜在写入约定。
更广泛地说，我们的框架将 SSM 式序列模型作为持续学习系统
明确的快速记忆目标，提供稳定性与可塑性权衡的原则性处理
通过习得的可塑性、遗忘和有限的排练。
32

**P0011** 参考文献
乔什·阿希亚姆、史蒂文·阿德勒、桑迪尼·阿加瓦尔、拉马·艾哈迈德、伊尔格·阿卡亚、弗洛伦西亚·莱奥尼·阿莱曼、
迪奥戈·阿尔梅达、扬科·阿尔滕施密特、萨姆·奥尔特曼、Shyamal Anadkat 等。 GPT-4技术
report.arXiv 预印本 arXiv:2303.08774, 2023。
Kwangjun Ahn、Xiang Cheng、Hadi Daneshmand 和 Suvrit Sra。变压器学习实施
用于上下文学习的预条件梯度下降。神经信息处理的进展
系统，36：45614–45650，2023。
Jimmy Ba、Geoffrey E Hinton、Volodymyr Mnih、Joel Z Leibo 和 Catalin Ionescu。使用快
关注最近的权重。神经信息处理系统的进展，2016 年 29 月。
阿里·贝鲁兹、钟培林和瓦哈卜·米罗克尼。泰坦：在考试时学习记忆.arXiv
预印本 arXiv:2501.00663, 2024。
Ali Behrouz、Zeman Li、Praneeth Kacham、Majid Daliri、邓远、钟培林、Meisam
拉扎维亚因和瓦哈卜·米罗克尼。 Atlas：学习以最佳方式记住测试时的上下文
time.arXiv 预印本 arXiv:2505.23735, 2025a。
Ali Behrouz、Meisam Razaviyayn、钟培林和 Vahab Mirrokni。嵌套学习：错觉
深度学习架构。arXiv 预印本 arXiv:2512.24695, 2025b。
克里斯蒂安·比绍夫和查尔斯·范·洛恩。 Housener 矩阵乘积的 wy 表示。
SIAM 科学与统计计算杂志，8(1):s2–s13，1987 年。
程翔、陈雨馨、Suvrit Sra。 Transformer 实现函数梯度下降
在 context.arXiv 预印本 arXiv:2312.06528, 2023 中学习非线性函数。
蒋孟、史蒂文·H·洛、罗伯特·卡尔德班克和约翰·C·多伊尔。分层作为优化
分解：网络架构的数学理论。IEEE 会议录，95(1)：
255-312，2007。
Krzysztof Choromanski、Valerii Likhosherstov、David Dohan、宋星佑、Andreea Gane、Tamas
萨洛斯、彼得·霍金斯、贾里德·戴维斯、阿弗罗兹·莫希丁、卢卡斯·凯泽等。重新思考注意力
与 Performers.arXiv 预印本 arXiv:2009.14794, 2020。
尼古拉·穆卡·西罗内和克里斯托弗·萨尔维。 Parallelflow：通过流并行化线性变压器
Discretization.arXiv 预印本 arXiv:2504.00492, 2025。
Tri Dao 和 Albert Gu。 Transformers 是 ssms：通用模型和高效算法
结构化状态空间对偶性.arXiv 预印本 arXiv:2405.21060, 2024。
Daniel Y Fu、Tri Dao、Khaled K Saab、Armin W Thomas、Atri Rudra 和 Christopher Ré。
饥饿的河马：使用状态空间模型进行语言建模.arXiv 预印本
arXiv：2212.14052，2022。
Riccardo Grazzi、Julien Siems、Arber Zela、Jörg KH Franke、Frank Hutter 和 Massimiliano
庞蒂尔。通过负特征值解锁线性RNN中的状态跟踪.arXiv预印本
arXiv：2411.12537，2024。
33

**P0012** Albert Gu 和 Tri Dao。 Mamba：具有选择性状态空间的线性时间序列建模.arXiv
预印本 arXiv:2312.00752, 2023。
艾伯特·顾、卡兰·戈尔和克里斯托弗·雷。使用结构化的方法对长序列进行高效建模
状态空间.arXiv 预印本 arXiv:2111.00396, 2021。
韩国、杨松林、Tarushii Goel、Eric P Xing、Tri Dao 和 Yoon Kim。对数线性注意力。
arXiv 预印本 arXiv:2506.04761, 2025。
杰弗里·E·辛顿 (Geoffrey E Hinton) 和大卫·C·普劳特 (David C Plaut)。使用快速的重量来模糊旧的记忆。诉讼中
认知科学学会第九届年会，第 177-186 页，1987 年。
武卡斯·凯撒和伊利亚·苏茨克维尔。神经 GPU 学习算法.arXiv 预印本 arXiv:1511.08228,
2015年。
安杰洛斯·卡塔罗普洛斯、阿普尔夫·维亚斯、尼古拉斯·帕帕斯和弗朗索瓦·弗勒雷。变形金刚是
rnns：具有线性注意力的快速自回归变压器。在国际会议上
机器学习，第 5156-5165 页。 PMLR，2020。
刘波、王锐、吴乐萌、冯一浩、彼得·斯通和刘强。 Longhorn：状态空间
模型摊销在线学习者。arXiv 预印本 arXiv:2407.14207, 2024a。
刘子成、李思源、王丽、王泽东、刘云帆和李斯坦。短长卷积有助于硬件高效的线性注意力集中于长序列。arXiv 预印本
arXiv：2406.08128，2024b。
刘自瑞、袁佳怡、金红叶、钟绍辰、徐兆灼、Vladimir Braverman、Beidi
陈、夏虎. Kivi：kv 缓存的免调整非对称 2 位量化.arXiv 预印本
arXiv：2402.02750，2024c。
彭波、埃里克·阿尔凯德、昆汀·安东尼、阿隆·阿尔巴拉克、塞缪尔·阿卡迪尼奥、斯特拉·比德曼、欢奇
曹、程鑫、Michael Chung、Matteo Grella 等。 Rwkv：为变压器重新发明 rnn
era.arXiv 预印本 arXiv:2305.13048, 2023。
迈克尔·波利、斯特凡诺·马萨罗利、Eric Nguyen、Daniel Y Fu、Tri Dao、Stephen Baccus、Yoshua
本吉奥、斯特凡诺·埃尔蒙和克里斯托弗·雷。鬣狗层次结构：走向更大的卷积
语言模型。国际机器学习会议，第 28043-28078 页。 PMLR,
2023 年。
秦臻、孙伟高、李东、沉旭阳、孙伟轩、钟怡然。闪电关注——
2：在大型语言模型中处理无限序列长度的免费午餐。arXiv 预印本
arXiv：2401.04658，2024。
Ali H Sayed。自适应过滤器。约翰·威利父子公司，2011。
伊曼诺·施拉格、入江一树和于尔根·施米德胡贝尔。线性变压器秘密快速重量
程序员。国际机器学习会议，第 9355-9366 页。 PMLR，2021。
于尔根·施米德胡贝尔。学习控制快速重量记忆：动态循环的替代方案
神经计算，4(1)：131–139，1992。
34

**P0013** 孙宇、李新浩、Karan Dalal、徐嘉瑞、Arjun Vikram、张庚瀚、Yann Dubois、Xinlei
陈，王小龙，Sanmi Koyejo，等。学习（在测试时学习）：具有表达性的 Rnn
隐藏状态.arXiv 预印本 arXiv:2407.04620, 2024。
孙玉涛、董立、黄少涵、马树明、夏玉清、薛继龙、王建勇、
福如伟。保持网络：大型语言模型转换器的继承者。arXiv
预印本 arXiv:2307.08621, 2023。
Gemini 团队、Rohan Anil、Sebastian Borgeaud、Jean-Baptiste Alayrac、Jiahui Yu、Radu Soricut、
Johan Schalkwyk、Andrew M Dai、Anja Hauth、Katie Millican 等。双子座：家庭富裕
强大的多模式模型。arXiv 预印本 arXiv:2312.11805, 2023。
Kimi Team, 张宇, 林宗宇, 姚兴成, 胡嘉熙, 孟凡庆, 刘成银, 辛
门，杨松林，李志远，等。 Kimi Linear：一种富有表现力、高效的注意力架构。
arXiv 预印本 arXiv:2510.26692, 2025。
雨果·图夫龙、蒂博·拉夫里尔、戈蒂埃·伊扎卡尔、泽维尔·马丁内特、玛丽-安·拉肖、蒂莫西
拉克鲁瓦、巴蒂斯特·罗齐埃、纳曼·戈亚尔、埃里克·汉布罗、费萨尔·阿扎尔等。骆驼：开放和
高效的基础语言模型。arXiv 预印本 arXiv:2302.13971, 2023。
阿什什·瓦斯瓦尼 (Ashish Vaswani)、诺姆·沙泽尔 (Noam Shazeer)、尼基·帕尔玛 (Niki Parmar)、雅各布·乌什科雷特 (Jakob Uszkoreit)、Llion Jones、艾丹·N·戈麦斯 (Aidan N Gomez)、卢卡斯 (Łukasz)
凯撒和伊利亚·波洛苏欣。你所需要的就是注意力。神经信息处理的进展
系统，2017 年 30 日。
约翰内斯·冯·奥斯瓦尔德、艾温德·尼克拉森、埃托·兰达佐、若昂·萨克拉门托、亚历山大·莫德文采夫、安德烈·日莫吉诺夫和马克斯·弗拉迪米罗夫。 Transformer 通过梯度在上下文中学习
血统。国际机器学习会议，第 35151-35174 页。 PMLR，2023。
约翰内斯·冯·奥斯瓦尔德、尼诺·谢勒、小林诚人、卢卡·维萨里、杨松林、马克西米利安
施莱格尔、Kaitlin Maile、Yanick Schimpf、Oliver Sieberling、Alexander Meulemans 等。梅萨内特：
通过局部最优测试时间训练进行序列建模。arXiv 预印本 arXiv:2506.05233, 2025。
柯亚历山大·王、施嘉欣和艾米丽·B·福克斯。测试时回归：统一框架
使用联想记忆设计序列模型。arXiv 预印本 arXiv:2501.12352, 2025。
肖光轩、唐家明、左经纬、郭俊贤、商阳、唐浩天、付耀、
还有宋瀚。 Duoattention：通过检索和流式传输进行高效的长上下文 llm 推理
Heads.arXiv 预印本 arXiv:2410.10819, 2024。
杨松林、王柏林、沉义康、Rameswar Panda 和 Yoon Kim。门控线性注意力
具有硬件高效训练的变压器。arXiv 预印本 arXiv:2312.06635, 2023。
杨松林、扬·考茨和阿里·哈塔米扎德。门控 Delta 网络：改进 mamba2
Delta Rule.arXiv 预印本 arXiv:2412.06464, 2024a。
杨松林、王柏林、张宇、沉义康、Yoon Kim。并行化线性变压器
序列长度的增量规则。arXiv 预印本 arXiv:2406.06484, 2024b。
张一凡、刘一峰、袁慧卓、秦真、袁阳、谷泉泉、安德鲁
姚期智.张量积注意力就是您所需要的。arXiv 预印本 arXiv:2501.06425, 2025a。
35

**P0014** 张一凡、秦臻、顾泉泉。高阶线性注意力.arXiv 预印本
arXiv：2510.27258，2025b。
36

**P0015** 附录
通过递归最小二乘法的精确在线岭 38
B 有关内积损失小批量更新规则 (FALCON-3A) 的更多信息 38
B.1 块并行 FALCON-3A 的向后传递。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 38
C 在序列长度维度 40 上并行化 Delta 网络
C.1 仿射表示和 WY 形式。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 41
C.2 分块并行算法。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 41
C.3 并行 DeltaNet 训练（向后）。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 43
D FALCON-2 的并行实现 44
D.1 通道无关矢量化形式。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 45
D.2 算法。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 45
E FALCON-2-Lite：高效共享动态 48
E.1 表述：标量学习率与向量学习率。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 49
E.2 通过共享 WY 分解并行实现。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 50
E.3 算法。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 50
E.4 复杂性分析。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 52
F 通过 ParallelFlow 高效训练 FALCON-3 53
F.1 背景：矩阵值 CDE 和低阶驱动程序。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 53
F.2 将 FALCON-3 映射到 ParallelFlow 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 。 55
37

![formula-page-p038.png](/blog/falcon-2026-03-18/figures/formula-page-p038.png)

![formula-page-p039.png](/blog/falcon-2026-03-18/figures/formula-page-p039.png)

![formula-page-p040.png](/blog/falcon-2026-03-18/figures/formula-page-p040.png)

![formula-page-p041.png](/blog/falcon-2026-03-18/figures/formula-page-p041.png)

![formula-page-p042.png](/blog/falcon-2026-03-18/figures/formula-page-p042.png)

![formula-page-p043.png](/blog/falcon-2026-03-18/figures/formula-page-p043.png)

![formula-page-p044.png](/blog/falcon-2026-03-18/figures/formula-page-p044.png)

**P0016** 利用这种结构，我们可以向量化分块递归，而无需将通道分组为
头，允许以最小的开销实现每维度的自适应性。
D.1 通道无关的矢量化形式
令S t∈Rd×dv 为状态。第 j 列 st,j 的 FALCON-2 更新为：
st,j =s t−1,j+ηt,j kt−1
（
vt,j−⟨kt−1,st−1,j⟩
）
=
（
I−ηt,j kt−1k⊤
t−1
）
st−1,j+ηt,jvt,j kt−1,(D.1)
其中我们假设 ηt,j≥0，因此 √ηt,j 是明确定义的。这明确表明排名一更新
矩阵 I −ηt,jkt−1k⊤
t−1 取决于每通道步长 ηt,j，它决定了块局部
WY系统。为了在 sizeC 的块上并行化，我们利用对偶（Gram）公式。
仅投影仪的形式。为了清楚起见，我们介绍仅投影仪的情况（没有明确的每列衰减
因素）。当在正文中启用脊/权重衰减时，第 j 列更新包括
标量衰减γj,t := 1−λtηj,t：
st,j = (γt,jI−ηt,jkt−1k⊤
t−1)st−1,j+ηt,jvt,jkt−1, γ t,j := 1−λtηt,j。
由于每个值通道独立演化，因此可以通过通道方式消除这种衰减
累积重缩放（相当于，右乘 St 乘以逆累积对角矩阵
衰减），减少回仅投影仪的形式；参见附录 E 针对共享衰变的特殊情况。
Shared Gram Matrix.LetK ∈Rd×Cbe 当前块中（移位的）写入键的矩阵。
核心相关结构由 Gram 矩阵 G=K⊤K∈RC×C 给出。至关重要的是，G
与维度 dv 值无关，并且每个块只需计算一次。对于
通道方面的步长，实际的三角系统通过简单的元素方面的每个通道有所不同
这个共享基础 Gram 的调制。
批量三角求解。每通道步长的变化 ηt,j 调制该 Gram 矩阵。
对于每个通道 j，WY 表示的隐式系统矩阵 Lj 为：
Lj = 特里尔
（
G⊙(√ηj
√η⊤
j ),−1
）
+IC,(D.2)
其中 √ηj∈RC 是块上通道 j 的步长平方根向量，并且 ⊙表示
逐元素乘法（广播）。等价地，让Uj :=Kdiag( √ηj)，我们有
Gj :=U⊤
j Uj =G⊙(√ηj
√η⊤
j ),L j = tril(Gj,−1) +IC。
因为块大小 C 通常很小（例如，C = 64 或 128），所以我们可以有效地执行
批量维度 dv 上的批量三角求解。
D.2 算法
算法 2 以与标量步长直接平行的形式描述了分块前向传递
WY 内核位于附录 C 中，但通过值通道进行批处理。与共享步长情况的唯一区别是单位下三角系统 Lj 是通道相关的（通过 η:,j），因此
三角求解在 j∈{1,...,dv} 上批量执行。
45

![formula-page-p046.png](/blog/falcon-2026-03-18/figures/formula-page-p046.png)

![formula-page-p047.png](/blog/falcon-2026-03-18/figures/formula-page-p047.png)

![formula-page-p048.png](/blog/falcon-2026-03-18/figures/formula-page-p048.png)

![formula-page-p049.png](/blog/falcon-2026-03-18/figures/formula-page-p049.png)

![formula-page-p050.png](/blog/falcon-2026-03-18/figures/formula-page-p050.png)

![formula-page-p051.png](/blog/falcon-2026-03-18/figures/formula-page-p051.png)

![formula-page-p052.png](/blog/falcon-2026-03-18/figures/formula-page-p052.png)

**P0017** 有 dv 列，但它是一个高度优化的多 RHS 求解，其实质上更多
实践中对 GPU 友好。
表 5 每个块的复杂性（块大小 C、特征 dimd、值 dimd v）。
组件 FALCON-2（完整） FALCON-2-Lite
格拉姆矩阵O(dC 2)O(dC 2)
速率相关系统构建(L)O(d vC2)O(C 2)
三角求解 (L−1withd v RHS)O(d vC2)O(d vC2)
状态更新投影O(dd vC)O(dd vC)
FALCON-2-Lite 通过强制执行消除了构建和分解不同 C×C 系统的需要
共享动态。剩余的三角解仍然按 O(dvC2) 缩放，但它变成了单个
高通量多 RHS 求解，在实践中对 GPU 更加友好。
F 通过 ParallelFlow 高效训练 FALCON-3
虽然 Mamba-2 中使用的 SSD 框架为 1 级更新提供了有效的算法，
FALCON-3（滑动回归）引入了对 sizeB 历史窗口的依赖。这个
有效地将系统转变为 B 级循环系统。无需求助即可有效地进行训练
为了减慢状态矩阵的具体化或简单的顺序处理，我们采用 ParallelFlow
框架（Cirone 和 Salvi，2025）。
在本附录中，我们首先提供 ParallelFlow 的独立介绍，处理 Linear
注意力作为矩阵值控制微分方程（CDE）。然后我们明确地映射
FALCON-3 更新了这种形式主义的规则，表明它构成了
低阶 Delta 规则可通过张量Invalgorithm 求解。
F.1 背景：矩阵值 CDE 和低阶驱动程序
标准线性递推可以被视为连续时间过程的离散化。让
St∈Rd×dv 是隐藏状态。我们采用左乘约定并对其演变进行建模
作为由 ω 和 xi 驱动的矩阵值 CDE：
dSt =dω tSt +dψt,(F.1)
其中 ωt ∈ Rd × d 和 ψ t ∈ R d × d v 是矩阵值路径。区间[s,t ]因子的解
通过线性传播器（流）Pt←s：
St =P t←sSs +
∫ t
s
Pt←rdψr,其中Pt←s=I+
∫ t
s
dωrPr←s.(F.2)
这种分解将时间动态 (P) 从计算中分离出来。并行流
通过将序列划分为块 [tk−1,tk] 来并行化。系统计算本地
并行传播器和每个块的累积输入注入，然后通过
全局关联扫描。
53

**P0018** 转置等价形式。ParallelFlow 通常以共享右因子形式呈现
dωt =A tB⊤
t dt, dψt = ～AtB⊤
t dt，而 FALCON-3 在我们的左乘递归下最自然地以转置等效共享左因子形式编写
St+1 =St+AtB⊤
t St +At ～B⊤
t。
通过调换低秩因子/状态更新恒等式，这两个视图在代数上是等价的。
我们在整个附录中使用共享左因子形式，因为滑动回归更新
自然地共享写入特征的窗口矩阵。
低阶驱动器。核心难点在于计算传播器Ps→t，它通常是一个
昂贵的矩阵 ODE。然而，如果驾驶员拥有低等级，则有效的计算是可能的
结构。我们假设 Rdrivers 具有共享的左因子：
dωt = ⃗At⃗B⊤
t dt, dxi t = ⃗At
～⃗B
⊤
t dt,(F.3)
其中 ⃗At,⃗Bt∈Rd×Rand ～⃗Bt∈Rdv×R。这种结构允许有效计算、紧凑
流的表示。对于离散标记，在前向欧拉离散化下（步骤
大小吸收到⃗B，〜⃗B，相当于Δt= 1)，更新变为：
Stk+1 =S tk + ⃗Atk
⃗B⊤
tk Stk + ⃗Atk
～⃗B
⊤
tk.(F.4)
tensorInv 算法。在一段长度上求解这个低秩系统 Lc 可以减少
到三角张量反演。设C∈R(Lc×R)×(Lc×R)是表示因果相互作用的张量
等级成分之间。对于索引 s,t ∈ {1,...,Lc} 和ranki,j ∈ {1,...,R}：
[C]s,j
t,i =δs,tδi,j−I(s<t)
[
⃗B⊤
⃗As
]
我,j
.(F.5)
Cirone 和 Salvi (2025) 表明，传播器可以通过应用结构化
张量收缩乘积下的逆张量D =C−1，从而避免显式的densedx×dx
块传播者。在我们的设置中，计算由 (LcR)×(LcR) 结构控制
因果求解以及涉及 dx 和 dv 的矩阵乘法；压缩渐近
O(L2
因此，cR +d) 在这里具有误导性，因为它隐藏了主要的与维度相关的术语。
tensorInv 输出（算法 4 中使用的对象）。在实践中，我们不会具体化
全逆张量D.相反，ParallelFlow 将 C−1 应用于对应于的两个右侧
低级别司机。对于长度Lc和rankR的块，堆叠（展平时间×等级）离散
司机作为
⃗A∈Rdx×(LcR)，⃗B∈Rdx×(LcR)，～⃗B∈Rdv×(LcR)。
让 ⃗M∈{0, 1}(LcR)×(LcR) 表示严格因果块掩码，对于之前的交互，它是 1
次s<tand0否则；等价地，在(t,i)索引中，它正是使用的指标I(s<t)
在上面C的定义中。特别地，在平坦化时间×等级之后，相同时间等级的分量
不要在三角解内相互作用。然后可以写出块局部三角系统
紧凑地作为
C=Id−⃗M⊙(⃗B⊤⃗A),
54

![formula-page-p055.png](/blog/falcon-2026-03-18/figures/formula-page-p055.png)

![formula-page-p056.png](/blog/falcon-2026-03-18/figures/formula-page-p056.png)
