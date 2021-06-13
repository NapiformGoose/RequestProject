using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RequestProject.BLL.Contracts;
using RequestProject.BLL.DTO;

namespace RequestProject.Controllers
{
    public class RequestController : Controller
    {
        private IRequestService _requestService;
        public RequestController(IRequestService requestService)
        {
            _requestService = requestService;

        }
        [HttpPost]
        public void Create([FromBody] RequestDTO request)
        {
            _requestService.Create(request);
        }

        public RequestDTO Get(string id)
        {
            return _requestService.Get(id);
        }

        public List<RequestDTO> ListAll()
        {
            return _requestService.ListAll();
        }

        public void Delete([FromBody] string[] ids)
        {
            _requestService.Delete(ids);
        }
        [HttpPost]
        public void Edit([FromBody] RequestDTO request)
        {
            _requestService.Edit(request);
        }
    }
}
