---
layout: m2-documentation
title: How to customize the extension
permalink: /doc/m2/customize-extension/
description: Learn how to create a custom Magento 2 extension to modify behaviour of Algolia extension for Magento 2
---

Algolia is a powerful tool that opens the door to a variety of search features.
While you may want to customize your frontend integration or maybe extend the backend features, modifications to the extension files are lost every time you update the extension.

In this guide you'll learn how to create your own custom Magento module to customize your store the right way.

Before starting, please make sure you have the [Algolia extension](https://community.algolia.com/magento/) installed into your Magento 2 website.


## Introducing CustomAlgolia extension

The best way to modify an extension is to override it. If you need to modify a template for instance, you don't modify it directly, but you create a new one and tell Magento to use your file instead of the original one. This new file will sit in a custom extension.

In order to avoid the boilerplate of creating a custom extension we made one for you: [CustomAlgolia extension](https://github.com/algolia/algoliasearch-custom-algolia-magento-2)

It ships with a few code samples to help you.

## Installation

The CustomAlgolia extension can be installed via [Composer](https://getcomposer.org/):

```sh
$ cd /path/to/your/magento2/directory
$ composer require algolia/algoliasearch-custom-algolia-magento-2
$ php bin/magento setup:upgrade
```

The extension will be installed to `vendor/algolia/algoliasearch-custom-algolia-magento-2` directory in your Magento 2 root directory.

## Understanding the directory structure

To keep it simple, we'll use the same data structure as seen in standard Magento 2 extension.

```
├── Observer
│   ├── UpdateFrontendConfiguration.php
│   ├── UpdateProductsSettings.php
│   │   └── frontend
│   │       └── base
│   │           └── default
│   │               ├── layout
│   │               │   └── customalgolia.xml
│   │               └── template
│   │                   └── customalgolia
│   │                       └── autocomplete
│   │                           └── page.phtml
├── etc
│   ├── module.xml
│   └── events.xml
├── view
│   ├── layout
│   │   └── algolia_search_handle.xml
│   ├── web
│   │   ├── autocomplete.js
│   │   ├── hooks.js
│   │   └── customalgolia.css
│   ├── templates
│   │   └── autocompelte
│   │       ├── custom.phtml
│   │       └── page.phtml
├── registration.php
└── composer.json
```


## Overriding a template

For this example we're going to override the template named `page.phtml` used for _autocomplete_ feature. This template is used to display the CMS pages matching the query.

### Step 1: Create your new template

Copy the chosen template from original Algolia extension from `view/frontend/templates/autocomplete/page.phtml` to the same location in CustomAlgolia extension. You can now modify the new file according to your needs.

### Step 2: Let Magento know about it

Open up the configuration file `algolia_search_handle.xml` and add the following code block. It will tell Magento to use your new template.

```xml
<referenceBlock name="algolia.autocomplete.page" template="Algolia_CustomAlgolia::autocomplete/page.phtml" />
```

The important part here is that you reference the correct name of the template. The template name can be found in the original extension's layout file.

## Adding a new JavaScript file

Via the custom extension you can add a new JavaScript file to your store.
In this file you can define [custom methods](/magento/doc/m2/frontend-events/), which can be used to modify instant search or autocomplete functionality.

### Step 1: Create your new file

Create a new file `view/web/custom_js.js`. You can now modify the new file according to your needs.

### Step 2: Let Magento know about it

Open up the configuration file `algolia_search_handle.xml` and add the following code block:

```xml
<script src="Algolia_CustomAlgolia::hooks.js" />
```

to `<head>` section of the layout. It will register the new file.

<div class="alert alert-info">
    Adding a new JS file and using
    <a href="{{ site.baseurl }}/doc/m2/frontend-events/">the front-end custom events</a>
    is prefered way to modify the front-end functionality before overriding JS files.
</div>

## Overriding a JavaScript file

Overriding JavaScript works very much the same way as overriding a template.

In this example we're going to override the `autocomplete.js` file which implements the autocomplete menu feature. See the [Autocomplete customization](/magento/doc/m2/customize-autocomplete/) for further details.

### Step 1: Create your new file

Copy the original file `view/web/autocomplete.js` to the same location in CustomAlgolia extension. You can now modify the new file according to your needs.

### Step 2: Let Magento know about it

Open up the configuration file `algolia_search_handle.xml` and add the following code block

```xml
<remove src="Algolia_AlgoliaSearch::autocomplete.js" />
<script src="Algolia_CustomAlgolia::autocomplete.js" />
```

to `<head>` section of the layout. It will deregister the original file and register yours.

## Staying up to date

If you override a file, you won't get new bug fixes or features as you upgrade the extension. You should have a look at the [changelog of each release](https://github.com/algolia/algoliasearch-magento-2/releases) and see if there was anything to change in your custom file.
