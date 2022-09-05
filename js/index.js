let shortenLinkInput = document.getElementById("shorten-link-input");
let warningMsg = document.getElementById("warning-msg");
let shortenLinksResult = document.querySelector(".shorten-links-result");
let shortenItBtn = document.getElementById("shorten-it-btn");
let copyShortLinkBtn = document.getElementById("copy-short-link");
let menuImg = document.querySelector(".menu-img");
let headerLinks = document.querySelector(".header-links");
let title = document.querySelector(".title");
let counter = 0;

const isShortenLinkEmpty = () => {
  if (shortenLinkInput.value == "") {
    shortenLinkInput.style.border = "3px solid hsl(0, 87%, 67%)";
    document
      .querySelector(":root")
      .style.setProperty("--psudeuColor", "hsl(0, 87%, 67%)");
    warningMsg.classList.remove("hidden");
  } else {
    shortenLinkInput.style.border = "3px solid transparent";
    document
      .querySelector(":root")
      .style.setProperty("--psudeuColor", "hsl(257, 7%, 63%)");
    warningMsg.classList.add("hidden");
  }
};
shortenItBtn.addEventListener("click", isShortenLinkEmpty);

const displayShortenLinks = (data) => {
  if (counter == 3) {
    shortenLinksResult.innerHTML = `
              <div class="short-link-result">
                <div class="long-url">
                  <span>${data.result.original_link}</span>
                </div>
                <div class="shorten-url">
                  <span id="short-link${counter}">${data.result.short_link}</span>
                  <div class="shorten-url-btn">
                    <button id="copy-short-link${counter}" onclick="copyToClipBoard(${counter})">Copy</button>
                  </div>
                </div>
              </div>`;
    counter = 1;
  } else {
    shortenLinksResult.innerHTML += `
              <div class="short-link-result">
                <div class="long-url">
                  <span>${data.result.original_link}</span>
                </div>
                <div class="shorten-url">
                  <span id="short-link${counter}">${data.result.short_link}</span>
                  <div class="shorten-url-btn">
                    <button id="copy-short-link${counter}" onclick="copyToClipBoard(${counter})">Copy</button>
                  </div>
                </div>
              </div>`;
    counter++;
  }
  shortenItBtn.addEventListener("click", getShrtcodeAPI);
};

const copyToClipBoard = (id) => {
  let shortLink = document.getElementById(`short-link${id}`);
  let copyShortLink = document.getElementById(`copy-short-link${id}`);
  navigator.clipboard.writeText(shortLink.innerHTML);
  copyShortLink.innerHTML = "Copied!";
  copyShortLink.style.backgroundColor = "hsl(257, 27%, 26%)";
};

const getShrtcodeAPI = async () => {
  try {
    const urlAddress = shortenLinkInput.value;
    const res = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${urlAddress}`
    );
    const data = await res.json();
    displayShortenLinks(data);
  } catch (err) {
    console.log(err);
  }
};
shortenItBtn.addEventListener("click", getShrtcodeAPI);

const checkScreenSizeAndDisplay = () => {
  if (window.innerWidth < 420) {
    menuImg.classList.remove("hidden");
    headerLinks.classList.add("hidden");
    title.style = "margin-top: 23em;";
  } else {
    menuImg.classList.add("hidden");
    headerLinks.classList.remove("hidden");
    title.removeAttribute("style");
  }
};
checkScreenSizeAndDisplay();
addEventListener("resize", checkScreenSizeAndDisplay);

const toggleNavbar = () => {
  if (headerLinks.classList.contains("hidden")) {
    headerLinks.classList.remove("hidden");
    title.removeAttribute("style");
  } else {
    headerLinks.classList.add("hidden");
    title.style = "margin-top: 23em;";
  }
};
menuImg.addEventListener("click", toggleNavbar);
