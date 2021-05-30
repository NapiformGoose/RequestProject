using Microsoft.AspNetCore.Mvc;
using RequestProject.Contracts;
using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Controllers
{
    public class ServiceController : Controller
    {
        private IServiceService _serviceService;
        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public void Create([FromBody] Service service)
        {
            _serviceService.Create(service);
        }

        public Service Get(string id)
        {
            return _serviceService.Get(id);
        }

        public List<Service> ListAll()
        {
            return _serviceService.ListAll();
        }

        public void Delete([FromBody] string[] ids)
        {
            _serviceService.Delete(ids);
        }

        public void Edit([FromBody] Service service)
        {
            _serviceService.Edit(service);
        }
    }
}
