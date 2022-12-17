import htm from 'htm';
import { h, render as preactRender } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { styled, setup, keyframes } from 'goober';

setup(h);
const html = htm.bind(h);

const ignoreTag = /^\d{4}年$/;
const animation = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const StyledUl = styled('ul')`
  animation: ${animation} 1s forwards;
`;

function Recommendation({ tags }) {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const targetTags = tags.split(",").filter((t) => !ignoreTag.test(t));
  const fetchArticles = async () => {
    const promises = targetTags.map((tag) => fetch(`/tags/${tag}.json`).then((res) => res.json()));
    const articles = (await Promise.all(promises))
      .map((res) => res.articles)
      .flat()
      .filter((a) => a.url !== location.pathname);
    const uniqueArticles = articles.reduce((prev, cur) => {
      if (prev.find((a) => a.url === cur.url)) {
        return prev;
      }
      prev.push(cur);
      return prev;
    }, []);
    setArticles(uniqueArticles);
  };
  const prevPage = () => setCurrentPage(currentPage - 1);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const sendGa = (el) => window.gtag === 'function' && window.gtag('click_recommend', { title: el.target.text });
  useEffect(fetchArticles, []);

  if (!articles.length) {
    return '';
  }
  return html`
    <hr class="link-separator"/>
    <p style="line-height: 30px">この記事に関連するオススメ記事
      <img alt="recommend"
           style="display:inline;vertical-align: middle;margin-left: 0.3rem"
           src="/img/icons/recommend-25.png" width="25" height="25"/></p>
    <${StyledUl} key=${currentPage}>
      ${articles
        .slice(currentPage * 10, currentPage * 10 + 10)
        .map((article) => html` <li><a href="${article.url}" onClick=${sendGa}>${article.title}</a></li>`)}
    </${StyledUl}>
    <nav class="post__pagination">
      ${
        currentPage > 0 &&
        html`
          <a style="cursor:pointer; margin-right: 2rem" onClick=${prevPage}><span>←</span>前へ</a>
        `
      }
      ${
        (currentPage + 1) * 10 < articles.length
          ? html`
              <a style="cursor:pointer; margin-right: 2rem" onClick=${nextPage}
                >次へ<span>→</span></a
              >
            `
          : html`<span />`
      }
    </nav>
  `;
}

export function render({ tags }, el) {
  return preactRender(html` <${Recommendation} tags=${tags} />`, el);
}
