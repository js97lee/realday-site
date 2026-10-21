const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
function closeMenu(){header.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');}
menu.addEventListener('click',()=>{const open=header.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');});
document.querySelectorAll('#navigation a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('is-open')){closeMenu();menu.focus();}});
window.matchMedia('(min-width:681px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

const tabs=[...document.querySelectorAll('[role="tab"]')];
function activateTab(tab,focus=false){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});if(focus)tab.focus();}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activateTab(tabs[next],true);}});});

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const f=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('.work-card').forEach(card=>{card.hidden=f!=='all'&&card.dataset.category!==f;if(!card.hidden)count++;});const countEl=document.getElementById('work-count');if(countEl)countEl.textContent=String(count).padStart(2,'0');}));

const dialog=document.querySelector('.work-dialog');
if(dialog){
 let trigger=null;
 const escape=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const dataURL=new URL('./work-data.json',document.currentScript.src);
 const dataPromise=fetch(dataURL).then(r=>{if(!r.ok)throw Error('사례를 불러오지 못했습니다.');return r.json();});
 document.querySelectorAll('[data-work]').forEach(button=>button.addEventListener('click',async()=>{
  trigger=button;button.setAttribute('aria-busy','true');
  try{
   const works=await dataPromise,w=works.find(w=>w.id===button.dataset.work);if(!w)return;
   const imageURL=new URL('./assets/'+w.image,dataURL);
   document.getElementById('work-dialog-content').innerHTML=`<img class="dialog-photo" src="${imageURL.href}" alt="${escape(w.alt)}"><div class="dialog-body"><span class="micro">${escape(w.tag)}</span><h2 id="work-dialog-title">${escape(w.title)}</h2><p>${escape(w.detail)}</p>${w.metric?`<p class="case-metric">${escape(w.metric)}</p>`:''}<dl><dt>수행 분야</dt><dd>${escape(w.role)}</dd><dt>산출물</dt><dd>${escape(w.output)}</dd></dl><p class="note">${escape(w.scope)}</p></div>`;
   dialog.showModal();document.documentElement.style.overflow='hidden';
  }catch(error){document.getElementById('work-dialog-content').textContent='사례 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';dialog.showModal();}
  finally{button.removeAttribute('aria-busy');}
 }));
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.documentElement.style.overflow='';trigger?.focus();});
}
