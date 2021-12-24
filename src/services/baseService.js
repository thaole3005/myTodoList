import Axios from 'axios';
import { DOMAIN_API } from '../util/settingSystem';


export class BaseService {

    get = (url) => {
        return Axios({
            url: `${DOMAIN_API}/${url}`,
            method: 'GET',
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN_API}/${url}`,
            method: 'DELETE',
           
        })
    }
    

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN_API}/${url}`,
            method: 'POST',
            data: model,
        })
    }

    
    put = (url) => {
        return Axios({
            url: `${DOMAIN_API}/${url}`,
            method: 'PUT',
        })
    }

}