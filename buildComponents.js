const fs = require('fs');
const algoliaComponents = require('algolia-frontend-components');

const output = algoliaComponents.communityHeader({
  menu: {
    project: {
      label: "Magento",
      url: "https://community.algolia.com/magento/"
    }
  },
  sideMenu: [
    { 
      name: "Install", 
      url: "#",
      dropdownItems: [ 
        {
          name: "Magento 1",
          url: "https://www.magentocommerce.com/magento-connect/search-algolia-search.html",
          target: "_blank"
        },
        { 
          name: "Magento 2",
          url: "https://marketplace.magento.com/algolia-algoliasearch-magento-2.html",
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
    { name: "Install Magento 1" ,url: "https://www.magentocommerce.com/magento-connect/search-algolia-search.html", target: "_blank"},
    { name: "Install Magento 2" ,url: "https://marketplace.magento.com/algolia-algoliasearch-magento-2.html", target: "_blank"},
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
