import axios from "axios";

export default class DirService {
  static async removeItem(itemName: string, path: string) {
    if (itemName) {
      const response = await axios.delete(
        `http://localhost:8000/delete?path=${path + itemName}`
      );
      return response;
    }
  }

  static async newFolder(folderName: string, path: string) {
    if (folderName) {
      const response = await axios.post(
        `http://localhost:8000/new?path=${path + folderName}`
      );
      return response;
    }
  }

  static async searchItems(itemName: string) {
    if (itemName) {
      const response = await axios.get(
        `http://localhost:8000/search?name=${itemName}`
      );
      return response;
    }
  }
}
