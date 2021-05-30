using Microsoft.EntityFrameworkCore;
using RequestProject.Contracts;
using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Services
{
    public class ServiceService : IServiceService
    {
        private IStorageContext _context;
        private DbSet<Service> _dbSet;

        public ServiceService(IStorageContext context)
        {
            _context = context;
            _dbSet = _context.Instance.Set<Service>();
        }

        public void Create(Service service)
        {
            _dbSet.Add(service);
            _context.Instance.SaveChanges();
        }

        public void Delete(string[] ids)
        {
            var serviceList = new List<Service>();
            foreach (var id in ids)
            {
                serviceList.Add(Get(id));
            }
            _dbSet.RemoveRange(serviceList);
            _context.Instance.SaveChanges();
        }

        public void Edit(Service service)
        {
            _dbSet.Update(service);
            _context.Instance.SaveChanges();
        }

        public Service Get(string id)
        {
            return _dbSet.FirstOrDefault(p => p.Id == id);
        }

        public List<Service> ListAll()
        {
            //var services = new List<Service>();
            //foreach (var s in _dbSet.ToList())
            //{
            //    services.Add(s);
            //}
            return _dbSet.ToList();
        }
    }
}
