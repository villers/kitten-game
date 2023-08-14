import {responseType} from "@/app/type/StatusType";
import axios from 'axios'
export const get = async() : Promise<responseType> => {
    const url : string = `${process.env.NEXT_PUBLIC_SERVER_URL}status`;
    const response = await axios.get(url);
    return response.data
}
