# THE HOOD React eCommerce Store
An eCommerce storefront for Las Cruces, NM based The Hood, specializing in art, jewelry, & events.
## Notes: Redux

useSelector: grab a piece of state from the store

dispatch(reducer)

Formik: setActiveStep, setFieldValue

!!: when var could be string (or other value), and you want boolean

## Notes: Config file
switch between development and production vars programatically:
```js
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
```
---

## Notes: Material UI
use MUI Link, but still have basename of react-router-dom Link:
```js
import { Link as RouterLink } from 'react-router-dom';
...
<Link component={RouterLink} to={`/item/${item.id}`} color='white' underline="hover">
    {name}
</Link>
```

## NPM commands
server terminal: npm run develop
client terminal: npm start  ... npm run deploy
