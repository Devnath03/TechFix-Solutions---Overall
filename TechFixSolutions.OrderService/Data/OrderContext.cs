using Microsoft.EntityFrameworkCore;
using TechFixSolutions.OrderService.Model;

namespace TechFixSolutions.OrderService.Data
{
    public class OrderContext : DbContext
    {
        public OrderContext(DbContextOptions<OrderContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }


    }

}


