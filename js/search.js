(function() {
    'use strict';

    let searchIndex = [];
    let isIndexLoaded = false;

    // 검색 인덱스 로드
    function loadSearchIndex() {
        if (isIndexLoaded) {
            return Promise.resolve();
        }

        return fetch('/data/search-index.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load search index');
                }
                return response.json();
            })
            .then(data => {
                searchIndex = data;
                isIndexLoaded = true;
                return data;
            })
            .catch(error => {
                console.error('Error loading search index:', error);
                return [];
            });
    }

    // 검색어로 문서 검색
    function searchDocuments(query) {
        if (!query || query.trim() === '') {
            return [];
        }

        const searchTerms = query.toLowerCase().trim().split(/\s+/);
        const results = [];

        searchIndex.forEach(doc => {
            let score = 0;
            const title = (doc.title || '').toLowerCase();
            const summary = (doc.summary || '').toLowerCase();
            const tags = (doc.tag || []).map(t => t.toLowerCase()).join(' ');
            const fileName = (doc.fileName || '').toLowerCase();

            searchTerms.forEach(term => {
                // 제목에 정확히 일치 (높은 점수)
                if (title.includes(term)) {
                    score += 10;
                }
                // 제목 시작 부분 일치 (더 높은 점수)
                if (title.startsWith(term)) {
                    score += 5;
                }
                // 요약에 포함
                if (summary.includes(term)) {
                    score += 3;
                }
                // 태그에 포함
                if (tags.includes(term)) {
                    score += 5;
                }
                // 파일명에 포함
                if (fileName.includes(term)) {
                    score += 2;
                }
            });

            if (score > 0) {
                results.push({
                    ...doc,
                    score: score
                });
            }
        });

        // 점수 순으로 정렬
        results.sort((a, b) => b.score - a.score);
        return results;
    }

    // 검색 결과 표시
    function displaySearchResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) {
            return;
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <p>검색 결과가 없습니다: "${query}"</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(result => {
            const date = result.updated ? new Date(result.updated).toLocaleDateString('ko-KR') : '';
            const tagsHTML = result.tag && result.tag.length > 0 
                ? `<ul class="tag-list">
                    ${result.tag.map(tag => `<li class="post-tag"><a href="/tag/#${tag}">${tag}</a></li>`).join('')}
                   </ul>`
                : '';

            return `
                <div class="post-item">
                    <a class="post-link" href="${result.url}">
                        <div class="post-meta">
                            ${date ? date + ' - ' : ''}${result.title}
                        </div>
                        ${result.summary ? `<div class="post-excerpt">${result.summary}</div>` : ''}
                        ${tagsHTML}
                    </a>
                </div>
            `;
        }).join('');

        resultsContainer.innerHTML = `
            <div class="search-results-header">
                <h3>검색 결과: "${query}" (${results.length}개)</h3>
            </div>
            <ul class="post-list">
                ${resultsHTML}
            </ul>
        `;
    }

    // URL 파라미터에서 검색어 가져오기
    function getSearchQueryFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('searchString') || urlParams.get('q') || '';
    }

    // 검색 실행
    function performSearch(query) {
        if (!query || query.trim() === '') {
            const resultsContainer = document.getElementById('search-results');
            if (resultsContainer) {
                resultsContainer.innerHTML = '<p>검색어를 입력하세요.</p>';
            }
            return;
        }

        loadSearchIndex().then(() => {
            const results = searchDocuments(query);
            displaySearchResults(results, query);
        });
    }

    // 페이지 로드 시 검색 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const query = getSearchQueryFromURL();
            if (query) {
                // 검색 입력창에 값 채우기
                const searchInput = document.querySelector('.searchInput');
                if (searchInput) {
                    searchInput.value = query;
                }
                performSearch(query);
            }
        });
    } else {
        const query = getSearchQueryFromURL();
        if (query) {
            const searchInput = document.querySelector('.searchInput');
            if (searchInput) {
                searchInput.value = query;
            }
            performSearch(query);
        }
    }

    // 전역으로 검색 함수 노출 (필요한 경우)
    window.performSearch = performSearch;
})();
