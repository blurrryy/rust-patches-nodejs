## Rust (Sandbox-Games) Patch-Notes Crawler for Nodejs

Using my python rust patch-notes-crawler (requests, pymongo, bs4 required) and implement it into nodejs.

See app.js for an example.

The library checks for updates using python, updates the mongodb, stores the latest version and returns the latest patch-notes (if there are any)...

You can also get all new patches or only check for a new patch in the db without recrawling the site.

