import axios from 'axios';

export default class ServerConnection {
  static async connect(path) {
    let modifyPath = path;
    if (path.startsWith('/')) {
      modifyPath = path.slice(1);
    }
    const fullPath = `${process.env.API_ENDPOINT}/${modifyPath}`;

    return axios.get(fullPath);
  }
};
