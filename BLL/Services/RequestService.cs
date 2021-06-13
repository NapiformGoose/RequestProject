using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RequestProject.BLL.Contracts;
using RequestProject.BLL.DTO;
using RequestProject.DAL;
using RequestProject.DAL.Models;

namespace RequestProject.BLL.Services
{
    public class RequestService : IRequestService
    {
        private IStorageContext _context;
        private DbSet<Request> _dbSet;
        private DbSet<Employee> _employeeDbSet;
        private DbSet<Service> _serviceDbSet;
        private IMapper _mapper;

        public RequestService(IStorageContext context, IMapper mapper)
        {
            _context = context;
            _dbSet = _context.Instance.Set<Request>();
            _employeeDbSet = _context.Instance.Set<Employee>();
            _serviceDbSet = _context.Instance.Set<Service>();
            _mapper = mapper;
        }

        public void Create(RequestDTO request)
        {
            var employeeRequest = new List<EmployeeRequest>();
            var serviceRequest = new List<ServiceRequest>();

            foreach(var r in request.Employees)
            {
                var employee = _employeeDbSet.FirstOrDefault(p => p.Id == r.Id);
                employeeRequest.Add(new EmployeeRequest
                {
                    Employee = employee
                });
            }
            foreach (var s in request.Services)
            {
                var service = _serviceDbSet.FirstOrDefault(p => p.Id == s.Id);
                serviceRequest.Add(new ServiceRequest
                {
                    Service = service
                });
            }
            var newRequest = new Request
            {
                Name = request.Name,
                Description = request.Description,
                Address = request.Address,
                RequestStatus = request.RequestStatus,
                CreationDate = request.CreationDate,
                StartDate = request.StartDate,
                СompletionDate = request.СompletionDate,
                Employees = employeeRequest,
                Services = serviceRequest
            };


            _dbSet.Add(newRequest);
            _context.Instance.SaveChanges();
        }

        public void Delete(string[] ids)
        {
            var requestList = new List<Request>();
            foreach (var id in ids)
            {
                var request = Get(id);
                requestList.Add(_mapper.Map<Request>(request));
            }
            _dbSet.Remove(_mapper.Map<Request>(requestList));
            _context.Instance.SaveChanges();
        }

        public void Edit(RequestDTO request)
        {
            var employeeRequest = new List<EmployeeRequest>();
            var serviceRequest = new List<ServiceRequest>();

            var requestById = _dbSet
                .AsNoTracking() //todo заменить или почитать
                .Include(p => p.Employees)
                .ThenInclude(pt => pt.Employee)
                .FirstOrDefault(p => p.Id == request.Id);
            foreach (var r in request.Employees)
            {
                var employee = _employeeDbSet.FirstOrDefault(p => p.Id == r.Id);
                employeeRequest.Add(new EmployeeRequest
                {
                    Request = requestById,
                    RequestId = requestById.Id,
                    Employee = employee,
                    EmployeeId = employee.Id
                });
            }
            foreach (var s in request.Services)
            {
                var service = _serviceDbSet.FirstOrDefault(p => p.Id == s.Id);
                serviceRequest.Add(new ServiceRequest
                {
                    Request = requestById,
                    Service = service
                });
            }
            var newRequest = new Request
            {
                Id = request.Id,
                Name = request.Name,
                Description = request.Description,
                Address = request.Address,
                RequestStatus = request.RequestStatus,
                CreationDate = request.CreationDate,
                StartDate = request.StartDate,
                СompletionDate = request.СompletionDate,
                //Employees = employeeRequest,
                //Services = serviceRequest
            };

            _dbSet.Update(newRequest);
            _context.Instance.SaveChanges();
        }

        public RequestDTO Get(string id)
        {
            var req = _dbSet
                  .Include(e => e.Employees)
                      .ThenInclude(et => et.Employee)
                  .Include(e => e.Services)
                      .ThenInclude(pt => pt.Service)
                  .FirstOrDefault(e => e.Id == id);
            return _mapper.Map<RequestDTO>(req);
        }

        public List<RequestDTO> ListAll()
        {
            var req = _dbSet.Include(r => r.Employees)
                            .ThenInclude(e => e.Employee)
                            .Include(r => r.Services)
                            .ThenInclude(s => s.Service)
                            .ToList();
            var map = _mapper.Map<List<Request>, List<RequestDTO>>(req);
            return map;
        }
    }
}
