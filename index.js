import{a as p,i as m,S as b}from"./assets/vendor-D3eAW7nd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();p.defaults.baseURL="https://pixabay.com/api";const y=(r,t)=>{const a={params:{key:"45695124-2521d690be74d3f32382c65dc",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}};return p.get("/",a)},h=r=>`
    <li class="gallery-card">
    <a class="gallery-link" href="${r.largeImageURL}">
      <img 
      class="gallery-img" 
      src="${r.webformatURL}" 
      alt="${r.tags}" />
    </a>
  <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${r.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${r.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${r.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${r.downloads}</span>
      </li>
    </ul>
  </div>
</li>
    `,n=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),f=document.querySelector(".loader"),g=document.querySelector(".js-load-more");let i=1,v="",L=0;function d(){f.classList.remove("is-hidden")}function u(){f.classList.add("is-hidden")}d();setTimeout(u,300);const w=async r=>{try{d(),r.preventDefault(),i=1;const t=n.elements.user_query.value.trim(),a=await y(t,i);if(console.log(a),!a.data.hits.length||t===""){m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"center"}),c.innerHTML="",n.reset();return}const o=a.data.hits.map(l=>h(l)).join("");c.innerHTML=o,L=c.querySelector("li").getBoundingClientRect().height,new b(".gallery a",{navText:["<",">"],captionsData:"alt",captionDelay:250,enableKeyboard:!0}).refresh(),g.classList.remove("is-hidden-load")}catch(t){console.log(t)}finally{u()}n.reset()},S=async r=>{try{d(),i++;const t=await y(v,i),a=t.data.hits.map(e=>h(e)).join("");c.insertAdjacentHTML("beforeend",a),scrollBy({top:L*2,behavior:"smooth"});const o=Math.ceil(t.data.totalHits/15);i>=o&&(LoadMoreBtnEl.classList.add("is-hidden"),m.info({position:"topCenter",message:"We are sorry,but you have reached the end of search results"}))}catch(t){console.log(t)}finally{u()}n.reset()};n.addEventListener("submit",w);g.addEventListener("click",S);
//# sourceMappingURL=index.js.map
