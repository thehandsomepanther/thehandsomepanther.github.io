---
layout: page
title: Josh Shi
permalink: /
---

<div class="container">
  <div class="info-container mono">
    <p><a href="/">Josh Shi</a></p>
    <ul>
      <li><a href="/about">About</a></li>
      <li><a target="_blank" href="https://twitter.com/unfollowjoshshi">Twitter</a></li>
      <li><a target="_blank" href="https://github.com/thehandsomepanther">Github</a></li>
    </ul>
    <ul>
      <p>Is:</p>
      <li>Editor-in-Chief, Northwestern Undergraduate Research Journal</li>
      <li>Student Fellow, Knight Lab</li>
      <li>Teaching Assistant, NUvention</li>
    </ul>
    <ul>
      <p>Was:</p>
      <li>Director, WildHacks</li>
      <li>Teaching Assistant, Human-Computer Interaction</li>
      <li>Software Engineer Intern, Groupon</li>
      <li>Creative Manager, DesignWorks</li>
    </ul>
  </div><div class="projects-container">
    <p class="mono">Projects</p>
    <div class="projects">
      {% for post in site.posts %}
        {% unless post.categories contains 'unpublished' %}
          <div class="project-title">
            <a class="mono" href="{{ post.url }}">{{ post.title }}</a>
            {% if post.categories contains 'design'%}
              <p class="mono category category-design">Design</p>
            {% endif %}
            {% if post.categories contains 'tech'%}
              <p class="mono category category-tech">Tech</p>
            {% endif %}
            {% if post.categories contains 'research'%}
              <p class="mono category category-research">Research</p>
            {% endif %}
            <p class="serif">{{ post.description }}</p>
            <a class="mono project-link" href="{{ post.url }}">read about it</a>
            {% if post.link %}
              <a class="mono project-link" target="_blank" href="{{ post.link | escape }}">see it</a>
            {% endif %}
          </div>
          <div class="project-details {{ post.color }}">
            <img src="{{ post.image }}">
          </div>
        {% endunless %}
      {% endfor %}
    </div>
  </div>
</div>
