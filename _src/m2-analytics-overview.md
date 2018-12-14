---
layout: m2-documentation
title: Analytics Overview
permalink: /doc/m2/analytics-overview/
description: Learn about the Analytics Overview page in the Algolia extension for Magento 2
---

The Analytics Overview feature requires the [Algolia Analytics API](https://www.algolia.com/doc/rest-api/analytics/) which is only accessible in our Business or Enterprise plans. Additionally, Click Analytics data is only available for our Business and Enterprise plans. You can still view your analytic data from the [Algolia Dashboard](https://www.algolia.com/analytics/overview/) or [upgrade your plan](https://www.algolia.com/billing/overview/) to view it from your Magento back-office. 

## Access

This feature can be accessed directly from the Magento 2 back-office main menu: 

**Stores > Algolia Search > Analytics Overview**
 

## Filtering your analytics

You can filter your analytic data by store view, index type, and date range. 

<div class="alert alert-info">
    <i class="fa fa-info-circle"></i>
    Your data is aggregated and can be filtered by the date range between your retention limit date to today.
</div>

Each plan has its own designated analytics retention period which is the date from today your data is preserved. To retain additional analytics longer, you will need to switch plans. For more information, please visit our [pricing page](https://www.algolia.com/billing/overview/) or contact [sales@algolia.com](sales@algolia.com). 

Index types are limited to:

- Products
- Categories
- Pages


## Understanding your analytics

**Total Searches:** How many searches were performed. As-you-type searches are aggregated (the queries i, ip, ipa, ipad count as one search).

**Users:** How many unique users performed a search.

**No results rate:** Percentage of searches that retrieved 0 results. A lower percentage is better.



### Click Analytics 

If Click Analytics is included in your plan and has been enabled in your Magento configuration **(Stores > Algolia Search > Credentials and Basic Setup > Click and Conversion Analytics > Enable Click Analytics)**, your Click Analytics data will be included in the overview. 


**CTR (Click Through Rate):** Percentage of tracked searches (searches with clickAnalytics=true) where at least one results was clicked on by the user.

**Conversion rate:** Percentage of tracked searches (searches with clickAnalytics=true) where you signaled to us that it led to a successful conversion. Settings to determine conversion can be found in your Magento Algolia Configuration for Click Analytics.

**Click position:** Average position of the clicks performed on the search results. A value of one would mean all users clicked on the first results. Smaller values are better.


### Daily Searches

This section will contain a graph of searches per day set by your date range. Hovering over a day will display a breakdown of stats in that day.


### Search Results

**Popular searches:** Searches performed the more often by your users.

**Popular results:** Results the most often displayed on the results list after a search.

**No results searches:** Searches that retrieved 0 results, either because a word didn't match, or because some filters excluded all of the matching results. A search with no results can often be optimized by improving keywords used in the dataset, or by adding synonyms.