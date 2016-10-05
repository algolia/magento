---
layout: m1-documentation
title: How to index data from outside of Magento
permalink: /doc/external-data/
---

To return the best results, Algolia uses all available information - information sent by users but also information about your products. This allows us to combine textual relevance (the input given by the end-user) and business relevance (the metrics you provide).

To send your business metrics to Algolia, you can define them in the Custom Ranking. You can put any type of numerical or boolean value that represents the popularity/importance of your records, for example.

In some cases, this data might be stored outside of Magento - Google Analytics visitor data, sales data in your ERP and other systems, for example. To be able to use this data in custom ranking you need to index them with your products in your products indices.

To index those data you will need to do a few steps and write some custom code.

## Enable Partial updates

First of all you need to go to your Magento administration, navigate to **System > Configuration > Algolia Search > Advanced tab** and there enable [Partial updates](https://www.algolia.com/doc/guides/indexing/import-synchronize-data#incremental-updates).
<figure>
    <img src="../../img/enable-partial-updates.png" class="img-responsive">
    <figcaption>Enable partial updates</figcaption>
</figure>

Enabling partial updates will allow you to index different attributes from different sources without overriding rest of record’s attributes.

## Push your data from outside of Magento

When you have have partial updates enabled, you need to write your own custom script to push your business data into Algolia indices. For pushing the data you can use our [PHP API client](https://www.algolia.com/doc/api-client/php/getting-started) or any other [API client](https://www.algolia.com/doc/api-client/) you are feeling comfortable with.

There are two essential things you need to have in mind while writing the script:

1. Update products by using [partialUpdates](https://www.algolia.com/doc/api-client/php/indexing#partial-update-objects) feature
2. Use the same objectID of the product as the extension does
ObjectID is the unique identifier of the record in Algolia index and the extension uses product’s ID as objectID.

For create the script you’ll need to find the name of the index where your products are indexed. Index name is created like: *indexPrefix+codeOfYourStore_products*. If you have your index prefix set to *magento_* and your store code is default then your index name will be **magento_default_products**. 

The precise index name you can find in [Algolia’s index explorer](https://www.algolia.com/explorer).

Let’s assume you have product with **ID 1** in index **magento_default_products** and you want to push it’s visits count from Google Analytics.

Then your code will look something like this:

```php
<?php

// Composer autoload
require __DIR__ . '/vendor/autoload.php';

$productId = 1;

$visitsCount = yourMethodToGetProductsVisitsCount($productId);

$client = new \AlgoliaSearch\Client("YOUR_APP_ID", "YOUR_API_KEY");
$index = $client->initIndex('magento_default_products');

$index->partialUpdateObject(
    [
        'objectID' => $productId,
        'visits'   => $visitsCount,
    ]
);

function yourMethodToGetProductsVisitsCount($productId) {
    // Get visits count for product by $productId
    
    return $visits;
}
```

That’s it. You successfully pushed your business data into your Algolia products index.

## Add your business attributes to custom ranking

When you managed to index your business attribute in Algolia, there is one last step ahead of you - set the attribute as custom ranking.

To do that go to your Magento administration and navigate to **System > Configuration > Algolia search > Products tab**. There you can locate *Ranking* settings.

Because your business attributes are indexed from outside of Magento, Magento cannot offer them in *Attribute* select box. What you need to do is to select **[use custom attribute]** option in the select box and the new text field will appear. In our case case we want to use attribute visits for custom ranking. So just write it’s name to the text field.
<figure>
    <img src="../../img/custom-ranking-custom-attributes.png" class="img-responsive">
    <figcaption>Set custom custom ranking attribute</figcaption>
</figure>


Now hit "Save Config" button and you are done!
