using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RequestProject.DAL.Models;

namespace RequestProject.DAL
{
    public class ApplicationContext : DbContext, IStorageContext
    {
        public DbContext Instance => this;

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<EmployeeRequest> EmployeeRequest { get; set; }
        public DbSet<ServiceRequest> ServiceRequest { get; set; }


        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeRequest>()
                .HasKey(bc => new { bc.EmployeeId, bc.RequestId });
            modelBuilder.Entity<EmployeeRequest>()
                .HasOne(bc => bc.Employee)
                .WithMany(b => b.Requests)
                .HasForeignKey(bc => bc.EmployeeId);
            modelBuilder.Entity<EmployeeRequest>()
                .HasOne(bc => bc.Request)
                .WithMany(c => c.Employees)
                .HasForeignKey(bc => bc.RequestId);

            modelBuilder.Entity<ServiceRequest>()
                .HasKey(bc => new { bc.ServiceId, bc.RequestId });
            modelBuilder.Entity<ServiceRequest>()
                .HasOne(bc => bc.Service)
                .WithMany(b => b.Requests)
                .HasForeignKey(bc => bc.ServiceId);
            modelBuilder.Entity<ServiceRequest>()
                .HasOne(bc => bc.Request)
                .WithMany(c => c.Services)
                .HasForeignKey(bc => bc.RequestId);
        } 
    }
}
