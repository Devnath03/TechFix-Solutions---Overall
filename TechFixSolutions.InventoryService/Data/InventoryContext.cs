using Microsoft.EntityFrameworkCore;
using TechFixSolutions.InventoryService.Model;

namespace TechFixSolutions.InventoryService.Data
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options) : base(options) { }

        public DbSet<Inventory> Inventries { get; set; }


    }

}

