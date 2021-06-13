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
    public class ServiceService : IServiceService
    {
        private IStorageContext _context;
        private DbSet<Service> _dbSet;
        private IMapper _mapper;

        public ServiceService(IStorageContext context, IMapper mapper)
        {
            _context = context;
            _dbSet = _context.Instance.Set<Service>();
            _mapper = mapper;
        }

        public void Create(ServiceDTO service)
        {
            _dbSet.Add(_mapper.Map<Service>(service));
            _context.Instance.SaveChanges();
        }

        public void Delete(string[] ids)
        {
            var serviceList = new List<Service>();
            foreach (var id in ids)
            {
                var service = Get(id);
                serviceList.Add(_mapper.Map<Service>(service));
            }
            _dbSet.RemoveRange(serviceList);
            _context.Instance.SaveChanges();
        }

        public void Edit(ServiceDTO service)
        {
            _dbSet.Update(_mapper.Map<Service>(service));
            _context.Instance.SaveChanges();
        }

        public ServiceDTO Get(string id)
        {
            var service = _dbSet.FirstOrDefault(p => p.Id == id);
            return _mapper.Map<ServiceDTO>(service);
        }

        public List<ServiceDTO> ListAll()
        {
            var services = _dbSet.ToList();
            return _mapper.Map<List<Service>, List<ServiceDTO>>(services);
        }
    }
}
