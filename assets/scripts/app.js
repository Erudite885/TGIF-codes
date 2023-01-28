const listEl = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

function sendHttpRequest(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = function () {
      resolve(xhr.response);
      //   const listOfPosts = JSON.parse(xhr.response)
    };

    xhr.send();
  });
  return promise;
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(
    "GET",
    "http://jsonplaceholder.typicode.com/posts"
  );
  const listOfPosts = responseData;
  // console.log(listOfPosts);
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listEl.append(postEl);
  }
}
fetchPosts();
