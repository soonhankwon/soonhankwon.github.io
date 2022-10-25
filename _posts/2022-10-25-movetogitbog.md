---
layout : single
title : "221025 Move to gitblog"
categories : til
tags : [git, til] 
---

# 221025 TIL

**Mention** : normal day💻 

**Acheivement & Problem** : 드디어 생각으로만하던 깃블로그로 이사를 하였다. Jekyll Theme를 Fork해서 사용했다. 

Vscode를 이용해서, 코드 수정 및 git push를 해주었는데 프로그램이 가벼워서 좋다는 첫느낌이다👍🏽 

Backend만 구현하다 Front를 만지니까 새롭고, 기분전환이 된다🛹 아직 심플한 기능만 구현한 블로그지만 시간 날 때, 커스텀해볼 예정이다.

이 간단한 GitBlog를 만드는데도 에러와 인사했는데, 생각지도 못한 **pages build and deployment** 에러였다. 

JekyllTheme의 config.yml을 만지는 과정에서 생긴 에러였는데, 해결 정보를 찾기가 어려웠다. Git push로 레포지토리에 업뎃은 되는데, 실제로 build가 안되어 블로그 수정사항이 적용이 안되는 에러였다. 

```java
category_archive:
  type: liquid
  path: /categories/
tag_archive:
  type: liquid
  path: /tags/
# https://github.com/jekyll/jekyll-archives
# jekyll-archives:
#   enabled:
#     - categories
#     - tags
#   layouts:
#     category: archive-taxonomy
#     tag: archive-taxonomy
#   permalinks:
#     category: /categories/:name/
#     tag: /tags/:name/
```

주석 부분을 활성화 시켜줬더니, 그 윗단의 archive 와 중복되어 충돌되는 에러로 **추정**된다 활성화해줬던 주석부분을 다시 주석처리하니 해결🔥