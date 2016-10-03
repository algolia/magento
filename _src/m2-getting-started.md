---
layout: m2-documentation
title: Getting started
permalink: /m2/getting-started/
redirect_from:
  - /m2/
---

## Create an Algolia account

1. Create your **[Algolia](https://www.algolia.com/?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs)** accout. The [sign-up wizard](https://www.algolia.com/users/sign_up?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs) will guide you through Algolia's onboarding process. Pay extra attention to choosing your Algolia datacenter. Select the one which is the closest to your datacenter.
2. Once you are logged into dashboard, get your Algolia credentials from the "Credentials" left-menu.

<figure>
    <img src="../../img/signup.png" class="img-responsive">
    <figcaption>Algolia's sign up form</figcaption>
</figure>

## Install the extension

1. Install the extension from the [Magento Marketplace](https://marketplace.magento.com/algolia-algoliasearch-magento-2.html) or via [Composer](https://getcomposer.org):
```
$ composer require algolia/algoliasearch-magento-2
```
2. In your Magento administration navigate to **Stores > Configuration > Algolia Search** administration panel.
3. In **Credentials & Setup** tab configure your Algolia credentials.

<figure>
    <img src="../../img/m2-configuration.png" class="img-responsive">
    <figcaption>Extension's basic information configurations</figcaption>
</figure>

## Initial indexing

Force the re-indexing of all sections you want to synchronize with Algolia. In your console run command: 

```sh
$ bin/magento indexer:reindex algolia_products algolia_categories algolia_pages algolia_suggestions algolia_additional_sections
```

This command will trigger reindexing on all your content.

**Congratulations!** You just installed Algolia extension to your Magento 2 store!