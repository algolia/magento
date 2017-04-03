---
layout: m1-documentation
title: How to customize the extension
permalink: /doc/m1/customize-extension/
---

Algolia is a powerful tool that opens the door to a variety of search features.
Although, you might want to customize your frontend integration or maybe extend the backend features. If you modify the files of the extension, you might get the result you want but all modifications will be lost every time you update the extension.

In this guide you'll learn how to create your own custom Magento module to customize your store the right way.

Before starting, please make sure you have the [Algolia extension](https://community.algolia.com/magento/) installed into your Magento Shop.


## Introducing CustomAlgolia extension

The best way to modify an extension is to override it. Overriding a template for instance, means that you do not modify the files shipped with the extension, but instead you tell Magento to use your file whenever it requires this specific template. This is achieved by creating a custom extension.

In order to avoid the boilerplate of creating custom extension we made one for you: [CustomAlgolia extension](https://github.com/algolia/algoliasearch-magento-extend-module-skeleton)

It ships with a few code examples to help you.


## Understanding the directory structure

To keep it simple, we'll use the same data structure of the Algolia extension.

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

Copy the wanted template `app/design/frontend/base/default/template/algoliasearch/autocomplete/page.phtml` to `app/design/frontend/base/default/template/customalgolia/autocomplete/page.phtml`. You can know modify the new files according to your needs.

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


## Overriding JavaScript

To get the result you want you might have to modify the JavaScript. Overriding JavaScript works very much the same way as overriding a template.

In this example we're going to override the `instantsearch.js` file which declares widget and configuration for the instant result page. See the [Instant search page customization](/doc/m1/customize-instantsearch/) for further details.

### Step 1: Create your new file

Copy the original file `js/algoliasearch/autocomplete.js` to `js/customalgolia/autocomplete.js`. You can know modify the new files according to your needs.

### Step 2: Let Magento know about it

Open up the configuration file `customalgolia.xml` and add the following code block. It will deregister the original file and register yours.

```xml
<layout>
    <algolia_search_handle>
        <reference name="head">

            <!-- [...] -->

            <action method="removeItem">
                <type>js</type>
                <name>algoliasearch/autocomplete.js</name>
            </action>

            <action method="addJs">
                <script>customalgolia/autocomplete.js</script>
            </action>

        </reference>
    </algolia_search_handle>
</layout>
```



## Staying up to date

Once you overridden a file, you won't get new bug fix or new feature added to the Algolia extension. You should have a look at the [changelog of each releases](https://github.com/algolia/algoliasearch-magento/releases) and see if there was anything to report to your custom file.
