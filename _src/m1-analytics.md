---
layout: m1-documentation
title: Analytics
permalink: /doc/m1/analytics/
---

The analytics feature of the extension is handled by the [Analytics widget](https://community.algolia.com/instantsearch.js/documentation/#analytics) of the [InstantSearch.js library](https://community.algolia.com/instantsearch.js/).

Currently this feature only works on the full instantsearch page (it doesn’t work on the autocomplete menu) and pushes all the searches performed by the user to analytics tools like Google Analytics.

## Configuration

The analytics feature has three configuration variables:

<figure>
    <img src="../../../img/analytics_settings.png" class="img-responsive" alt="Settings of analytics feature">
    <figcaption>Settings of analytics feature</figcaption>
</figure>

<table>
  <tr>
    <td>Delay (in milliseconds)</td>
    <td>When the search bar is used, each keystroke triggers a search in Algolia. It’s really good for an instantsearch and as-you-type search UX, but it’s not that good for analytics as it generates a lot of data and brings a lot of noise to the analytics. The delay variable defines how long the widget should wait between keystrokes before pushing data to analytics - only the last search will be pushed.</td>
  </tr>
  <tr>
    <td>Trigger the push function before the the delay on UI interaction </td>
    <td>If the user selects a search result even before the push was trigger (because of the delay variable), the push to analytics might never be called. With this parameter you can trigger a data push to analytics if the user interacts with the search results during the delay.</td>
  </tr>
  <tr>
    <td>Trigger the push function after the initial search</td>
    <td>Sometimes your customers come directly to the search page from a link, so a search is triggered automatically without any action from the user. At the same time, the load of the page triggers standard Google Analytics code to track the page view. By this parameter you can specify if you want to trigger a data push on this kind of search scenario.</td>
  </tr>
</table>

## Push function

The push function is called by the analytics widget every time the analytics data should be pushed to an analytics service (Google Analytics, KissMetrics, etc.).

By default the push function is defined to push data to Google Analytics when Google Analytics is enabled in Magento:

<figure>
    <img src="../../../img/magento_analytics.png" class="img-responsive" alt="Magento GA settings">
    <figcaption>Magento GA settings</figcaption>
</figure>

When you have enabled Google Analytics, each search is tracked as a Google Analytics pageView and the tracked URL is: `/catalogsearch/result/?q=[[search_term]]&[[selected_filters]]&numberOfHits=[[number_of_results]]`

If you’re interested in the code of the `pushFunction`, you can find it on [the GitHub](https://github.com/algolia/algoliasearch-magento/blob/develop/js/algoliasearch/instantsearch.js#L421-L434).

## Add new analytics service / custom push function

If you want to add another analytic service or push different data to Google Analytics, you’ll need to define your own custom push function.

You can do it by defining a variable `algoliaAnalyticsPushFunction` and assigning your customer function to this variable.

The function accepts 3 parameters - `formattedParameters`, `state`, `results` in which you can find all the data related to the last search and use it for your analytics.

For example:

{% highlight js %}
var algoliaAnalyticsPushFunction = function(formattedParameters, state, results) {
  // Google Analytics
  // window.ga('set', 'page', '/search/query/?query=' + state.query + '&' + formattedParameters + '&numberOfHits=' + results.nbHits);
  // window.ga('send', 'pageView');

  // GTM
  // dataLayer.push({'event': 'search', 'Search Query': state.query, 'Facet Parameters': formattedParameters, 'Number of Hits': results.nbHits});

  // Segment.io
  // analytics.page( '[SEGMENT] instantsearch', { path: '/instantsearch/?query=' + state.query + '&' + formattedParameters });
  
  // Kissmetrics
  // var objParams = JSON.parse('{"' + decodeURI(formattedParameters.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
  // var arrParams = $.map(objParams, function(value, index) {
  //   return [value];
  // });
  // _kmq.push(['record', '[KM] Viewed Result page', {
  //   'Query': state.query ,
  //   'Number of Hits': results.nbHits,
  //   'Search Params': arrParams
  // }]);

  // any other analytics service
}
{% endhighlight %}

That’s it. The widget will take care of calling your method in the right time according your configuration.


