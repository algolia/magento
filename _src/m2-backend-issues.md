---
layout: m2-documentation
title: Backend issues
permalink: /doc/m2/backend-issues/
description: Technical troubleshooting - Backend issues
---

## Make sure that the extension is up-to-date ##

It can happen that you’re facing a known issue that has already been fixed. Unfortunately, if your extension is not up-to-date, you can’t know it. 

Keeping your extension updated is a very good way to avoid that. Not only you will get all the available fixes but also the latest features provided by the Algolia team.

To be sure you have the latest released version, check the extension's [Github repository](https://github.com/algolia/algoliasearch-magento-2/releases).

And then you can compare the latest released version with the version of your **etc/module.xml file**: 

<figure>
    <img src="../../../img/troubleshooting/01-module-version.png" class="img-responsive" alt="Module version">    
    <figcaption>Module version in module.xml file</figcaption>
</figure>


Or if you prefer, you can also check the used API Clients directly on your [Algolia dashboard](https://www.algolia.com/dashboard). You can find them in **Monitoring > Operations > API Client**: 

<figure>
    <img src="../../../img/troubleshooting/02-version-dashboard.png" class="img-responsive" alt="version dashboard">    
    <figcaption>Module version in the dashboard (up to date)</figcaption>
</figure>

If a new version is available, it will be displayed next to currently used version (e.g. Magento2 1.8.2):

<figure>
    <img src="../../../img/troubleshooting/03-version-update.png" class="img-responsive" alt="version update">    
    <figcaption>Module version in the dashboard (to be updated)</figcaption>
</figure>

<div class="alert alert-info">
    <i class="fa fa-info-circle"></i>
    If you need to update your extension, please refer to the <a target="_blank" href="/magento/doc/m2/upgrade/"><b>Upgrade to new version</b></a> guide.
</div>

## Understand how your Magento configuration determines the number of indices to create ##

The first thing you need to do when installing the extension is to enter your credentials in the configuration.

<figure>
    <img src="../../../img/troubleshooting/04-credentials.png" class="img-responsive" alt="credentials">    
    <figcaption>Stores > Credentials & Basic Setup</figcaption>
</figure>

Once you save this configuration, if the credentials are correct, the extension will create instantly the needed indices in your Algolia application (those indices will be filled during the indexing afterwards). You can check the indices in your [Algolia dashboard](https://www.algolia.com/dashboard).

By default, the Algolia extension creates 3 different replicas for each product index. Those replicas are directly related to the sorting configuration in the InstantSearch section.

<figure>
    <img src="../../../img/troubleshooting/25-sortings.png" class="img-responsive" alt="sortings">   
    <figcaption>Default sortings</figcaption>
</figure>

Adding or removing sortings impacts directly the number of created replicas. If you want to read more about it, you can have a look at the [related FAQ](/magento/faq/#how-many-records-does-the-magento-extension-create) entry. 

Keeping an eye on the Algolia dashboard is very useful, it allows you to make sure that you get the expected number of created indices. 

The indices created this way depend on the extension configuration about products, categories and additional sections. Their name is directly related to the defined **index name prefix** in Algolia configuration in Magento.

<figure>
    <img src="../../../img/troubleshooting/05-prefix.png" class="img-responsive" alt="Prefix"> 
</figure>

You are using Algolia extension on your live website, but you’ll probably have to use it on a staging or dev environment too. Defining meaningful prefixes to immediately identify which index belongs to which environment is a very good practice (“prod_magento_”, “staging_magento_”, “dev_magento_”, etc … ). 

Mastering your Magento / Algolia configuration and knowing how many environments you’re using should be enough to anticipate the number of indices that would be created in your Algolia application. **It’s the first step for a successful indexing**. Don’t hesitate to check this number on [the indices list](https://www.algolia.com/explorer/indices) of your Algolia dashboard. If it’s not correct, that’s probably because you missed something regarding the configuration in Magento.

<figure>
    <img src="../../../img/troubleshooting/06-indices.png" class="img-responsive" alt="Indices"> 
    <figcaption>Indices list in your Algolia dashboard</figcaption>
</figure>

Here are some examples of Magento configuration that can lead to an unexpected number of created indices:

- **You set a different configuration on a store view or website level**. Magento natively allows its users to define both default configuration and configuration related to a particular store view or a particular website. Some of the Algolia configuration directives are configurable this way. For example, if you have 2 websites, you can decide to use different sortings on both of them, that will end on a different number of created indices for these 2 websites. This kind of specific configuration is easy to forget (especially when there’s more than 1 administrator) as Magento only displays the default configuration when you reach the page. **Switching from a website / store view configuration to another thanks to the dropdown situated on the top-left corner of the page can be useful to make sure that no unwanted configuration was set**.

<figure>
    <img src="../../../img/troubleshooting/07-store-switcher.png" class="img-responsive" alt="Store switcher"> 
    <figcaption>Store switcher</figcaption>
</figure>

- **Configuration on your “All Stores” page** (Stores > Settings > All Stores). This page lists [all the websites / stores / store views that your Magento is managing](https://devdocs.magento.com/guides/v2.2/config-guide/multi-site/ms_websites.html):
**Keep in mind that the Algolia extension will create a whole set of indices for every active store view.** If you have a multilingual website, this number can increase very easily.

<figure>
    <img src="../../../img/troubleshooting/08-all-stores.png" class="img-responsive" alt="all stores">
    <figcaption>All stores page</figcaption>
</figure>

- **Configuration regarding customer groups**. You decided to enable the management of customer groups in the “advanced” configuration of the extension. Now it will create a whole set of indices for every customer group in Magento **(Customers > Customer Groups)**. By default, Magento creates 4 customer groups (General, Not logged in, Retailer and Wholesale) but you may use third-party extensions that create their own customer groups. Those extensions can create hundreds of them, so be very careful before enabling customer group management in the extension’s configuration, and check the customer groups page.

<figure>
    <img src="../../../img/troubleshooting/09-customer-groups.png" class="img-responsive" alt="Customer groups">
    <figcaption>Customer groups page</figcaption>
</figure>

## Understand why my data updates are not propagated to the Algolia dashboard ##

When your data doesn’t seem to be pushed to Algolia, it can be for 3 reasons:

- There’s an error during the process. ([see the dedicated chapter below](#investigate-the-logs-to-find-if-theres-an-error))
- If the indexing queue is activated: the indexing became asynchronous and the issue should be related to the queue processing. ([see the dedicated chapter below](#figure-out-why-your-queue-may-be-stuck))
- The product/category has a particular status that prevents it from being indexed.

Let’s have a closer look at the third reason which is the easiest one to investigate. 

<div class="alert alert-info">
    <i class="fa fa-info-circle"></i>
    The reasons for a product or a category not to be indexed are listed in the <a href="/magento/doc/m2/indexing/">indexing documentation</a>. 
</div>

First thing you can do is go into your Magento back-office, then on a product / category page and just save it without updating any values. The save event should trigger an automatic reindexing of this particular product / category to the Algolia servers (turn off the indexing queue before if needed).

There are now two interesting things to check on your **Algolia dashboard**:

- In Monitoring > tab “Logs”  you have the **“Latest operations” panel**. Reindexing a product triggers a POST request that should appear on top of the list with an url which looks like this : /1/indexes/[INDEX_NAME]/batch. 

<figure>
    <img src="../../../img/troubleshooting/10-operations.png" class="img-responsive" alt="Operations">
    <figcaption>Latest operations</figcaption>
</figure>

By clicking on the link, you see all the details related to this request. Check on the “**Request body**” tab, you should see “AddObject” as action with all the entity attributes. Seeing this ensures that the product / category save in Magento was correctly propagated to Algolia.

<figure>
    <img src="../../../img/troubleshooting/11-request-body.png" class="img-responsive" alt="Request body">
    <figcaption>Request body</figcaption>
</figure>

- To make sure that the record related to your product / category was updated, you can go on its index on your dashboard and search for it. Have a look at the record’s attributes and search for  “**AlgoliaLastUpdateCET**”. This attributes contains the last date and time when the record was updated. 
<div class="alert alert-info">
    <i class="fa fa-info-circle"></i>
    Note: The time is in Central European Time.
</div>

<figure>
    <img src="../../../img/troubleshooting/12-last-update-attribute.png" class="img-responsive" alt="Last update attribute">
    <figcaption>Time of the last update</figcaption>
</figure>

For some reason, it can happen that your product has been updated in your Algolia dashboard but not with the values you expected. It may be because your product/category has **specific store view/website values** in Magento. The Algolia extension respects this native configuration and indexes the specific values instead the default ones. To check that, you can use the store switch on the top-left corner of the page.

<figure>
    <img src="../../../img/troubleshooting/13-product-store-switcher.png" class="img-responsive" alt="Product store switcher">
    <figcaption>Product page store switcher (on top-left corner)</figcaption>
</figure>

What if your product data is not propagated to the Algolia servers (No query on the “Latest operations” panel and attribute “AlgoliaLastUpdateCET” not being updated)? 

In this case, you should use the [SKU reindexing form](/magento/doc/m2/sku-reindexing-form/). It will give you the reason why the product is not indexed.

Each time a product or a category is saved in a proper Magento way, the save event automatically triggers a reindex to Algolia. But if you use a third-party extension or a custom script to manage your catalog that doesn’t trigger the standard Magento  behaviour (e.g. writes the changes directly to Magento’s database and bypassing the event system), the reindexing of those entities will not happen. 

The Algolia extension relies on the [Magento’s plugin system](https://devdocs.magento.com/guides/v2.2/extension-dev-guide/plugins.html) and adds its custom logic on those 5 classes: 

- Magento\Catalog\Model\ResourceModel\Product
- Magento\Catalog\Model\Product\Action
- Magento\CatalogInventory\Model\ResourceModel\Stock\Item
- Magento\Catalog\Model\ResourceModel\Category
- Magento\Catalog\Model\Category\Action

<div class="alert alert-warning">
     <i class="fa fa-exclamation-triangle"></i>
     You have to make sure that your third-party extension or your custom script uses those classes and their save/delete methods for the entity (product / category / ...) to be automatically reindexed.
</div>

## Investigate the logs to find if there’s an error ##
First thing to do is to figure out if your indexing process **generates errors** or not. As the process can be asynchronous if the indexing queue is enabled, errors can occur without you being aware of it.

During the asynchronous reindexing process, the extension creates **temporary indices** suffixed by “_tmp” (for example, if your main product index is “magento_products_default”, the extension creates the temporary index “magento_products_default_tmp”). These indices are filled with the indexed records and replace the real (live) indices at the end of the process before being deleted.  

<div class="alert alert-info">
    <i class="fa fa-info-circle"></i>
    The temporary indices are created to make the <a target="_blank" href="https://www.algolia.com/doc/tutorials/indexing/synchronization/atomic-reindexing/">reindexing atomic</a>. The other reason is that with temporary indices, the extension doesn't have to delete products from live indices during full reindexing. Only "live" products are indexed to temporary indices and then the production index is replaced at the end of the process and only "live" products will be searchable.
</div>

That also means that if an error occurs, the process does not end, and the temporary index is not deleted. **It is something you can use to check if you got errors during your indexing process**. Check the list of your indices in the dashboard, and if you see indices suffixed by “_tmp” in it which haven’t been updated for a long time (10 or more minutes, depending on how often the queue runner is scheduled to run.), this probably means that you have errors.

By default, each error happening in Magento is logged in the files situated in [MAGENTO_PATH]/var/log : 

- system.log
- exception.log

If you want to be sure that the latest errors you see on those files are related to the indexing, you can monitor them during the process.

```sh
tail -f var/log/system.log var/log/exception.log
```

Monitoring these logs will give you the exact error that occured. If you know the error, you'll be much likely to localise the source of the issue and see what is going on in Magento.

The extension has an option to activate **additional logs** during the process (in Stores > Algolia Search > Credentials and Basic Setup > Enable logging) that could be really useful to help you debugging the issue.

In addition to the Magento logs, you can also monitor the **“latest operations” panel** in your [Algolia dashboard](https://algolia.com/dashboard) ([In Monitoring > tab “Logs”](https://www.algolia.com/monitoring/logs)). You can monitor what API calls the extension executes on Algolia.


## Figure out why your queue may be stuck ##

You activated the indexing queue in the extension, now your indexing is asynchronous, but for some reason, your data doesn’t seem to be updated. In such case, **you need to verify if your indexing queue is not stuck**.

The indexing queue process relies on one of the Magento indexer added by the Algolia’s extension: **algolia_queue_runner**.

To know more about Magento indexers, you can read [this official guide](https://devdocs.magento.com/guides/v2.2/extension-dev-guide/indexing.html).

First thing you need to check is if the indexer is “**ready**”. You can do that with a command:

```sh
php bin/magento indexer:status algolia_queue_runner
```

If the status is “**processing**” and it seems to be stuck on this status since a long time, you’ll probably have to reset it:

```sh
php bin/magento indexer:reset algolia_queue_runner
```

The version 1.8 of the extension introduced a new feature to help you understand the indexing queue. You can find it in **Stores > Algolia Search > Indexing Queue**. This feature is a grid that displays to the user the contents of the indexing queue. Thanks to this, you can monitor how many jobs the indexing queue contains. 

<figure>
    <img src="../../../img/troubleshooting/15-indexing-page.png" class="img-responsive" alt="Indexing queue page">
    <figcaption>Indexing queue page</figcaption>
</figure>

On top of the page, you’ll see **recommendations** that will help you to configure and optimize your indexing queue the best way possible. Thanks to this, you can also monitor the status of the indexer and the last time it was run. 

In addition to these advices, you can also find the details of each job by clicking on the link “view” on the right column. If the job has encountered an error, this error is logged in the “**Error Log**” attribute.

<figure>
    <img src="../../../img/troubleshooting/16-job-detail.png" class="img-responsive" alt="Job details">
</figure>

If everything looks fine, you can just monitor this page by checking regularly the number of jobs in the grid. If the queue is working, **this number should decrease every 5 minutes**. If not, this probably means that the [processing cron](/magento/doc/m2/indexing-queue/#processing-the-queue) is not set up properly. Keep in mind that you can still monitor the calls to the Algolia API on your dashboard (in the “Monitoring” section). 

Finally, when a failing job reaches its maximum retries number without having being processed, since version 1.8, it is archived in the **algoliasearch_queue_archive** table in the database (with its latest encountered error logged). This can be another useful piece of information to help you to debug.

