# Hey World as an API

Make a REST API out of the RSS feed for your [Hey World site](https://hey.com/world)

Clone this repository and deploy it to Netlify

Add your RSS Feed URL as an enivronment variable called `RSS_URL`. 

You can do this in the Netlify UI at 'Site settings -> Build & Deploy -> Environment'.

You can also use a `.env` file

There's a working version here:
<https://hey-world-api.netlify.app/.netlify/functions/fetch-feeds>

Data from the API returns in this format

```
{
    author: "the author's name",
    originalBlogURL: "the url to the blog on Hey World",
    originalFeedURL: "the url to the blog's RSS feed",
    lastUpdated: "the date the blog was last updated",
    posts: {
        id: "a unique id for each blogpost",
        title: "the blogpost title: either the email subject line or 'Untitled' if no subject line",
        published: "the date the blogpost was first published",
        lastUpdated: "the date the blogpost was last updated,
        originalURL: "the url to original blogpost on Hey World",
        content: "the blogpost content. Needs to be run through JSON.parse()"
    }
  }

```