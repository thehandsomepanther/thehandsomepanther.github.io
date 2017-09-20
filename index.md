---
layout: landing
title: Josh Shi
permalink: /
---

<div class="mode">
    <label for="draw">Drawing mode</label>
    <select name="draw">
        <option value="lines">Lines</option>
        <option value="arrows">Arrows</option>
        <option value="dots">Dots</option>
        <option value="twinkle">Twinkle</option>
        <option value="redacted">▇▇▇▇▇REDACTED▇▇▇▇▇</option>
        <option value="sheriff">🤠</option>
    </select>
    <input type="button" name="reset" value="Clear Screen">
</div>
<div class="pen">
    <img src="/assets/images/pen-96.png" alt="pen">
</div>
<div>
    <span class="text"></span>
    <span class="text"></span>
    <span class="text"></span>
    <span class="text">Josh Shi</span>
    <span class="text">Studying Computer Science at Northwestern University</span>
    <a href="/assets/images/shi-josh-web.pdf" target="_blank"><span class="text">Résumé</span></a>
    <span class="text"></span>
    <span class="text">Links</span>

    <a href="https://twitter.com/unfollowjoshshi" target="_blank"><span class="text">Twitter →</span></a>
    <a href="https://github.com/thehandsomepanther" target="_blank"><span class="text">Github →</span></a>
    <a href="https://www.are.na/josh-shi" target="_blank"><span class="text">Are.na →</span></a>
    <a href="https://medium.com/@joshshi/latest" target="_blank"><span class="text">Writing →</span></a>
    <span class="text"></span>
    <span class="text">Is:</span>
    <span class="text">Editor-in-Chief, Northwestern Undergraduate Research Journal</span>
    <span class="text">Head Teaching Assistant, Human-Computer Interaction</span>
    <span class="text">Student Fellow, Knight Lab</span>
    <span class="text"></span>
    <span class="text">Was:</span>
    <span class="text">Software Engineer Intern, Box</span>
    <span class="text">Teaching Assistant, NUvention</span>
    <span class="text">Director, WildHacks</span>
    <span class="text">Software Engineer Intern, Groupon</span>
    <span class="text"></span>
    <span class="text">Projects</span>
    {% for post in site.posts %}
        {% unless post.categories contains 'unpublished' %}
            {% if post.video %}
                <video class="img-{{ post.uid }}" src="{{ post.video }}" loop poster="{{ post.image }}"></video>
            {% elsif post.image %}
                <img class="img-{{ post.uid }}" src="{{ post.image }}">
            {% endif %}

            {% if post.external %}
                <a class="link-{{ post.uid }}" href="{{ post.external }}"><span class="text">{{ post.title }} →</span></a>
            {% else %}
                <a class="link-{{ post.uid }}" href="{{ post.url }}"><span class="text">{{ post.title }} →</span></a>
            {% endif %}
            <span class="text">{{ post.description }}</span>

            <span class="text"></span>
        {% endunless %}
    {% endfor %}
</div>
<div class="canvas">

</div>

<script src="scripts/index.js"></script>
