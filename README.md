# Anime-api-scraper
anime-api-scraper is a library for getting anime data from inuNime.
![](https://s1.zerochan.net/Sousou.no.Frieren.600.3396169.jpg)
## Installation

Use the package manager ```npm``` or ```yarn``` to install foobar.

```bash
npm install github:xct007/anime-api-scraper
```

## Usage

```js
// CommonJS can use require
import inunime from "anime-api-scraper"
import { latest, search, detail } from "anime-api-scraper"


// get latest ongoing anime
inunime.latest().then((json) => {
   console.log(json) // see results
})

// search anime by query
const query = "pico"
search(query).then((json) => {
   console.log(json) // see results
})

// get detail anime, eg. download url, etc.
// make sure this is real id, channel_id or category_id
// from results before
const id = 1234 // "1234"
detail(id).then((json) => {
   console.log(json)
})
```

## Contributing

Pull requests are always welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
