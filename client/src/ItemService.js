import axios from 'axios';
const URL = "http://localhost:4000/items";

class ItemService {

    getItems(){
        return axios.get(URL);
    }

    createItem(item){
        return axios.post(URL + '/create', item);
    }

    getItemById(itemId){
        return axios.get(URL + '/edit/' + itemId);
    }

    updateItem(item, itemId){
        return axios.put(URL + '/update/' + itemId, item);
    }

    deleteItem(itemId){
        return axios.delete(URL + '/delete/' + itemId);
    }
}

export default new ItemService()