require('dotenv').config()
const fetch = require('node-fetch')
const JSDOM = require('jsdom')
const he = require('he')

const RSS_URL = process.env.RSS_URL;

exports.handler = async function (event, context) {
    try {
        const data = await getFeedData()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 422,
            body: `Error: ${error}`
        }
    }
}

const getFeedData = async () => {
    const res = await fetch(RSS_URL)
    const feedData = await res.text()

    const parsedData = new JSDOM(feedData, { contentType: 'text/xml' }).window.document.documentElement

    const author = parsedData.querySelector('title').innerHTML

    const originalBlogURL = parsedData.querySelector('link[rel="alternate"]').getAttribute('href')

    const originalFeedURL = parsedData.querySelector('link[rel="self"]').getAttribute('href')

    const lastUpdated = new Date(parsedData.querySelector('updated').innerHTML)

    const posts = [...parsedData.querySelectorAll('entry')]

    const cleanedPosts = posts.map((post) => ({
        id: post.querySelector('id').innerHTML,
        title: post.querySelector('title').innerHTML || 'Untitled',
        published: new Date(post.querySelector('published').innerHTML),
        lastUpdated: new Date(post.querySelector('updated').innerHTML),
        originalURL: post.querySelector('link[rel="alternate"]').getAttribute('href'),
        content: JSON.stringify(he.decode(post.querySelector('content').innerHTML).replace(/\n/g, ''))
    }))

    return {
        author,
        originalBlogURL,
        originalFeedURL,
        lastUpdated,
        posts: cleanedPosts
    }
}
