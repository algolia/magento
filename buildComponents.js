const fs = require('fs');
const algoliaComponents = require('algolia-frontend-components');

const output = algoliaComponents.communityHeader({
  menu: {
    project: {
      label: "Magento",
      url: "https://community.algolia.com/magento/"
    },
    community: {
      dropdownItems:[
        {
          "name": "Wordpress",
          "url": "https://community.algolia.com/wordpress",
          "logo": "https://community.algolia.com/wordpress/img/icons/wp-icon.svg",
          "backgroundColor": "linear-gradient(to bottom right, #4041B2, #516ED1)"
        },
        {
          "name": "Shopify",
          "url": "https://community.algolia.com/shopify",
          "logo": "shopify",
          "backgroundColor": "linear-gradient(to bottom left, #29D98D, #03A8F6 450%)"
        },
        {
          "name": "React InstantSearch",
          "url": "https://community.algolia.com/instantsearch.js/react",
          "logo": "InstantSearchReact",
          "backgroundColor": "linear-gradient(to bottom left, #2C5EE2 0%, #17204F 150%)"
        },
        {
          "name": "instantsearch.js",
          "url": "https://community.algolia.com/instantsearch.js/",
          "logo": "https://community.algolia.com/img/logo-is.svg",
          "backgroundColor": "#385D72"
        },
        {
          "name": "places.js",
          "url": "https://community.algolia.com/places/",
          "logo": "https://community.algolia.com/places/images/svg/places-illustration-65745839.svg",
          "backgroundColor": "#3a5395"
        },
        {
          "name": "Helper.js",
          "url": "https://community.algolia.com/algoliasearch-helper-js/",
          "logo": "https://community.algolia.com/img/logo-helper.svg",
          "backgroundColor": "#FDBD57"
        }
      ]
    }
  },
  sideMenu: [
    { 
      name: "Install", 
      url: "#",
      dropdownItems: [ 
        {
          name: "Magento 1",
          url: "https://community.algolia.com/magento/doc/m1/getting-started/",
          target: "_blank"
        },
        { 
          name: "Magento 2",
          url: "https://community.algolia.com/magento/doc/m2/getting-started/",
          target: "_blank"
        }
      ],
    },
    { 
      name: "Documentation",
      url: "#",
      dropdownItems: [
        { 
          name: "Documentation for Magento 1",
          url: "https://community.algolia.com/magento/doc/m1/getting-started/",
        },
        {
          name: "Documentation for Magento 2",
          url: "https://community.algolia.com/magento/doc/m2/getting-started/",
        }
      ]
    },
    { name: "FAQ", url: "/magento/faq/" },
    { 
      name: "Github",
      url: "#",
      image: "<img src='/magento/img/icon-github.svg' alt='View on Github'/>",
      dropdownItems: [
        { 
          name: "Magento 1",
          url: "https://github.com/algolia/algoliasearch-magento",
          target: "_blank"
        },
        {
          name: "Magento 2",
          url: "https://github.com/algolia/algoliasearch-magento-2",
          target: "_blank"
        }
      ]
    },
  ],
  mobileMenu: [
    { name: "Home", url: "/magento/" },
    { name: "Install Magento 1" ,url: "https://community.algolia.com/magento/doc/m1/getting-started/", target: "_blank"},
    { name: "Install Magento 2" ,url: "https://community.algolia.com/magento/doc/m2/getting-started/", target: "_blank"},
    { name: "Magento 1 Docs", url: "https://community.algolia.com/magento/doc/m1/getting-started/" },
    { name: "Magento 2 Docs", url: "https://community.algolia.com/magento/doc/m2/getting-started/" },
    { name: "Discourse", url: "https://discourse.algolia.com/c/magento", target: "_blank"},
    { name: "FAQ", url: "/magento/faq/" }
  ]
});

const file = fs.readFileSync('node_modules/algolia-frontend-components/dist/_communityHeader.js');

try {
  fs.writeFileSync('_src/_includes/header.html', output, 'utf-8');
  fs.writeFileSync('_src/js/communityHeader.js', file, 'utf-8')
} catch (e) {
  throw new Error('Failed to write header file');
}
