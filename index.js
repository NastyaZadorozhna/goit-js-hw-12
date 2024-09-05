import{a as h,S as w,i as o}from"./assets/vendor-D3eAW7nd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();h.defaults.baseURL="https://pixabay.com/api";const y=(t,r)=>{const a={params:{key:"45695124-2521d690be74d3f32382c65dc",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}};return h.get("/",a)},f=t=>`
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
    `,p=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),g=document.querySelector(".loader"),d=document.querySelector(".js-load-more");let i=1,c="",b=0;function L(){g.classList.remove("is-hidden")}function u(){g.classList.add("is-hidden")}u();setTimeout(u,300);let v=new w(".gallery a",{navText:["<",">"],captionsData:"alt",captionDelay:250,enableKeyboard:!0});const C=async t=>{if(t.preventDefault(),n.innerHTML="",d.classList.add("is-hidden-load"),c=p.elements.user_query.value.trim(),c===""){o.warning({title:"Caution",message:"Input field must not be empty",position:"bottomCenter"});return}try{L(),i=1;const r=await y(c,i);if(r.data.total===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter"});return}const a=r.data.hits.map(s=>f(s)).join("");n.innerHTML=a,b=n.querySelector("li").getBoundingClientRect().height,v.refresh();let e=Math.ceil(r.data.totalHits/15);i<e?d.classList.remove("is-hidden-load"):o.info({title:"Info",message:"We are sorry, but you have reached the end of search results"})}catch(r){o.error({message:r.message,position:"topRight"})}finally{u()}p.reset()},S=async()=>{try{L(),i++;const t=await y(c,i),r=t.data.hits.map(l=>f(l)).join("");n.insertAdjacentHTML("beforeend",r),scrollBy({top:b*2,behavior:"smooth"}),v.refresh();let a=Math.ceil(t.data.totalHits/15);i>=a&&(d.classList.add("is-hidden-load"),o.info({position:"topCenter",message:"We are sorry, but you have reached the end of search results"}))}catch{o.error({message:"Sorry, there was an error loading the images. Please try again!",position:"topRight"})}finally{u()}};p.addEventListener("submit",C);d.addEventListener("click",S);
//# sourceMappingURL=index.js.map
