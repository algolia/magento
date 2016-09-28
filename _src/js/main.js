function checkVisible(elm, threshold, mode) {
    threshold = threshold || 0;
    mode = mode || 'visible';
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    var above = rect.bottom - threshold < 0;
    var below = rect.top - viewHeight + threshold >= 0;
    return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
}


// Interactive partners map
function p_map() {
  var triggers = document.querySelectorAll('[data-pin]');
  var pins = document.querySelectorAll('g[id*="pins_"]');

  for ( var i = 0; i < triggers.length; i++ ) {
    highlightPin(triggers[i]);
  }

  for ( var i = 0; i < pins.length; i++ ) {
    highlightTrigger(pins[i]);
  }

  function highlightPin(of) {
    of.addEventListener('mouseover', function(){
      var company = this.getAttribute('data-pin');
      document.getElementById('pins_' + company ).classList.add('highlight');
      var notPath = document.querySelectorAll('[id*="pins_"]:not(#pins_' + company+')');
      for ( var i = 0; i<notPath.length;i++ ) {
        notPath[i].classList.add('fade');
      }
    });

    of.addEventListener('mouseleave', function(){
      var company = this.getAttribute('data-pin');
      document.getElementById('pins_' + company ).classList.remove('highlight');
      var notPath = document.querySelectorAll('[id*="pins_"]:not(#pins_' + company+')');
      for ( var i = 0; i<notPath.length;i++ ) {
        notPath[i].classList.remove('fade');
      }
    });
  }

  function highlightTrigger(of) {
    of.addEventListener('mouseover', function(){
      var region = this.id.split('_')[1];
      document.querySelector('[data-pin="'+ region +'"]').classList.add('highlight');
    });

    of.addEventListener('mouseleave', function(){
      var region = this.id.split('_')[1];
      document.querySelector('[data-pin="'+ region +'"]').classList.remove('highlight');
    });
  }
}

// Now enable the animations only when in the section
var dist = 0;
var demos = document.querySelector('.demos');

window.onscroll = function() {

 // Animation what is a record
 if (checkVisible(demos, dist)) {
   demos.classList.add('animated');
 } else {
   demos.classList.remove('animated');
 }
};

// To insert on line #55
function animOnVisibility() {
  checkVisible(demos, dist);
}

window.onload = function() {
    checkVisible(demos, dist);
    p_map()
}

p_map()
