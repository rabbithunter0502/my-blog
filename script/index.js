'use strict';

const blogGroupElement = document.querySelector('#blog-card-group');
const btnLoadMoreElement = document.querySelector('.load-more');
let countPostAdded = 0;
let html = '';

async function getPosts() {
  try {
    const postsResponse = await fetch('../assets/data/posts.json');
    const posts = await postsResponse.json();

    // Loop through each post
    for (let post of posts) {
      let topicEle = '';

      post.topic.forEach (p => {
        topicEle += `<button class="blog-topic text-tiny">${p}</button>`
      })

      html +=
        `<article class="blog-card">

        <div class="blog-card-banner">
          <img src="${post.topicImg}" alt="${post.topicImg}"
            width="250" class="blog-banner-img">
        </div>

        <div class="blog-content-wrapper">
          <div class="blog-tag">
            ${topicEle}
          </div>

          <h3>
            <a href="${post.linkDetail}" class="h3">
            ${post.topicTitle}
            </a>
          </h3>

          <p class="blog-text">
            ${post.topicContent}
          </p>

          <div class="summary">

            <div class="author-profile">
              <img src="${post.authorAvatar}" alt="${post.authorAvatarAlt}" width="50">
            </div>

            <div class="wrapper">
              <a href="#" class="h4">${post.authorName}</a>

              <p class="text-sm">
                <span>${post.datetime}</span>
                -
                <span>${post.readingTime} min reading</span>
              </p>
            </div>

          </div>

        </div>

      </article>`;
    }
    blogGroupElement.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function loadMore() {
  if (countPostAdded >= 1) {
    alert('All posts loaded');
    btnLoadMoreElement.textContent = 'All posts loaded'
    return;
  }
  blogGroupElement.innerHTML += html;
  countPostAdded += 1;
}

getPosts();