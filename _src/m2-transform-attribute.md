---
layout: m2-documentation
title: How to index numeric variation of string attribute
permalink: /doc/m2/transform-attribute/
description: Learn how to index numeric variation to a string attribute
redirect_to: https://www.algolia.com/doc/integration/magento-2/guides/transform-indexed-attribute/
---

In some situations you want to index a numeric variation of a string attribute. For example for a sorting purposes.

To do that you'll need to write a listener method to a [backend custom hook](/doc/m2/backend/) to add a new attribute, which will contain the numeric value.

<div class="alert alert-info">
    The following tutorial assumes that you already have learned how to write a listener methods in
    <a href="{{ site.baseurl }}/doc/m2/customize-extension/">Create a custom extension tutorial</a>.
</div>

## Register observer

To index a new attribute you can use [`algolia_after_create_product_object` event](https://community.algolia.com/magento/doc/m2/backend/#algoliaaftercreateproductobject).

First of all, you need to register a new Observer in [`etc/events.xml` file](https://github.com/algolia/algoliasearch-custom-algolia-magento-2/blob/master/etc/events.xml):

```xml
<event name="algolia_after_create_product_object">
   <observer name="customalgolia_transform_attribute" instance="Algolia\CustomAlgolia\Observer\TransformAttribute" />
</event>
```

## Create observer

When the Observer is registered, you need to create the registered observer class in `Observer/TransformAttribute.php` file:

```php
<?php

namespace Algolia\CustomAlgolia\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class TransformAttribute implements ObserverInterface
{
    public function execute(Observer $observer)
    {
         $record = $observer->getData('custom_data');

         // $sizes = ['S', 'M', 'L'];
         $sizes = $record['sizes'];

         // S => 1, M => 2, L => 3
         $replacementNumbers = [1, 2, 3];

         $record['numeric_sizes'] = array_replace($sizes, $replacementNumbers);
    }
}
```

That’s it. You successfully wrote a listener which tranforms your string data to a numeric attribute.

Now reindex your data and you are done!
