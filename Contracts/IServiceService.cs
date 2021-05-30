using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Contracts
{
    public interface IServiceService
    {
        public void Create(Service service);
        public Service Get(string id);
        public List<Service> ListAll();
        public void Delete(string[] ids);
        public void Edit(Service service);
    }
}
