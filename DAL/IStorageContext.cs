using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RequestProject.DAL
{
    public interface IStorageContext : IDisposable
    {
        public DbContext Instance { get; }
    }
}
