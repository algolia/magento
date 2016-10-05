---
layout: m1-documentation
title: Getting started
permalink: /doc/m1/getting-started/
redirect_from:
  - /doc/
  - /doc/getting-started/
  - /documentation/
---

For getting started you can watch our video where we will show you how to setup our Magento extension:

<div style="text-align: center; margin-bottom: 30px;">
    <iframe width="640" height="480" src="https://www.youtube.com/embed/DUuv9ALS5cM?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

Or please follow those few steps to get started Algolia Search extension:

## Create an Algolia account

1. Create your **[Algolia](https://www.algolia.com/?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs)** accout. The [sign-up wizard](https://www.algolia.com/users/sign_up?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs) will guide you through Algolia's onboarding process. Pay extra attention to choosing your Algolia datacenter. Select the one which is the closest to your datacenter.
2. Once you are logged into dashboard, get your Algolia credentials from the "Credentials" left-menu.

<figure>
    <img src="../../../img/signup.png" class="img-responsive">
    <figcaption>Algolia's sign up form</figcaption>
</figure>

## Install the extension

1. Install the extension from the [Magento Commerce](http://www.magentocommerce.com/magento-connect/search-algolia-instant-search.html) or download it from [GitHub](https://github.com/algolia/algoliasearch-magento).
2. In your Magento administration navigate to **System > Configuration > Catalog > Algolia Search** administration panel.
3. In **Credentials & Setup** tab configure your Algolia credentials.

<figure>
    <img src="../../../img/configuration.png" class="img-responsive">
    <figcaption>Extension's basic information configurations</figcaption>
</figure>

## Initial indexing

Force the re-indexing of all sections you want to synchronize with Algolia. In your Magento administration navigate to **System > Index Management**. There hit **Reindex Data** button next to these indices:

- Algolia Search Products
- Algolia Search Categories
- Algolia Search Pages
- Algolia Search Suggestions

<figure>
    <img src="../../../img/indexers_new.png" class="img-responsive">
    <figcaption>Magento store's indexers</figcaption>
</figure>

**Congratulations!** You just installed Algolia extension to your Magento store!