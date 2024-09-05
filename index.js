import{a as h,i as c,S as v}from"./assets/vendor-D3eAW7nd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();h.defaults.baseURL="https://pixabay.com/api";const y=(s,t)=>{const a={params:{key:"45695124-2521d690be74d3f32382c65dc",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}};return h.get("/",a)},f=s=>`
    <li class="gallery-card">
    <a class="gallery-link" href="${s.largeImageURL}">
      <img 
      class="gallery-img" 
      src="${s.webformatURL}" 
      alt="${s.tags}" />
    </a>
  <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${s.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${s.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${s.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${s.downloads}</span>
      </li>
    </ul>
  </div>
</li>
    `,i=document.querySelector(".js-search-form"),d=document.querySelector(".js-gallery"),g=document.querySelector(".loader"),m=document.querySelector(".js-load-more");let o=1,u="",b=0;function L(){g.classList.remove("is-hidden")}function p(){g.classList.add("is-hidden")}p();setTimeout(p,300);const w=async s=>{try{L(),s.preventDefault(),o=1,u=i.elements.user_query.value.trim();const t=await y(u,o);if(console.log(t),u===""){c.warning({title:"Caution",message:"Input field must not be empty",position:"bottomCenter"});return}if(t.data.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter"}),d.innerHTML="",i.reset();return}const a=t.data.hits.map(n=>f(n)).join("");d.innerHTML=a,b=d.querySelector("li").getBoundingClientRect().height,new v(".gallery a",{navText:["<",">"],captionsData:"alt",captionDelay:250,enableKeyboard:!0}).refresh(),m.classList.remove("is-hidden-load");const r=Math.ceil(t.data.totalHits/15);o>=r&&(m.classList.add("is-hidden-load"),c.info({title:"Info",message:"We are sorry,but you have reached the end of search results"}))}catch(t){console.log(t)}finally{p()}i.reset()},C=async s=>{try{L(),o++;const t=await y(u,o),a=t.data.hits.map(e=>f(e)).join("");d.insertAdjacentHTML("beforeend",a),scrollBy({top:b*2,behavior:"smooth"});const l=Math.ceil(t.data.totalHits/15);o>=l&&(m.classList.add("is-hidden-load"),c.info({position:"topCenter",message:"We are sorry,but you have reached the end of search results"}))}catch(t){console.log(t)}finally{p()}i.reset()};i.addEventListener("submit",w);m.addEventListener("click",C);
//# sourceMappingURL=index.js.map
