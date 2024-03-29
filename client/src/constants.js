const prod = {  
    url: {
        BASE_URL: 'https://tylersernett.github.io/react-ecommerce',
        API_URL: 'https://the-hood-backend-strapi-fly.fly.dev',
        IMG_URL: '',
        //API_URL_USERS: 'https://myapp.herokuapp.com/users'
    }
};

const dev = { 
    url: {
        BASE_URL: 'http://localhost:2000/react-ecommerce',
        API_URL: 'http://localhost:1337',
        IMG_URL: '',
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;