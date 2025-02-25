using Microsoft.EntityFrameworkCore;
using TechFixSolutions.SupplierService.Model;

namespace TechFixSolutions.SupplierService.Data
{
    public class SupplierContext : DbContext
    {

      
        public SupplierContext(DbContextOptions<SupplierContext> options) : base(options) { }

        public DbSet<Supplier> Suppliers { get; set; }

    }

}

