// ==UserScript==
// @name         PTT Imgur Preview
// @namespace    http://tampermonkey.net/
// @version      2024-09-18
// @description  Just add image element to show all image links from imgur at ptt site.
// @author       LouieC
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// @match https://www.ptt.cc/bbs/*.html
// @match https://www.ptt.cc/man/*.html
// ==/UserScript==


(function() {
  'use strict';

  // Your code here...
  console.log('Script Start')
  // Lazy load using IntersectionObserver

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              console.log('entry', entry)
              const img = entry.target;
              img.src = img.dataset.src; // Load image when it enters the viewport
              observer.unobserve(img); // Stop observing after load
          }
      });
  }, { threshold: 0.1 });

  function addImgurPreviews () {

      const imgurLinks = document.querySelectorAll('a[href*="imgur"]');

      const filteredLinks = Array.from(imgurLinks).filter(link => {
          const href = link.getAttribute('href');
          return href && /\.(jpg|jpeg|png|gif)$/i.test(href);
      });

      console.log('images', filteredLinks)
      filteredLinks.forEach(link => {
          const imgUrl = link.href.replace(/\.(jpg|jpeg|png|gif)$/, '.webp');
          const img = document.createElement('img');
          img.dataset.src = imgUrl; // Use data-src for lazy loading
          img.referrerPolicy = 'no-referrer';
          img.style.maxWidth = '500px';
          img.style.display = 'block';

          link.parentNode?.insertBefore(img, link.nextSibling);

          observer.observe(img);
      });
  }


  //    addImgurPreviews()
  requestAnimationFrame(addImgurPreviews);

})();