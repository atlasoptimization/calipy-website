// Progressive enhancement: all lessons and gallery resources are readable without JS.
export function setupLearning() {
  document.querySelectorAll('[data-guide]').forEach(guide=>{
    const panels=[...guide.querySelectorAll('[data-guide-panel]')];
    const tabs=[...guide.querySelectorAll('[data-step]')];
    const previous=guide.querySelector('[data-guide-prev]');
    const next=guide.querySelector('[data-guide-next]');
    let index=0;
    const render=(value,updateHash=false)=>{
      index=Math.max(0,Math.min(panels.length-1,value));
      panels.forEach((panel,i)=>{
        panel.hidden=i!==index;
        panel.setAttribute('role','tabpanel');
        panel.tabIndex=0;
        panel.setAttribute('aria-labelledby',tabs[i].id);
      });
      tabs.forEach((tab,i)=>{
        tab.setAttribute('aria-selected',String(i===index));
        tab.tabIndex=i===index?0:-1;
      });
      previous.disabled=index===0;
      next.disabled=index===panels.length-1;
      guide.querySelector('[data-guide-progress]').textContent=`Step ${index+1} of ${panels.length}`;
      if(updateHash) history.replaceState(null,'',`#${panels[index].id}`);
    };
    const fromHash=()=>{
      const found=panels.findIndex(panel=>`#${panel.id}`===location.hash);
      if(found>=0) render(found);
    };
    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>render(i,true));
      tab.addEventListener('keydown',event=>{
        const move={ArrowRight:(i+1)%tabs.length,ArrowLeft:(i+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1}[event.key];
        if(move===undefined)return;
        event.preventDefault();render(move,true);tabs[move].focus();
      });
    });
    previous.addEventListener('click',()=>{render(index-1,true);tabs[index].focus();});
    next.addEventListener('click',()=>{render(index+1,true);tabs[index].focus();});
    guide.querySelector('.guide-controls').hidden=false;
    render(0);fromHash();
    window.addEventListener('hashchange',()=>{
      fromHash();
      if(panels.some(panel=>`#${panel.id}`===location.hash)) tabs[index].focus({preventScroll:true});
      if(panels.some(panel=>`#${panel.id}`===location.hash)) guide.scrollIntoView({block:'start'});
    });
    // A deep-linked panel may have been hidden during initial enhancement.
    if(panels.some(panel=>`#${panel.id}`===location.hash)) guide.scrollIntoView({block:'start'});
  });
  const filters=document.querySelector('[data-gallery-filters]');
  if(filters){
    const cards=[...document.querySelectorAll('[data-gallery-kind]')];
    const buttons=[...filters.querySelectorAll('[data-gallery-filter]')];
    buttons.forEach(button=>button.addEventListener('click',()=>{
      const filter=button.dataset.galleryFilter;
      cards.forEach(card=>{card.hidden=filter!=='all'&&!card.dataset.galleryKind.split(' ').includes(filter);});
      buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
      const count=cards.filter(card=>!card.hidden).length;
      document.querySelector('[data-gallery-count]').textContent=`${count} ${count===1?'resource':'resources'}`;
    }));
    filters.hidden=false;
  }
}
