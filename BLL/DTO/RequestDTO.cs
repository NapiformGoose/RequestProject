using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using RequestProject.DAL.Models;

namespace RequestProject.BLL.DTO
{
    public class RequestDTO
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public RequestStatus RequestStatus { get; set; }

        public DateTime CreationDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime СompletionDate { get; set; }

        public List<EmployeeDTO> Employees { get; set; }
        public List<ServiceDTO> Services { get; set; }
    }
}
