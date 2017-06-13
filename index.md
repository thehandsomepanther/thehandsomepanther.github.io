---
layout: landing
title: Josh Shi
permalink: /
---

<div>
    <select name="draw">
        <option value="lines">Lines</option>
        <option value="arrows">Arrows</option>
        <option value="dots">Dots</option>
        <option value="twinkle">Twinkle</option>
        <option value="redacted">▇▇▇▇▇REDACTED▇▇▇▇▇</option>
    </select>
</div>
<span class="text">Josh Shi</span>
<span class="text">Studying Computer Science at Northwestern University</span>
<span class="text"></span>
<span class="text">Links</span>

<div><a href="https://twitter.com/unfollowjoshshi" target="_blank"><span class="text">Twitter →</span></a></div>
<div><a href="https://github.com/thehandsomepanther" target="_blank"><span class="text">Github →</span></a></div>
<div><a href="https://medium.com/@joshshi/latest" target="_blank"><span class="text">Writing →</span></a></div>
<span class="text"></span>
<span class="text">Is:</span>
<span class="text">Software Engineer Intern, Box</span>
<span class="text">Editor-in-Chief, Northwestern Undergradaute Research Journal</span>
<span class="text">Student Fellow, Knight Lab</span>
<span class="text">Teaching Assistant, NUvention</span>
<span class="text"></span>
<span class="text">Was:</span>
<span class="text">Director, WildHacks</span>
<span class="text">Software Engineer Intern, Groupon</span>
<span class="text">Teaching Assistant, Human-Computer Interaction</span>
<span class="text"></span>
<span class="text">Projects</span>
<div>
{% for post in site.posts %}
    {% unless post.categories contains 'unpublished' %}
        {% if post.image %}
            <div><img class="img-{{ post.uid }}" src="{{ post.image }}"></div>
        {% endif %}

        {% if post.external %}
            <div><a class="link-{{ post.uid }}" href="{{ post.external }}"><span class="text">{{ post.title }} →</span></a></div>
        {% else %}
            <div><a class="link-{{ post.uid }}" href="{{ post.url }}"><span class="text">{{ post.title }} →</span></a></div>
        {% endif %}
        <div><span class="text">{{ post.description }}</span></div>

        <div><span class="text"></span></div>
    {% endunless %}
{% endfor %}
</div>

<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
<script src="scripts/index.js"></script>
