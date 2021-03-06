---
layout: m1-documentation
title: How to customize the extension
permalink: /doc/m1/customize-extension/
description: Learn how to create a custom Magento extension to modify behaviour of Algolia extension for Magento
redirect_to: https://www.algolia.com/doc/integration/magento-1/guides/create-a-custom-extension/
---

Algolia is a powerful tool that opens the door to a variety of search features.
While you may want to customize your frontend integration or maybe extend the backend features, modifications to the extension files are lost every time you update the extension.

In this guide you'll learn how to create your own custom Magento module to customize your store the right way.

Before starting, please make sure you have the [Algolia extension](https://community.algolia.com/magento/) installed into your Magento Shop.



## Introducing CustomAlgolia extension

The best way to modify an extension is to override it. If you need to modify a template for instance, you don't modify it directly, but you create a new one and tell Magento to use your file instead of the original one. This new file will sit in a custom extension.

In order to avoid the boilerplate of creating a custom extension we made one for you: [CustomAlgolia extension](https://github.com/algolia/algoliasearch-magento-extend-module-skeleton)

It ships with a few code samples to help you.


## Understanding the directory structure

To keep it simple, we'll use the same data structure as seen in  the Algolia extension.

```
├── app
│   ├── code
│   │   └── local
│   │       └── Algolia
│   │           └── CustomAlgolia
│   │               ├── Model
│   │               │   └── Observer.php       <-- where you handle custom events
│   │               └── etc
│   │                   └── config.xml
│   ├── design
│   │   └── frontend
│   │       └── base
│   │           └── default
│   │               ├── layout
│   │               │   └── customalgolia.xml   <-- most important config file
│   │               └── template
│   │                   └── customalgolia       <-- where you override templates
│   │                       └── autocomplete
│   │                           └── page.phtml
│   └── etc
│       └── modules
│           └── Algolia_CustomAlgolia.xml
├── js
│   └── customalgolia                           <-- where you override JavaScript
│       └── autocomplete.js
├── skin
│   └── frontend
│       └── base
│           └── default
│               └── customalgolia
│                   └── customalgolia.css
```



## Overriding a template

For this example we're going to override the template named `page.phtml` used for _autocomplete_. This template is used to display the CMS pages matching the query.

### Step 1: Create your new template

Copy the chosen template `app/design/frontend/base/default/template/algoliasearch/autocomplete/page.phtml` to `app/design/frontend/base/default/template/customalgolia/autocomplete/page.phtml`. You can now modify the new file according to your needs.

### Step 2: Let Magento know about it

Open up the configuration file `customalgolia.xml` and add the following code block. It will tell Magento to use your new template whenever it requires the template named _"algolia-autocomplete-page"_.

```xml
<reference name="algolia-autocomplete-page">
    <action method="setTemplate">
        <template>customalgolia/autocomplete/page.phtml</template>
    </action>
</reference>
```

The important part here is that you reference the correct name of the template. The template name can be found in the extension configuration file. For our current example, we'll find this code block:

```xml
<block type="core/template" template="algoliasearch/autocomplete/page.phtml" name="algolia-autocomplete-page"/>
```

## Adding a new JavaScript file

Via the custom extension you can add a new JavaScript file to your store.
In this file you can define [custom methods](/magento/doc/m1/frontend-events/), which can be used to modify instant search or autocomplete functionality.

### Step 1: Create your new file

Create a new file `js/customalgolia/custom_js.js`. You can now modify the new file according to your needs.

### Step 2: Let Magento know about it

Open up the configuration file `customalgolia.xml` and add the following code block. It will register the new file.

```xml
<layout>
    <algolia_search_handle>
        <reference name="head">

            <!-- [...] -->

            <action method="addJs">
                <script>customalgolia/custom_js.js</script>
            </action>

        </reference>
    </algolia_search_handle>
</layout>
```
<div class="alert alert-info">
    Adding a new JS file and using
    <a href="{{ site.baseurl }}/doc/m1/frontend-events/">the front-end custom events</a>
    is prefered way to modify the front-end functionality before overriding JS files.
</div>

## Overriding a JavaScript file

Overriding JavaScript works very much the same way as overriding a template.

In this example we're going to override the `instantsearch.js` file which declares widgets and deals with the configuration of the instant results page. See the [Instant search page customization](/doc/m1/customize-instantsearch/) for further details.

### Step 1: Create your new file

Copy the original file `js/algoliasearch/instantsearch.js` to `js/customalgolia/instantsearch.js`. You can now modify the new file according to your needs.

### Step 2: Let Magento know about it

Open up the configuration file `customalgolia.xml` and add the following code block. It will deregister the original file and register yours.

```xml
<layout>
    <algolia_search_handle>
        <reference name="head">

            <!-- [...] -->

            <action method="removeItem">
                <type>js</type>
                <name>algoliasearch/instantsearch.js</name>
            </action>

            <action method="addJs">
                <script>customalgolia/instantsearch.js</script>
            </action>

        </reference>
    </algolia_search_handle>
</layout>
```



## Staying up to date

If you override a file, you won't get new bug fixes or features as you upgrade the extension. You should have a look at the [changelog of each release](https://github.com/algolia/algoliasearch-magento/releases) and see if there was anything to change in your custom file.
