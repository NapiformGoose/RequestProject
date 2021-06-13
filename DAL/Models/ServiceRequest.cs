using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.DAL.Models
{
    public class ServiceRequest
    {
        public string RequestId { get; set; }
        public Request Request { get; set; }
        public string ServiceId { get; set; }
        public Service Service { get; set; }
    }
}
