// импортируем функции с index.js
import { showPosts, getPostsFromApi, changedateformat } from '../scripts/index.js';

// html-элемент, куда будут генерироваться html-код с данными поста
const mainContent = document.querySelector('.main');

// кнопка возврата назад
const returnMainPageBtn = document.querySelector('#returnMainPageBtn');

// получаем параметры URL строки
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// сохраняем id поста
const postId = params.postid;

// запускам асинхронную загрузку постов после загрузки тела страницы
document.body.onload = function () {
  getPostsFromApi(showPosts, printPost, postId - 1, postId);
};

//печатаем на страницу пост
const printPost = (data) => {
  console.log('data = ' + data);
  console.log('data.length = ' + data.length);
  data.map((post) => {
    console.log(post);
    mainContent.innerHTML += `
    <div class="content" id="${postId}">
    <div class="frame">
        <div class="infotop">
            <img class="author-photo" src="/assets/author-photo.png" alt="author-photo">
            <div class="info">
                <div class="author-name">${post.byline}</div>
                <div class="info-text">
                    <div class="delemiter">${changedateformat(post.published_date)}</div>
                    <div class="delemiter">·</div>
                    <div class="delemiter">12 min read</div>
                    <div class="delemiter">·</div>
                    <div class="delemiter">Member-only</div>
                </div>
            </div>
        </div>
      <div class="socialmedia">
        <div class="socialmediabtns">
            <img class="iconlink" src="/assets/linkedin.png" alt="linkedin">
            <img class="iconlink" src="/assets/facebook.png" alt="facebook">
            <img class="iconlink" src="/assets/twitter.png" alt="twitter">
        </div>
      </div>
    </div>

    <div class="text">
        <div class="title">${post.title}</div>
        <div class="description">${post.abstract}</div>
    </div>
    <img class="content-image-large" src="${
      post.multimedia ? post.multimedia[0].url : '/assets/content-image.png'
    }" alt="content-image-large">
    <div class="main-text">
        <div class="main-text-title">${post.title}</div>
        <div class="main-text-description">
        ${post.abstract}
        </div>
    </div>
    <div class="infobottom">
        <div class="infobuttons">
            <div class="likes">
                <img class="likes-img" src="/assets/heart.png" alt="likes">
                <div class="likescounter">180</div>
            </div>
            <div class="likes">
                <img class="likes-img" src="/assets/bubble.png" alt="likes">
                <div class="likescounter">12</div>
            </div>
        </div>
        <div class="bookmarkbuttons">
            <img class="likes-img" src="/assets/comeicon.png" alt="comeicon">
            <img class="likes-img" src="/assets/bookmark.png" alt="bookmark">
        </div>
    </div>
</div>
    `;
  });
};

// определяем событие на нажатии кнопки назад
returnMainPageBtn.addEventListener('click', () => {
  window.history.go(-1); // возвращает на предыдущую страницу
  return false;
});
