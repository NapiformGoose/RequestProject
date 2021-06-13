using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RequestProject.BLL.DTO;

namespace RequestProject.BLL.Contracts
{
    public interface IEmployeeService
    {
        public void Create(EmployeeDTO employee);
        public EmployeeDTO Get(string id);
        public List<EmployeeDTO> ListAll();
        public void Delete(string[] ids);
        public void Edit(EmployeeDTO employee);
    }
}
