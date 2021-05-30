using Microsoft.EntityFrameworkCore;
using RequestProject.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Models
{
    public class ApplicationContext : DbContext, IStorageContext
    {
        public DbContext Instance => this;

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Request> Requests { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
