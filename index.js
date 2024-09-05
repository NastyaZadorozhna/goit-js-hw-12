import{a as h,S as w,i as o}from"./assets/vendor-D3eAW7nd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();h.defaults.baseURL="https://pixabay.com/api";const y=(r,t)=>{const a={params:{key:"45695124-2521d690be74d3f32382c65dc",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}};return h.get("/",a)},f=r=>`
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
    `,n=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),g=document.querySelector(".loader"),u=document.querySelector(".js-load-more");let i=1,d="",b=0;function L(){g.classList.remove("is-hidden")}function m(){g.classList.add("is-hidden")}m();setTimeout(m,300);let v=new w(".gallery a",{navText:["<",">"],captionsData:"alt",captionDelay:250,enableKeyboard:!0});const C=async r=>{try{L(),r.preventDefault(),i=1,d=n.elements.user_query.value.trim();const t=await y(d,i);if(console.log(t),d===""){o.warning({title:"Caution",message:"Input field must not be empty",position:"bottomCenter"});return}if(t.data.total===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter"}),c.innerHTML="",n.reset();return}const a=t.data.hits.map(s=>f(s)).join("");c.innerHTML=a,b=c.querySelector("li").getBoundingClientRect().height,v.refresh(),u.classList.remove("is-hidden-load");let e=Math.ceil(t.data.totalHits/15);i>=e&&(u.classList.add("is-hidden-load"),o.info({title:"Info",message:"We are sorry,but you have reached the end of search results"}))}catch(t){o.error({message:t.message,position:"topRight"})}finally{m()}n.reset()},S=async r=>{try{L(),i++;const t=await y(d,i),a=t.data.hits.map(e=>f(e)).join("");c.insertAdjacentHTML("beforeend",a),scrollBy({top:b*2,behavior:"smooth"}),v.refresh();let l=Math.ceil(t.data.totalHits/15);i>=l&&(u.classList.add("is-hidden-load"),o.info({position:"topCenter",message:"We are sorry,but you have reached the end of search results"}))}catch{o.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{m()}n.reset()};n.addEventListener("submit",C);u.addEventListener("click",S);
//# sourceMappingURL=index.js.map
