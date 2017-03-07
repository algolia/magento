'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Main header function with docsearch
 * @param  {Object} docSearch config
 */
var communityHeader = function communityHeader(docSearch) {

  var hasDocSearchRendered = document.querySelector('.algc-navigation .algc-search__input--docsearch');
  var enableDocSearch = docSearch.apiKey && docSearch.indexName && docSearch.inputSelector ? true : false;

  if (!enableDocSearch && hasDocSearchRendered) {
    throw new Error('You need to pass docSearch: { api_key, index_name, input_selector } to communityHeader function in order to initialise docSearch');
  }

  var navRoot = document.querySelector('.algc-dropdownroot');
  var dropdownRoot = document.querySelector('.algc-navigation__dropdown-holder');
  var navItems = document.querySelectorAll('a[data-enabledropdown="true"]');
  var navContainer = document.querySelector('.algc-dropdownroot__dropdowncontainer');

  var menuContainer = document.querySelector('.algc-navigation__container');
  var navBg = document.querySelector('.algc-dropdownroot__dropdownbg');
  var navArrow = document.querySelector('.algc-dropdownroot__dropdownarrow');
  var dropDownContainer = document.querySelector('.algc-dropdownroot__dropdowncontainer');
  var menuTriggers = document.querySelectorAll('[data-enabledropdown="true"]');

  var mobileMenuButton = document.querySelector('.algc-openmobile ');
  var mobileMenu = document.querySelector('.algc-mobilemenu');

  var subList = document.querySelectorAll('.algc-menu--hassublist .algc-menu--sublistlink');
  var subListHolders = [].concat(_toConsumableArray(subList)).map(function (node) {
    return node.parentNode;
  });

  // State of menus
  var state = {
    isOpen: false,
    isOpenMobile: false
  };

  var menuDropdowns = {};

  [].forEach.call(document.querySelectorAll('[data-dropdown-content]'), function (item) {
    menuDropdowns[item.dataset.dropdownContent] = {
      parent: item.parentNode,
      content: item
    };
  });

  var INIT_VAL = {
    WIDTH: 490,
    HEIGHT: 360
  };

  var disableTransitionTimeout = void 0;

  var triggerMenu = function triggerMenu(event) {

    var dropdown = event.target.dataset.dropdown;
    var newTarget = menuDropdowns[dropdown].content;
    var newContent = menuDropdowns[dropdown].parent;

    var navItem = _utils.calculatePosition(event.target);
    var newTargetCoordinates = _utils.calculatePosition(newTarget);
    var menuContainerOffset = _utils.calculatePosition(menuContainer);
    var leftDistance = void 0;

    var scaleFactors = {
      X: newTargetCoordinates.realWidth / INIT_VAL.WIDTH,
      Y: newTargetCoordinates.realHeight / INIT_VAL.HEIGHT
    };

    if (navItem.center < menuContainerOffset.center / 2) {
      leftDistance = "calc(50% - 36px)";
    } else {
      leftDistance = navItem.center - menuContainerOffset.left + "px";
    }

    if (window.innerWidth < 576) {
      leftDistance = "0";
    }

    navBg.style.cssText = '\n      transform: translateX(' + leftDistance + ') scale(' + scaleFactors.X + ', ' + scaleFactors.Y + ')';

    navArrow.style.cssText = '\n      transform: translateX(' + leftDistance + ') rotate(45deg)';

    dropDownContainer.style.cssText = '\n      transform: translateX(' + leftDistance + ');\n      width: ' + newTargetCoordinates.realWidth + 'px;\n      height: ' + (newTargetCoordinates.realHeight + 10) + 'px;';

    dropdownRoot.style.pointerEvents = "auto";

    Object.keys(menuDropdowns).forEach(function (key) {
      if (key === dropdown) {
        menuDropdowns[key].parent.classList.add('active');
      } else {
        menuDropdowns[key].parent.classList.remove('active');
      }
    });

    if (!state.isOpen) {
      setTimeout(function () {
        navRoot.className = "algc-dropdownroot activeDropdown";
      }, 50);
    }

    window.clearTimeout(disableTransitionTimeout);
    state.isOpen = true;
  };

  var closeMenu = function closeMenu(event) {
    state.isOpen = false;
    disableTransitionTimeout = setTimeout(function () {
      dropdownRoot.style.pointerEvents = "none";
      navRoot.className = "algc-dropdownroot notransition";
    }, 50);
  };

  var _utils = {};

  _utils.calculatePosition = function (sourceNode) {
    var box = sourceNode.getBoundingClientRect();
    var realWidth = sourceNode.offsetWidth;
    var realHeight = sourceNode.offsetHeight;

    return {
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
      realWidth: realWidth,
      realHeight: realHeight,
      center: box.left + box.width / 2
    };
  };

  _utils.setClassNames = function (id) {
    var nodeCount = Object.keys(refs);
    nodeCount.forEach(function (ref, index) {
      var node = refs[ref].nodes[1];
      if (index < id) {
        node.className = 'algc-dropdownroot__section left';
      } else if (index === id) {
        node.className = 'algc-dropdownroot__section active';
      } else {
        node.className = 'algc-dropdownroot__section right';
      }
    });
  };

  _utils.getCoordinates = function (target) {
    var box = target.getBoundingClientRect();
  };

  var toggleMobileMenu = function toggleMobileMenu(event) {
    mobileMenuButton.classList.toggle('algc-openmobile--open');
    mobileMenu.classList.toggle('algc-mobilemenu--open');
  };

  var searchIcon = document.querySelector('#search');
  var cancelIcon = document.querySelector('#cancel');
  var searchContainer = document.querySelector('.algc-search__input').parentNode;
  var searchInput = document.querySelector(docSearch.inputSelector);

  // Search
  var docSearchToggling = function docSearchToggling() {
    function openSearchInput() {
      searchContainer.classList.add('open');
      searchInput.focus();
    }

    function closeSearchInput() {
      searchInput.blur();
      searchContainer.classList.remove('open');
    }

    function emptySearchInput() {
      if (searchInput.value !== '') {
        searchInput.value = '';
      } else {
        closeSearchInput();
      }
    }
    searchInput.setAttribute('value', '');
    searchIcon.addEventListener('click', openSearchInput);
    cancelIcon.addEventListener('click', emptySearchInput);
  };

  // If the user type :"s" or "/", open the searchbox
  var catchSearchShortcuts = function catchSearchShortcuts() {
    var keyPressed = {};

    document.addEventListener('keydown', function (e) {
      keyPressed[e.keyCode] = true;
    }, false);
    document.addEventListener('keyup', function (e) {
      keyPressed[e.keyCode] = false;
    }, false);

    var searchLoop = function searchLoop(event) {
      if (keyPressed['83'] || keyPressed['191']) {
        document.querySelector('.algc-search__input').parentNode.classList.add('open');
        searchInput.focus();

        setTimeout(function () {
          keyPressed = {};
        }, 500);
      } else if (keyPressed['27']) {
        document.querySelector('.algc-search__input').parentNode.classList.remove('open');
        searchInput.blur();

        setTimeout(function () {
          keyPressed = {};
        }, 500);
      }
      setTimeout(searchLoop, 5);
    };

    searchLoop();
  };

  if (enableDocSearch) {
    docSearchToggling();
    catchSearchShortcuts();

    docsearch(docSearch);
  }

  function openSubList(event) {
    event.preventDefault();
    event.stopPropagation();
    subListHolders.forEach(function (holder) {
      if (holder.classList.contains('open') && holder === event.target.parentNode) {
        holder.classList.remove('open');
      } else {
        holder.classList.add('open');
      }
    });
  }

  function closeSubLists(event) {
    subListHolders.forEach(function (holder) {
      return holder.classList.remove('open');
    });
  }

  subList.forEach(function (link) {
    return link.addEventListener('click', openSubList);
  });

  // Assign event listeners
  menuTriggers.forEach(function (item) {
    item.addEventListener('mouseenter', triggerMenu);
    item.addEventListener('focus', triggerMenu);
  });

  navItems.forEach(function (item) {
    item.addEventListener('mouseleave', closeMenu);
  });

  navContainer.addEventListener('mouseenter', function () {
    clearTimeout(disableTransitionTimeout);
  });

  document.addEventListener('click', closeSubLists);
  document.querySelector('.algc-dropdownroot__dropdowncontainer').addEventListener('mouseleave', closeMenu);

  mobileMenuButton.addEventListener('click', toggleMobileMenu);
};