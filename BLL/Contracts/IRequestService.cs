using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RequestProject.BLL.DTO;

namespace RequestProject.BLL.Contracts
{
    public interface IRequestService
    {
        public void Create(RequestDTO request);
        public RequestDTO Get(string id);
        public List<RequestDTO> ListAll();
        public void Delete(string[] ids);
        public void Edit(RequestDTO request);
    }
}
