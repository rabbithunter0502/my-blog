'use strict';

const postTitleElement = document.querySelector('#post-title');
const postImgElement = document.querySelector('#post-img');
const postDateTimeElement = document.querySelector('#post-datetime');
const postTimeReadingElement = document.querySelector('#post-time-reading');

function getSearchParameters() {
    const paramsString = window.location.search.substr(1);
    return paramsString != null && paramsString != '' ? transformToAssocArray(paramsString) : {};
}

function transformToAssocArray(paramsString) {
    const params = {};
    const paramsArray = paramsString.split('&');
    for ( var i = 0; i < paramsArray.length; i++) {
        var tmpArr = paramsArray[i].split('=');
        params[tmpArr[0]] = tmpArr[1];
    }
    return params;
}

async function getPostInfo() {
    const params = getSearchParameters();
    const postsResponse = await fetch('../assets/data/posts.json');
    const posts = await postsResponse.json();
    const post = posts.find(p => p?.id === +params?.id);
    postTitleElement.textContent = post?.topicTitle;
    postImgElement.src = `../${post?.topicImg}`;
    postDateTimeElement.innerText = post?.datetime;
    postTimeReadingElement.innerText = `${post?.readingTime} min read`;

}

getPostInfo();