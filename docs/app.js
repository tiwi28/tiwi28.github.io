(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- boot sequence ---- */
  var boot  = document.getElementById('boot');
  var lines = boot.querySelectorAll('.boot-line');
  var bar   = boot.querySelector('.boot-bar i');

  function finish(){
    boot.classList.add('done');
    document.body.style.overflow = '';
  }

  if (reduce) {
    finish();
  } else {
    document.body.style.overflow = 'hidden';
    bar.style.transition = 'width 1.9s steps(28, end)';
    requestAnimationFrame(function(){ bar.style.width = '100%'; });
    lines.forEach(function(l, i){
      setTimeout(function(){ l.classList.add('on'); }, 260 + i * 330);
    });
    setTimeout(finish, 2350);
  }

  /* ---- nav appears after the title screen ---- */
  var nav = document.getElementById('nav');
  var hero = document.querySelector('.hero');
  new IntersectionObserver(function(es){
    nav.classList.toggle('show', !es[0].isIntersecting);
  }, {rootMargin:'-70% 0px 0px 0px'}).observe(hero);

  /* ---- scroll hint fades once you leave the top ---- */
  var scrollHint = document.querySelector('.scroll-hint');
  function toggleScrollHint(){
    scrollHint.classList.toggle('hide', window.scrollY > 40);
  }
  toggleScrollHint();
  window.addEventListener('scroll', toggleScrollHint, {passive:true});

  /* ---- scroll reveals ---- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  /* ---- marquee: duplicate each track so the loop is seamless ---- */
  document.querySelectorAll('[data-marquee]').forEach(function(track){
    var clone = track.cloneNode(true);
    clone.classList.add('dupe');
    clone.setAttribute('aria-hidden','true');
    track.innerHTML += clone.innerHTML;
  });

  /* ---- rail clock ---- */
  var clock = document.getElementById('clock');
  function tick(){
    clock.textContent = new Date().toLocaleTimeString('en-CA', {hour12:false});
  }
  tick(); setInterval(tick, 1000);
})();