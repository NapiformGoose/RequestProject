using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestProject.Contracts
{
    public interface IStorageContext : IDisposable
    {
        public DbContext Instance { get; }
       
    }

    //public interface IDbContext : IDisposable
    //{
    //    DbContext Instance { get; }
    //}

    //public interface IStorageContext : IDbContext
    //{
    //    DbSet<Material> Materials { get; set; }

    //}
}
