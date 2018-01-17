---
layout: post
title: "Writing"
permalink: /writing
---
<div>
{% for post in site.posts %}
    {% if post.tags contains "writing" %}
        <div>
            <a href="{{ post.url }}">
                {% if post.description %}
                    <p class="sans post-title" itemprop="name headline">{{ post.title }}: <span>{{ post.description }}</span></p>
                {% else %}
                    <p class="sans post-title" itemprop="name headline">{{ post.title }}</p>
                {% endif %}
            </a>
            <p class="post-date">{{ post.date | date: '%B %d, %Y' }}</p>
        </div>
    {% endif %}
{% endfor %}
</div>