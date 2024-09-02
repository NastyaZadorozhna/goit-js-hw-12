import{a as p,i as m,S as L}from"./assets/vendor-D3eAW7nd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();p.defaults.baseURL="https://pixabay.com/api";const y=(t,s)=>{const a={params:{key:"45695124-2521d690be74d3f32382c65dc",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}};return p.get("/",a)},f=t=>`
    <li class="gallery-card">
    <a class="gallery-link" href="${t.largeImageURL}">
      <img 
      class="gallery-img" 
      src="${t.webformatURL}" 
      alt="${t.tags}" />
    </a>
  <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${t.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${t.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${t.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${t.downloads}</span>
      </li>
    </ul>
  </div>
</li>
    `,l=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),h=document.querySelector(".loader"),g=document.querySelector(".js-load-more");let n=1,b="";function d(){h.classList.remove("is-hidden")}function u(){h.classList.add("is-hidden")}d();setTimeout(u,300);const v=async t=>{try{d(),t.preventDefault(),n=1;const s=l.elements.user_query.value.trim(),a=await y(s,n);if(console.log(a),!a.data.hits.length||s===""){m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"center"}),c.innerHTML="",l.reset();return}const o=a.data.hits.map(r=>f(r)).join("");c.innerHTML=o,new L(".gallery a",{navText:["<",">"],captionsData:"alt",captionDelay:250,enableKeyboard:!0}).refresh(),g.classList.remove("is-hidden-load")}catch(s){console.log(s)}finally{u()}l.reset()},w=async t=>{try{d(),n++;const s=await y(b,n),a=s.data.hits.map(o=>f(o)).join("");c.insertAdjacentHTML("beforeend",a),Math.ceil(s.data.totalHits/15),LoadMoreBtnEl.classList.add("is-hidden-load"),m.info({position:"topCenter",message:"We are sorry,but you have reached the end of search results"})}catch{console.log(err)}finally{u()}l.reset()};l.addEventListener("submit",v);g.addEventListener("click",w);
//# sourceMappingURL=index.js.map
