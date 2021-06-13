import { baseUrl, services, methods } from '../meta';

export class AjaxEmpolyeeService {
    static async Create (parameters = {}) {
        const url = `${baseUrl}${services.employee}/${methods.create}`;
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(parameters), 
            headers: {
              'Content-Type': 'application/json'
            }
          });
        if(res.ok) {
            return await res.json();
        } else {
            throw new Error(`Error fetching. URL: ${url}`);
        }
    }

    static async Edit (parameters = {}) {
        const url = `${baseUrl}${services.employee}/${methods.edit}`;
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(parameters), 
            headers: {
              'Content-Type': 'application/json'
            }
          });
        if(res.ok) {
            return await res.json();
        } else {
            throw new Error(`Error fetching. URL: ${url}`);
        }
    }

    static async Get (parameters = {}) { //todo Заменить на id?
        const url = `${baseUrl}${services.employee}/${methods.get}/${parameters}`;
        const res = await fetch(url);
        if(res.ok) {
            return await res.json();
        } else {
            throw new Error(`Error fetching. URL: ${url}`);
        }
    }

    static async Delete (parameters = {}) {
        const url = `${baseUrl}${services.employee}/${methods.delete}`;
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(parameters), 
            headers: {
              'Content-Type': 'application/json'
            }
          });
        if(res.ok) {
            return await res.json();
        } else {
            throw new Error(`Error fetching. URL: ${url}`);
        }
    }

    static async ListAll (parameters = {}) {
        const url = `${baseUrl}${services.employee}/${methods.listAll}`;
        const res = await fetch(url);
        if(res.ok) {
            return await res.json();
        } else {
            throw new Error(`Error fetching. URL: ${url}`);
        }
    }
}

export default AjaxEmpolyeeService;