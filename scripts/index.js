// ключ АПИ
const apiKey = 'OYZrBcB1HLX1ThHaErLR2LqjnTsRY4oG';

// html-элемент, куда будут генерироваться html-код с данными постов
const mainContent = document.querySelector('.main');

// кнопка подгрузки постов
const moreNewsBtn = document.querySelector('#moreNews');

//массив, хранящий посты
let posts = null;

// диапазон подгружаемых постов
let start = 0;
let limit = 3;

// запускам асинхронную загрузку постов после загрузки тела страницы
document.body.onload = function () {
  getPostsFromApi(showPosts, printPosts, start, limit);
};

// конвертер даты публикации поста
const changedateformat = (input) => {
  var options = { day: 'numeric', month: 'long' };
  var d = new Date(input);
  return d.toLocaleDateString('en-US', options); // September 17
};

// получаем асинхронно посты с API
const getPostsFromApi = async (show, print, start, limit) => {
  await fetch(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
      posts = response.results; // сохраняем результаты в массив posts
      show(print, start, limit); // вызываем функцию отображения постов
    });
};

//печатаем на страницу посты
let postId = 0; // счетчик id постов
const printPosts = (data) => {
  data.map((post) => {
    postId++;
    mainContent.innerHTML += `
              <div class="content" id="${postId}">
              <div class="left">
                  <div class="top">
                      <div class="infotop">
                        <img class="author-photo" src="/assets/author-photo.png" alt="author-photo">
                          <div class="author-name">${
                            post.byline ? post.byline : 'Authors name'
                          }</div>
                          <div class="delemiter">in</div>
                          <div class="topicname">${post.section}</div>
                          <div class="delemiter">·</div>
                          <div class="delemiter">${changedateformat(post.published_date)}</div>
                      </div>
                      <a href="content/post.html?postid=${postId}" id="refFullPost" class="ref-full-post">
                      <div class="text">
                          <div class="title">${post.title}</div>
                          <div class="description">${post.abstract}</div>
                      </div>
                      </a>
                  </div>
                  <div class="infobottom">
                      <div class="info">
                          <div class="infobutton">${post.section}</div>
                          <div class="delemiter">12 min read</div>
                          <div class="delemiter">·</div>
                          <div class="delemiter">Selected for you</div>
                      </div>
                      <div class="action">
                          <img class="actionicon" src="/assets/actionicon.png" alt="actionicon">
                          <img class="actionicon" src="/assets/actionicon.png" alt="actionicon">
                          <img class="actionicon" src="/assets/actionicon.png" alt="actionicon">
                      </div>
                  </div>
              </div>
              <a href="content/post.html?postid=${postId}" id="refFullPost" class="ref-full-post">
              <img class="content-image" src="${
                post.multimedia ? post.multimedia[2].url : '/assets/content-image.png'
              }" alt="content-image">
              </a>
          </div>
          `;
  });
  //если постов больше нет, то удаляем кнопку подгрузки новостей
  limit >= posts.length
    ? (moreNewsBtn.style.visibility = 'hidden')
    : (moreNewsBtn.style.visibility = 'visible');
};

// определяем перечень постов на отображение
const showPosts = (print, start, limit) => {
  print(posts.slice(start, limit));
};

// определяем событие на нажатии кнопки подгрузки новостей (подгружает по 3 новости)
if (moreNewsBtn) {
  moreNewsBtn.addEventListener('click', () => {
    start += 3;
    limit += 3;
    showPosts(printPosts, start, limit);
  });
}

// экспортируем функции для применения на странице post
export { showPosts, getPostsFromApi, changedateformat };
