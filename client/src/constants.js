const prod = {  
    url: {
        BASE_URL: 'https://tylersernett.github.io/react-ecommerce',
        API_URL: 'https://myapp.herokuapp.com',
        //API_URL_USERS: 'https://myapp.herokuapp.com/users'
    }
};

const dev = { 
    url: {
        BASE_URL: 'http://localhost:2000',
        API_URL: 'http://localhost:1337',
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;