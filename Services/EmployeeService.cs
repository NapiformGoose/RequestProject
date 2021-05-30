using Microsoft.EntityFrameworkCore;
using RequestProject.Contracts;
using RequestProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IStorageContext _context;
        private DbSet<Employee> _dbSet;

        public EmployeeService(IStorageContext context)
        {
            _context = context;
            _dbSet = _context.Instance.Set<Employee>();
        }

        public void Create(Employee employee)
        {
            _dbSet.Add(employee);
            _context.Instance.SaveChanges();
        }

        public void Delete(string[] ids)
        {
            var empList = new List<Employee>();
            foreach(var id in ids)
            {
                empList.Add(Get(id));
            }
            _dbSet.RemoveRange(empList);
            _context.Instance.SaveChanges();
        }

        public void Edit(Employee employee)
        {
            _dbSet.Update(employee);
            _context.Instance.SaveChanges();
        }

        public Employee Get(string id)
        {
            return _dbSet.FirstOrDefault(p => p.Id == id);
        }

        public List<Employee> ListAll()
        {
            //var emp = new List<Employee>();
            //for (int i = 1; i < 36; i++)
            //{
            //    emp.Add(new Employee { Id = i.ToString(), Name = "TestName" + i, Position = "TestPos" + i, Surname = "TestSurname" + i });
            //}
            //return emp;
            return _dbSet.ToList();
        }
    }
}
