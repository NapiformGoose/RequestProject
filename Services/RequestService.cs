using Microsoft.EntityFrameworkCore;
using RequestProject.Contracts;
using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Services
{
    public class RequestService : IRequestService
    {
        private IStorageContext _context;
        private DbSet<Request> _dbSet;

        public RequestService(IStorageContext context)
        {
            _context = context;
            _dbSet = _context.Instance.Set<Request>();
        }

        public void Create(Request request)
        {
            _dbSet.Add(request);
            _context.Instance.SaveChanges();
        }

        public void Delete(string id)
        {
            _dbSet.Remove(Get(id));
            _context.Instance.SaveChanges();
        }

        public void Edit(Request request)
        {
            _dbSet.Update(request);
            _context.Instance.SaveChanges();
        }

        public Request Get(string id)
        {
            return _dbSet.FirstOrDefault(p => p.Id == id);
        }

        public List<Request> ListAll()
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
