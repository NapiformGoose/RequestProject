import AjaxEmpolyeeService from './AjaxEmployeeService';
import AjaxServiceService from './AjaxServiceService';
import AjaxRequestService from './AjaxRequestService';

export class AjaxService {
    static Employee = AjaxEmpolyeeService;
    static Service = AjaxServiceService;
    static Request = AjaxRequestService;
}

export default AjaxService;