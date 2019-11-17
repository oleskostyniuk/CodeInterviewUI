import Axios from 'axios';
import store from './index';

const axios = Axios.create({
  baseURL: 'http://localhost:3000'
});

const errorHandler = (error) => {

	if(error.response) {
		let message = error.response.data.message ? error.response.data.message : error.response.data;
		store.dispatch('addGlobalMessage', {text: message, type: 'error'});
	}

  return Promise.reject({ ...error })
}

const successHandler = (response) => {
	
  return response
}

axios.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

export default axios;