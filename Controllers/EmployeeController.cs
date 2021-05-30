using Microsoft.AspNetCore.Mvc;
using RequestProject.Contracts;
using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Controllers
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
        public void Create([FromBody] Employee employee)
        {
            _employeeService.Create(employee);
        }

        public Employee Get(string id)
        {
            return _employeeService.Get(id);
        }

        public List<Employee> ListAll()
        {
            return _employeeService.ListAll();
        }
        [HttpPost]
        public void Delete([FromBody] string[] ids)
        {
            _employeeService.Delete(ids);
        }
        [HttpPost]
        public void Edit([FromBody] Employee employee)
        {
            _employeeService.Edit(employee);
        }
    }
}
