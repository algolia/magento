---
layout: m1-documentation
title: Personalization
permalink: /doc/m1/personalization/
---

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    Enterprise only feature - Personalization is accessible only for <a href="https://www.algolia.com/enterprise/">Algolia enterprise plans</a>
</div>

If you use [Algolia’s Enterprise plan](https://www.algolia.com/enterprise), the Magento extension allows you to personalize search results for your logged-in users.

## How it works

The extension comes with a "Personalization" indexer which assigns the IDs of your customers to the products which those customers bought in the past. And when your customer performs a search on your website, the products he’s bought before will be boosted.

Similarly, the extension can boost a whole category for a customer who’s bought enough products from the category.

For example, if a user has bought 5 products from a store’s "Phone" category, you can assume he’s interested in phones and the extension can boost all products from the category.

## Configuration

There are two configurable variables that impact Personalization:

<figure>
    <img src="../../../img/personalization_configuration.png" class="img-responsive">
    <figcaption>Personalization configuration</figcaption>
</figure>

<table class="table">
  <tr>
    <td>Minimum purchased items from category for boost</td>
    <td>This variable allows you to configure the minimum number of purchased products from a single category required in order to boost the whole category for the user.
If you want to disable the feature of boosting the whole category, you can set it to -1.</td>
  </tr>
  <tr>
    <td>But don’t boost more categories for a single user than ...</td>
    <td>In some occasions you might have customers who purchased a lot of products on your store. In that case you might end up by boosting the whole catalog for them, so in the end nothing would be boosted. To prevent that, use this setting to limit the maximum number of boosted categories for a single user. And if he bought more products for more categories, only his/her top categories (the ones from which he’s bought most items) will be boosted.</td>
  </tr>
</table>


## Reindexing

This feature comes with its dedicated Magento Indexer, which goes through all purchases from your registered users and assigns each user’s ID to the products they have bought or to products which belong to categories from which they made the most purchases.

The Personalization indexer needs to be triggered manually or set as a regular cron job. We recommend reindexing personalization data once a day. There are two ways to do that::

### Via the back office

In your Magento back office, navigate to **System > Index Management** and hit the **Reindex data** button right next to the Personalization indexer:

<figure>
    <img src="../../../img/personalization_indexer.png" class="img-responsive">
    <figcaption>Personalization indexer</figcaption>
</figure>

### Via command line

You can run the full reindex also from the command line and use the command, for example, in a cron job.

Command for the Personalization reindex:

```sh
php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_personalization
```

And if you want to set a cron for once per a day reindex:

```sh
1 * * * * php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_personalization
```

## Restrictions

The Personalization feature is available only for Algolia Enterprise plans. If you are on any other plan, the Personalization feature won’t work and may even break your search functionality when enabled.

Depending on your catalog size, customer base size and number of orders you generate, the Personalization reindex process might be very demanding on time and hardware resources. If you run into any issues with that, please contact your Solution Engineer at Algolia.

