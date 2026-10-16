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

  /* ---- marquee ----
     All rows share ONE gap so spacing is identical across categories.
     A lap (one full set + its gaps) is  setWidth + n * gap.  For no icon to be
     on screen twice — not even half-clipped at the edges — a lap must be at
     least  visibleWidth + widestChip.  Solve for gap per row and take the
     largest, so the row with the fewest icons decides it for everyone:
       gap = max(MIN_GAP, max_i((visibleWidth + widestChip - setWidth_i) / n_i))
     Each track then gets exactly one copy appended, so translateX(-50%) is one
     lap, and its duration is lap / SPEED so every row moves at the same pace. ---- */
  var MIN_GAP = 12;    /* px */
  var SPEED   = 28;    /* px per second */
  var marquees = Array.prototype.map.call(document.querySelectorAll('[data-marquee]'), function(track){
    return { track: track, box: track.parentElement, items: Array.prototype.slice.call(track.children) };
  });

  function layoutMarquees(){
    var gap = MIN_GAP;
    marquees.forEach(function(m){
      m.track.querySelectorAll('.dupe').forEach(function(d){ d.remove(); });
      m.setWidth = 0;
      var widest = 0;
      m.items.forEach(function(c){
        m.setWidth += c.offsetWidth;
        widest = Math.max(widest, c.offsetWidth);
      });
      gap = Math.max(gap, (m.box.clientWidth + widest - m.setWidth) / m.items.length);
    });
    /* reduced motion shows a static wrapped grid, so keep it tight */
    gap = reduce ? MIN_GAP : Math.ceil(gap);

    marquees.forEach(function(m){
      var lap = m.setWidth + m.items.length * gap;
      m.track.style.setProperty('--gap', gap + 'px');
      m.track.style.animationDuration = (lap / SPEED) + 's';
      m.items.forEach(function(c){
        var copy = c.cloneNode(true);
        copy.classList.add('dupe');
        copy.setAttribute('aria-hidden', 'true');
        m.track.appendChild(copy);
      });
    });
  }

  layoutMarquees();
  var lastWidth = window.innerWidth, resizeTimer;
  window.addEventListener('resize', function(){
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutMarquees, 150);
  });

  /* ---- project filter ---- */
  var filterBtns = document.querySelectorAll('.proj-filter button');
  var projects = document.querySelectorAll('.proj');
  function applyFilter(cat){
    var visible = [];
    projects.forEach(function(p){
      var show = cat === 'all' || p.dataset.cat.split(' ').indexOf(cat) !== -1;
      p.hidden = !show;
      p.classList.remove('span-all');
      if (show) visible.push(p);
    });
    /* odd count in the 2-col grid: stretch the last card so no empty cell shows */
    if (visible.length % 2) visible[visible.length - 1].classList.add('span-all');
    filterBtns.forEach(function(b){
      var on = b.dataset.filter === cat;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on);
    });
  }
  filterBtns.forEach(function(b){
    b.addEventListener('click', function(){ applyFilter(b.dataset.filter); });
  });
  applyFilter('all');

  /* ---- rail clock ---- */
  var clock = document.getElementById('clock');
  function tick(){
    clock.textContent = new Date().toLocaleTimeString('en-CA', {hour12:false});
  }
  tick(); setInterval(tick, 1000);
})();