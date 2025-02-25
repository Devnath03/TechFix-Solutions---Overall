using Microsoft.EntityFrameworkCore;
using TechFixSolutions.QuotationService.Data;
using TechFixSolutions.QuotationService.Model;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace TechFixSolutions.QuotationService.Services
{
    public class QuotationService
    {

        private readonly QuotationContext _context;

        public QuotationService(QuotationContext context)
        {
            _context = context;
        }

        public async Task<List<Quotation>> GetAllQuotationsAsync()
        {
            return await _context.Quotations.ToListAsync();
        }

        public async Task<Quotation> GetQuotationByIdAsync(int id)
        {
            return await _context.Quotations.FindAsync(id);
        }

        public async Task AddQuotationAsync(Quotation quotation)
        {
            _context.Quotations.Add(quotation);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateQuotationAsync(Quotation quotation)
        {
            _context.Quotations.Update(quotation);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuotationAsync(int id)
        {
            var quotation = await _context.Quotations.FindAsync(id);
            if (quotation != null)
            {
                _context.Quotations.Remove(quotation);
                await _context.SaveChangesAsync();
            }
        }

    }
}
