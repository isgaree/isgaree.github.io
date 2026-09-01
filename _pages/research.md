---
permalink: /research/
title: "Research"
author_profile: true
---

<div class="research-card research-card-featured">

  <div class="research-card-content">

    <div class="research-tag">STOCHASTIC SYSTEMS</div>

    <h2>Stochastic Assembly Systems</h2>

    <div class="research-meta">
      USC Summer Scholars · Summer 2026<br>
      Advised by Prof. Andrew Daw and Prof. Vishal Gupta
    </div>

    <p>
      During my summer at USC, I studied a stochastic assembly system where
      products require many different component types and inventory is limited
      by a fixed buffer capacity. I used simulation to study the steady-state
      number of missing component types and how its behavior changes as the
      system size and buffer capacity grow.
    </p>
    
    <p>
      What started as a simulation project quickly led to some interesting
      asymptotic questions. We observed surprisingly consistent scaling behavior
      across different buffer capacities, and much of my work since then has
      focused on understanding why it occurs and how known results for the
      simplest cases might extend to general buffer sizes.
    </p>

    <div class="research-links">
      <a href="/files/usc-summer-slides.pdf">[slides]</a>
      <a href="YOUR-USC-GITHUB-REPO">[repo]</a>
    </div>

  </div>

  <div class="research-thumbnail">
    <img
      src="/files/figure1_geom_vs_k.png"
      alt="Scaling behavior in the stochastic assembly system">
  </div>

</div>


<div class="research-card research-card-featured">

  <div class="research-card-content">

    <div class="research-tag">OPTIMIZATION</div>

    <h2>Stochastic Methods for Bilevel Optimization</h2>

    <div class="research-meta">
      University of Cincinnati · 2025–Present<br>
      Advised by Prof. Tommaso Giovannelli
    </div>

    <p>
      My work at Cincinnati focuses on bilevel optimization problems where
      some of the upper-level decisions are discrete and some are continous.
      We developed an approach that utilizes a derivative-free approach that 
      searches over these discrete decisions and a gradient method for continous
      variables.
    </p>

    <p>
      I've mainly tested the method on neural architecture search, where the
      upper-level decisions determine the architecture of a neural network
      and the lower-level problem trains its weights. I've compared our
      approach with methods including DARTS and StocBiO and have also worked
      on the theoretical properties of the algorithm.
    </p>

    <div class="research-links">
      <a href="/files/bilevel-slides.pdf">[slides]</a>
      <a href="YOUR-BILEVEL-GITHUB-REPO">[repo]</a>
    </div>

  </div>

  <div class="research-thumbnail">
    <img
      src="/images/research/bilevel-optimization.png"
      alt="Bilevel optimization research">
  </div>

</div>


<div class="research-card">

  <div class="research-tag">STOCHASTIC PROGRAMMING</div>

  <h2>Outpatient Clinic Scheduling Under Uncertainty</h2>

  <div class="research-meta">
    Stochastic Programming Course Project
  </div>

  <p>
    For my stochastic programming course, I built a two-stage model for
    outpatient clinic scheduling with uncertain no-shows, walk-in arrivals,
    and service times. I used the model to see how different scheduling
    decisions affect patient waiting, provider idle time, overtime, and
    rejected walk-ins.
  </p>

</div>
