using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Contracts
{
    public interface IRequestService
    {
        public void Create(Request request);
        public Request Get(string id);
        public List<Request> ListAll();
        public void Delete(string id);
        public void Edit(Request request);
    }
}
