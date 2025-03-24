---
layout  : wikiindex
title   : wiki
toc     : true
public  : true
comment : false
updated : 2025-03-17 15:13:00 +0900
regenerate: true
---

## System Design
* [[/system-design/cap-theory]]
* [[/system-design/load-balancer]]
* [[/system-design/monolithic-vs-microservice]]

## Redis

* [[/redis/using-redis-as-a-cache]]
* [[/redis/data-flow-in-cache]]
* [[/redis/cache-stampede]]
* [[/redis/redis-as-a-session-store]]
* [[/redis/using-redis-as-a-message-broker]]

## Redis Article

* [[/redis/redis-article-2025-02]]

## Spring Article
* [[/spring/spring-batch-article-2025-03]]

## Discrete Mathematics

* [[/discrete-mathematics/overview-of-discrete-mathematics]]

---
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

