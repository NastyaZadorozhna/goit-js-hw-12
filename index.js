import{a as h,S as v,i}from"./assets/vendor-D3eAW7nd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();h.defaults.baseURL="https://pixabay.com/api";const y=async(t,r)=>{try{const a={params:{key:"45695124-2521d690be74d3f32382c65dc",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}};return await h.get("/",a)}catch(a){throw console.error("Error fetching photos:",a),a}},f=t=>`
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
    `,m=document.querySelector(".js-search-form"),l=document.querySelector(".js-gallery"),g=document.querySelector(".loader"),d=document.querySelector(".js-load-more");let n=1,c="",b=0;function L(){g.classList.remove("is-hidden")}function u(){g.classList.add("is-hidden")}u();setTimeout(u,300);let w=new v(".gallery a",{navText:["<",">"],captionsData:"alt",captionDelay:250,enableKeyboard:!0});const C=async t=>{if(t.preventDefault(),l.innerHTML="",d.classList.add("is-hidden-load"),c=m.elements.user_query.value.trim(),c===""){i.warning({title:"Caution",message:"Input field must not be empty",position:"bottomCenter"});return}try{L(),n=1;const r=await y(c,n);if(r.data.total===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter"});return}const a=r.data.hits.map(s=>f(s)).join("");l.innerHTML=a,b=l.querySelector("li").getBoundingClientRect().height,w.refresh();let e=Math.ceil(r.data.totalHits/15);n<e?d.classList.remove("is-hidden-load"):i.info({title:"Info",message:"We are sorry, but you have reached the end of search results"})}catch(r){i.error({message:r.message,position:"topRight"})}finally{u()}m.reset()},S=async()=>{try{L(),n++;const t=await y(c,n),r=t.data.hits.map(o=>f(o)).join("");l.insertAdjacentHTML("beforeend",r),scrollBy({top:b*2,behavior:"smooth"}),w.refresh();let a=Math.ceil(t.data.totalHits/15);n>=a&&(d.classList.add("is-hidden-load"),i.info({position:"topCenter",message:"We are sorry, but you have reached the end of search results"}))}catch{i.error({message:"Sorry, there was an error loading the images. Please try again!",position:"topRight"})}finally{u()}};m.addEventListener("submit",C);d.addEventListener("click",S);
//# sourceMappingURL=index.js.map
