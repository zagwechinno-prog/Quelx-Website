(function(){
  var header = document.getElementById('siteHeader');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Roadmap stepper ---------- */
  var roadmap = document.getElementById('roadmap');
  if(roadmap){
    var nodeBtns = Array.prototype.slice.call(roadmap.querySelectorAll('.roadmap-node-btn'));
    var panels = Array.prototype.slice.call(roadmap.querySelectorAll('.step-panel'));
    var fill = document.getElementById('roadmapFill');
    var total = nodeBtns.length;
    var active = 0;

    function renderRoadmap(){
      nodeBtns.forEach(function(btn, i){
        btn.classList.toggle('active', i === active);
        btn.classList.toggle('checked', i < active);
        btn.setAttribute('aria-current', i === active ? 'step' : 'false');
      });
      panels.forEach(function(p, i){ p.classList.toggle('active', i === active); });
      fill.style.width = (active / (total - 1) * 100) + '%';
    }

    function goToStep(i){
      i = Math.max(0, Math.min(total - 1, i));
      active = i;
      renderRoadmap();
    }

    nodeBtns.forEach(function(btn){
      btn.addEventListener('click', function(){ goToStep(parseInt(btn.getAttribute('data-step'), 10)); });
    });
    roadmap.querySelectorAll('.step-next-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        goToStep(parseInt(btn.getAttribute('data-goto'), 10));
        roadmap.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'});
      });
    });

    renderRoadmap();
  }

  /* ---------- Team photo upload ---------- */
  var photoFrame = document.getElementById('teamPhotoFrame');
  if(photoFrame){
    var photoInput = document.getElementById('teamPhotoInput');
    var photoImg = document.getElementById('teamPhotoImg');
    var photoLabel = document.getElementById('teamPhotoLabel');
    var photoUploadBtn = photoFrame.querySelector('.team-photo-upload');
    var STORAGE_KEY = 'quelx_team_photo_zagwe';

    function showPhoto(dataUrl){
      photoImg.src = dataUrl;
      photoImg.hidden = false;
      photoFrame.classList.remove('empty');
      photoFrame.classList.add('filled');
      photoLabel.textContent = 'Change photo';
      photoUploadBtn.setAttribute('aria-label', 'Change photo of Zagwe Chinno');
    }

    function handleFile(file){
      if(!file || file.type.indexOf('image/') !== 0) return;
      var reader = new FileReader();
      reader.onload = function(e){
        var dataUrl = e.target.result;
        showPhoto(dataUrl);
        try{ localStorage.setItem(STORAGE_KEY, dataUrl); }catch(err){ /* storage unavailable or full — preview still works */ }
      };
      reader.readAsDataURL(file);
    }

    photoInput.addEventListener('change', function(){
      if(photoInput.files && photoInput.files[0]) handleFile(photoInput.files[0]);
    });

    photoUploadBtn.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        photoInput.click();
      }
    });

    photoFrame.addEventListener('dragover', function(e){ e.preventDefault(); photoFrame.classList.add('dragging'); });
    photoFrame.addEventListener('dragleave', function(){ photoFrame.classList.remove('dragging'); });
    photoFrame.addEventListener('drop', function(e){
      e.preventDefault();
      photoFrame.classList.remove('dragging');
      if(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    try{
      var saved = localStorage.getItem(STORAGE_KEY);
      if(saved) showPhoto(saved);
    }catch(err){ /* storage unavailable — placeholder stays visible */ }
  }

  /* ---------- Legal pages (Terms & Privacy & Work With Us) ---------- */
  var mainEl = document.getElementById('top');
  var siteFooter = document.querySelector('footer');
  var headerBrandMark = document.querySelector('header .brand-mark');

  var legalPages = {
    terms: { el: document.getElementById('termsPage'), backId: 'termsBack', logoId: 'termsLogoHome', markId: 'termsBrandMark' },
    privacy: { el: document.getElementById('privacyPage'), backId: 'privacyBack', logoId: 'privacyLogoHome', markId: 'privacyBrandMark' },
    'work-with-us': { el: document.getElementById('workWithUsPage'), backId: 'workBack', logoId: 'workLogoHome', markId: 'workBrandMark' }
  };

  if(mainEl){
    Object.keys(legalPages).forEach(function(key){
      var page = legalPages[key];
      if(!page.el) return;
      var mark = document.getElementById(page.markId);
      if(mark && headerBrandMark){ mark.src = headerBrandMark.src; mark.alt = headerBrandMark.alt; }
    });

    function hideAllLegalPages(){
      Object.keys(legalPages).forEach(function(key){
        var page = legalPages[key];
        if(page.el){ page.el.style.display = 'none'; page.el.setAttribute('aria-hidden', 'true'); }
      });
    }

    function showLegalPage(key){
      var page = legalPages[key];
      if(!page || !page.el) return;
      mainEl.style.display = 'none';
      mainEl.setAttribute('aria-hidden', 'true');
      if(siteFooter) siteFooter.style.display = 'none';
      header.style.display = 'none';
      hideAllLegalPages();
      page.el.style.display = 'block';
      page.el.setAttribute('aria-hidden', 'false');
      history.replaceState(null, '', '#' + key);
      window.scrollTo(0, 0);
    }

    function showMainSite(){
      mainEl.style.display = '';
      mainEl.removeAttribute('aria-hidden');
      if(siteFooter) siteFooter.style.display = '';
      header.style.display = '';
      hideAllLegalPages();
      history.replaceState(null, '', location.pathname + location.search);
      window.scrollTo(0, 0);
    }

    Object.keys(legalPages).forEach(function(key){
      var page = legalPages[key];
      if(!page.el) return;
      document.querySelectorAll('a[href="#' + key + '"]').forEach(function(link){
        link.addEventListener('click', function(e){ e.preventDefault(); showLegalPage(key); });
      });
      [page.backId, page.logoId].forEach(function(id){
        var el = document.getElementById(id);
        if(el){ el.addEventListener('click', function(e){ e.preventDefault(); showMainSite(); }); }
      });
    });

    var initialHash = location.hash.replace('#', '');
    if(legalPages[initialHash]){ showLegalPage(initialHash); }
  }

  /* ---------- Work with us form ---------- */
  var workForm = document.getElementById('workForm');
  if(workForm){
    var workFormSuccess = document.getElementById('workFormSuccess');
    workForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(!workForm.reportValidity()) return;

      var v = function(id){ return document.getElementById(id).value.trim(); };
      var firstName = v('wfFirstName'), lastName = v('wfLastName'), email = v('wfEmail'),
          company = v('wfCompany'), website = v('wfWebsite'), role = v('wfRole'),
          size = v('wfSize'), budget = v('wfBudget'), project = v('wfProject');

      var subject = 'New inquiry from ' + firstName + ' ' + lastName + ' (' + company + ')';
      var bodyLines = [
        'First Name: ' + firstName,
        'Last Name: ' + lastName,
        'Work Email: ' + email,
        'Company: ' + company,
        'Company Website: ' + website,
        'Role: ' + role,
        'Company Size: ' + size,
        'Budget Range: ' + budget,
        '',
        'Project details:',
        project || '(not provided)'
      ];
      var mailto = 'mailto:hello@quelxcore.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      if(workFormSuccess) workFormSuccess.classList.add('show');
      window.location.href = mailto;
    });
  }
})();
