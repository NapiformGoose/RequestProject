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
    public class EmployeeService : IEmployeeService
    {
        private IStorageContext _context;
        private DbSet<Employee> _dbSet;
        private IMapper _mapper;
        public EmployeeService(IStorageContext context, IMapper mapper)
        {
            _context = context;
            _dbSet = _context.Instance.Set<Employee>();
            _mapper = mapper;
        }

        public void Create(EmployeeDTO employee)
        {
            _dbSet.Add(_mapper.Map<Employee>(employee));
            _context.Instance.SaveChanges();
        }

        public void Delete(string[] ids)
        {
            var empList = new List<Employee>();
            foreach(var id in ids)
            {
                var employee = Get(id);
                empList.Add(_mapper.Map<Employee>(employee));
            }
            _dbSet.RemoveRange(empList);
            _context.Instance.SaveChanges();
        }

        public void Edit(EmployeeDTO employee)
        {
            _dbSet.Update(_mapper.Map<Employee>(employee));
            _context.Instance.SaveChanges();
        }

        public EmployeeDTO Get(string id)
        {
            var employee = _dbSet.FirstOrDefault(p => p.Id == id);
            return _mapper.Map<EmployeeDTO>(employee);
        }

        public List<EmployeeDTO> ListAll()
        {
            var employees = _dbSet.ToList();
            return _mapper.Map<List<Employee>, List<EmployeeDTO>>(employees);
        }
    }
}
