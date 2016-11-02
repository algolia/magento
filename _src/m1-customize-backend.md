---
layout: m1-documentation
title: How to customize backend by using extension's events
permalink: /doc/m1/customize-backend/
---

Algolia is a powerful tool that opens the door to a variety of search features. Some of these features are for specific use cases and it would not be practical to implement them all directly in the extension. For this reason, the extension offers a series of hooks that you can use to take advantage of many extra things that Algolia offers.

In this guide you’ll learn how to create your own custom Magento module and attach hooks to the events fired by the Algolia extension. It should only take a few minutes. Let’s get started!

## Create the module’s base XML file

<!-- 
<div class="alert alert-info">
    <i>
    Tip: if you don’t want to create the extension from scratch, you can download it from our <a href="https://github.com/algolia/algoliasearch-magento-extend-module-skeleton" target="_blank">GitHub repository</a> and install it manually or via Modman.
    </i>
</div>
-->

Before starting this guide, please make sure you have the [Algolia extension](https://community.algolia.com/magento/) installed into your Magento Shop.

The first step when creating a new module is to create an XML configuration file, which will contain basic information such as its name, code pool, and whether the module is active.

We’ll name our new module **Algolia_CustomAlgolia**. Create a file called **Algolia_CustomAlgolia.xml** in your `app/etc/modules/` Magento directory and add this following configuration to the file:

```xml
<?xml version="1.0"?>
<config>
    <modules>
        <Algolia_CustomAlgolia>
            <active>true</active>
            <codePool>local</codePool>
        </Algolia_CustomAlgolia>
    </modules>
</config>
```

Now let’s create the module itself.

## Create the module’s file structure

Create this folder structure:

```
app/
    code/
        local/
            Algolia/
                CustomAlgolia/
                    etc/
                    Model/
```

Next, create a **config.xml** file in the `/app/code/local/Algolia/CustomAlgolia/etc/` directory.

Add this snippet to the **config.xml** file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <modules>
        <Algolia_CustomAlgolia>
            <version>0.1.0</version>
        </Algolia_CustomAlgolia>
    </modules>
</config>
```

Now that the basic structure is done, let’s create the hook methods.

## Create the Observer and hook methods

For our first example, let’s say you want to change the settings the extension sends to Algolia every time the configuration changes. The name of this event is **algolia_index_settings_prepare**.

To hook into this event, first we need to create a file called Observer.php in the `app/code/local/Algolia/CustomAlgolia/Model/` directory. Then we need to add this content:

```php
<?php

class Algolia_CustomAlgolia_Model_Observer
{
    public function updateSettings($observer)
    {
        $settings = $observer->getIndexSettings();
        
        /*
        Here you can update / add / remove different Algolia settings
        
        See what settings you can use here: 
        https://www.algolia.com/doc/api-client/php/settings#index-settings-parameters
        */
    }
}
```

This method, updateSettings, will be called every time the event is triggered.

There’s just one more thing we need to do. Add this snippet to the **config.xml** we were working with before, inside the `<config>` node:

```xml
<global>
    <events>
        <algolia_index_settings_prepare>
            <observers>
                <algolia_customalgolia>
                    <class>algolia_customalgolia/observer</class>
                    <method>updateSettings</method>
                </algolia_customalgolia>
            </observers>
        </algolia_index_settings_prepare>
    </events>
</global>
```

These lines tell Magento which method should be called on which event.

In the same way, we can attach more hooks to different events. The complete list the events that are triggered by the extension is here: [https://community.algolia.com/magento/doc/m1/backend/#custom-events](https://community.algolia.com/magento/doc/m1/backend/#custom-events)

In the end your **config.xml** file should look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <modules>
        <Honza_CustomAlgolia>
            <version>0.1.0</version>
        </Honza_CustomAlgolia>
    </modules>
    <global>
        <events>
            <algolia_index_settings_prepare>
                <observers>
                    <algolia_customalgolia>
                        <class>algolia_customalgolia/observer</class>
                        <method>updateSettings</method>
                    </algolia_customalgolia>
                </observers>
            </algolia_index_settings_prepare>
        </events>
    </global>
</config>
```

You’ve now written your own module and added more power and flexibility to your Algolia Magento integration. High five!

If anything in this guide wasn’t clear, or you found a typo, please [open an issue on GitHub](https://github.com/algolia/magento/issues/new) or send us an email at [support+magento@algolia.com](mailto:support+magento@algolia.com). 

We’d be happy to hear from you!

