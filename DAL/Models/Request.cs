using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.DAL.Models
{
    public class Request
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

        public List<EmployeeRequest> Employees { get; set; }
        public List<ServiceRequest> Services { get; set; }
    }

    public enum RequestStatus
    {
        Pending,
        Appointed,
        Performed,
        Completed,
        Archived
    }
}
