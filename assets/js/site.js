(function(){
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  var burger = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true':'false');
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); });
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0, rootMargin:'0px 0px -60px 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function(i){ i.classList.remove('open'); });
      if(!isOpen){ item.classList.add('open'); }
    });
  });

  var statEls = document.querySelectorAll('.stat-num');
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var isDecimal = target % 1 !== 0;
    var start = null; var duration = 1400;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts-start)/duration, 1);
      var eased = 1 - Math.pow(1-progress, 3);
      var val = target * eased;
      el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
      if(progress < 1){ requestAnimationFrame(step); }
    }
    if(reduceMotion){ el.textContent = (isDecimal? target.toFixed(1): target.toLocaleString()) + suffix; return; }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var statIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ animateCount(entry.target); statIo.unobserve(entry.target); }
      });
    }, {threshold:0.6});
    statEls.forEach(function(el){ statIo.observe(el); });
  }
})();
