---
layout  : wikiindex
title   : wiki
toc     : true
public  : true
comment : false
updated : 2025-02-19 16:11:00 +0900
regenerate: true
---

## Spring

## Redis

* [[/redis/using-redis-as-a-cache]]

## Operating Systems

## Discrete Mathematics

* [[/discrete-mathematics/overview-of-discrete-mathematics]]

---

## blog posts
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public == true %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>

