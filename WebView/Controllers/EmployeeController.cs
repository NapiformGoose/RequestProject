using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RequestProject.BLL.Contracts;
using RequestProject.BLL.DTO;

namespace RequestProject.WebView.Controllers
{
    public class EmployeeController : Controller
    {
        private IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void Create([FromBody] EmployeeDTO employee)
        {
            _employeeService.Create(employee);
        }

        public EmployeeDTO Get(string id)
        {
            return _employeeService.Get(id);
        }

        public List<EmployeeDTO> ListAll()
        {
            return _employeeService.ListAll();
        }
        [HttpPost]
        public void Delete([FromBody] string[] ids)
        {
            _employeeService.Delete(ids);
        }
        [HttpPost]
        public void Edit([FromBody] EmployeeDTO employee)
        {
            _employeeService.Edit(employee);
        }
    }
}
