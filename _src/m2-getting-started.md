---
layout: m2-documentation
title: Getting started
permalink: /doc/m2/getting-started/
redirect_from:
  - /m2/
  - /m2/documentation/
description: Learn how to get started with Algolia extension for Magento 2
---

## Create an Algolia account

1. Create your **[Algolia](https://www.algolia.com/?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs)** accout. The [sign-up wizard](https://www.algolia.com/users/sign_up?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs) will guide you through Algolia's onboarding process. Pay extra attention to choosing your Algolia datacenter. Select the one which is the closest to your datacenter.
2. Once you are logged into dashboard, get your Algolia credentials from the "Credentials" left-menu.

<figure>
    <img src="../../../img/signup.png" class="img-responsive" alt="Sign up form">
    <figcaption>Algolia's sign up form</figcaption>
</figure>

## Install the extension

There are two ways how to install the extension:

### 1) Composer

Install the extension via [Composer](https://getcomposer.org/):

```
$ composer require algolia/algoliasearch-magento-2
$ php bin/magento module:enable Algolia_AlgoliaSearch
$ php bin/magento setup:upgrade
$ php bin/magento setup:static-content:deploy
```

### 2) Magento Marketplace

Navigate to [Magento Marketplace](https://marketplace.magento.com/algolia-algoliasearch-magento-2.html) and get the extension. After that navigate to your Magento administration and install the extension by following [this awesome guide](https://www.fastcomet.com/tutorials/magento2/installing-extensions){:target="_blank"}.

## Configure Algolia credentials

When you have the extension installed, navigate to **Stores > Configuration > Algolia Search** administration panel.
There locate **Credentials & Setup** tab and configure your Algolia credentials:

<figure>
    <img src="../../../img/m2-configuration.png" class="img-responsive" alt="Configuration">
    <figcaption>Extension's basic information configurations</figcaption>
</figure>

## Initial indexing

Force the re-indexing of all sections you want to synchronize with Algolia. In your console run command:

```sh
$ php bin/magento indexer:reindex algolia_products algolia_categories algolia_pages algolia_suggestions algolia_additional_sections
```

This command will trigger reindexing on all your content.

**Congratulations!** You just installed Algolia extension to your Magento 2 store!