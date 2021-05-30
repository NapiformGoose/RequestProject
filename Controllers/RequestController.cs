using Microsoft.AspNetCore.Mvc;
using RequestProject.Contracts;
using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Controllers
{
    public class RequestController : Controller
    {
        private IRequestService _requestService;
        private IServiceService _serviceService;
        private IEmployeeService _employeeService;
        public RequestController(IRequestService requestService, IServiceService serviceService, IEmployeeService employeeService)
        {
            _requestService = requestService;
            _serviceService = serviceService;
            _employeeService = employeeService;

        }
        [HttpPost]
        public void Create([FromBody] Request request)
        {
            _requestService.Create(request);
        }

        public Request Get(string id)
        {
            return _requestService.Get(id);
        }

        public List<Request> ListAll()
        {
            return _requestService.ListAll();
            //return new List<Request>
            //{
            //    new Request
            //    {
            //        Id = "1",
            //        Name = "firstRequest",
            //        Description = "sdfsdf",
            //        Address = "testAddres",
            //        RequestStatus = RequestStatus.Appointed,
            //        CreationDate = DateTime.Now,
            //        StartDate = DateTime.Now,
            //        СompletionDate = DateTime.Now,
            //        Services = _serviceService.ListAll(),
            //        Employees = _employeeService.ListAll()
            //    },
            //    new Request
            //    {
            //        Id = "2",
            //        Name = "secRequest",
            //        Description = "ddddd",
            //        Address = "testAddres2",
            //        RequestStatus = RequestStatus.Archived,
            //        CreationDate = DateTime.Now,
            //        StartDate = DateTime.Now,
            //        СompletionDate = DateTime.Now,
            //        Services = _serviceService.ListAll(),
            //        Employees = _employeeService.ListAll()
            //    }
            //};
        }

        public void Delete(string id)
        {
            _requestService.Delete(id);
        }
        [HttpPost]
        public void Edit([FromBody] Request request)
        {
            _requestService.Edit(request);
        }
    }
}
