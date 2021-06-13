using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RequestProject.BLL.DTO;

namespace RequestProject.BLL.Contracts
{
    public interface IServiceService
    {
        public void Create(ServiceDTO service);
        public ServiceDTO Get(string id);
        public List<ServiceDTO> ListAll();
        public void Delete(string[] ids);
        public void Edit(ServiceDTO service);
    }
}
