using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Contracts
{
    public interface IEmployeeService
    {
        public void Create(Employee employee);
        public Employee Get(string id);
        public List<Employee> ListAll();
        public void Delete(string[] ids);
        public void Edit(Employee employee);
    }
}
