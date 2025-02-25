using Microsoft.EntityFrameworkCore;
using TechFixSolutions.QuotationService.Model;

namespace TechFixSolutions.QuotationService.Data
{
    public class QuotationContext : DbContext
    {

        public QuotationContext(DbContextOptions<QuotationContext> options) : base(options) { }

        public DbSet<Quotation> Quotations { get; set; }

    }
}
