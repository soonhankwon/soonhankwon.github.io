---
layout : single
title : "221102 엔티티 연관관계에 대한 작은 메모(feat.인스타그램 좋아요 구현)"
categories : til
tags : [spring, til, jpa] 
---

# 221102 TIL

**Mention** : 인스타그램 클론프로젝트 ING, 오늘 아침에 찰스 펫졸드의 CODE라는 책을 읽기 시작했다📖 

모스부호, 점자책의 에피소드로 시작하는데 Binary에 대해 흥미롭게 풀어낸것 같다.

**Acheivement & Problem** : 인스타그램 피드의 내용, 이미지 (Amazon S3 사용) 업데이트 및 삭제기능 구현

인스타그램 좋아요 기능을 구현하는데 **엔티티 간 의존관계**를 사용하는 것에 대해 이해도가 약하다는 것을 느꼈다. 
<hr/>

**좋아요 기능**은 프론트에서 토글로 보통 구현된다. 따라서 아래와 같은 서비스 로직으로 만들어보았다.

```java
@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final FeedRepository feedRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public LikeAddAndUnlikeResDto addAndUnLike(Long feedId, UserDetailsImpl userDetails) throws SQLException {
        Account account = accountRepository.findById(userDetails.getAccount().getId())
                .orElseThrow(()-> new RuntimeException("로그인 유저 정보가 없습니다."));
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(()-> new NullPointerException("해당 피드가 없습니다."));

        if(likeRepository.existsByAccountIdAndFeedId(account.getId(),feed.getId())) {
            likeRepository.deleteByAccountIdAndFeedId(account.getId(),feed.getId());
            return new LikeAddAndUnlikeResDto ("좋아요 취소", false);
        } else {
        Like likes = new Like(account, feed);
        likeRepository.save(likes);}

        return new LikeAddAndUnlikeResDto ("좋아요", true);
    }
```

Like에서 Feed와 Account로 Many to One 연관관계를 맺어주었다.

```java
@Getter
@NoArgsConstructor
@Entity
@Table(name = "likes")
public class Like extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    @JsonIgnore
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    @JsonIgnore
    private Feed feed;

    public Like(Account account, Feed feed) {
        this.account = account;
        this.feed = feed;
    }
}
```

문제는 연관관계 이해부족으로 인해, Like 삭제를 deletebyId로 그냥 사용했다는 점 이었다.

Like Entity 에서 1번째 데이터만 지워지고 원하는 데이터가 지워지지 않는 현상이 계속됬다🛠

H2console로 테이블을 직접 보면서 테스트하니 이해가 점점 되었다. 

결국, **likeRepository.deleteByAccountIdAndFeedId(account.getId(),feed.getId());**

연관관계의 account_id, feed_id를 통해 삭제하는 것으로 구현

데이터베이스에 대한 공부와 이해가 꼭 필요하다고 느꼈다🔥
<hr/>