# THE HOOD React eCommerce Store

Things learned about Redux:

useSelector: grab a piece of state from the store

dispatch(reducer)

Formik: setActiveStep, setFieldValue

!!: when var could be string (or other value), and you want boolean

using config:
switch between development and production vars:
```javascript
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
```
---

server terminal: npm run develop (strapi) develop
client terminal: npm start
