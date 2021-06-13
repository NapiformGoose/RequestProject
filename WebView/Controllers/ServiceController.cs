using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RequestProject.BLL.Contracts;
using RequestProject.BLL.DTO;

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

        public void Create([FromBody] ServiceDTO service)
        {
            _serviceService.Create(service);
        }

        public ServiceDTO Get(string id)
        {
            return _serviceService.Get(id);
        }

        public List<ServiceDTO> ListAll()
        {
            return _serviceService.ListAll();
        }

        public void Delete([FromBody] string[] ids)
        {
            _serviceService.Delete(ids);
        }

        public void Edit([FromBody] ServiceDTO service)
        {
            _serviceService.Edit(service);
        }
    }
}
