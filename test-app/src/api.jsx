import axios from "axios";
import HTTPinstance from "./HTTPinstance";

const getlogin = () => {
    return HTTPinstance.post('/login');
  }

  const DataService = {
    getlogin,
}
export default DataService;