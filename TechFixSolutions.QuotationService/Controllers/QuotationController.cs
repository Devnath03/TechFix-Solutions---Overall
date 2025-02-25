using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechFixSolutions.QuotationService.Data;
using TechFixSolutions.QuotationService.Model;

namespace TechFixSolutions.QuotationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotationController : ControllerBase
    {

        private readonly QuotationContext _context;

        public QuotationController(QuotationContext context)
        {
            _context = context;
        }

        // GET: api/Quotations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quotation>>> GetQuotations()
        {
            return await _context.Quotations.ToListAsync();
        }

        // GET: api/Quotations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quotation>> GetQuotation(int id)
        {
            var quotation = await _context.Quotations.FindAsync(id);

            if (quotation == null)
            {
                return NotFound();
            }

            return quotation;
        }

        // POST: api/Quotations
        [HttpPost]
        public async Task<ActionResult<Quotation>> PostQuotation(Quotation quotation)
        {
            _context.Quotations.Add(quotation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuotation), new { id = quotation.Id }, quotation);
        }

        // PUT: api/Quotations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuotation(int id, Quotation quotation)
        {
            if (id != quotation.Id)
            {
                return BadRequest();
            }

            _context.Entry(quotation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuotationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Quotations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuotation(int id)
        {
            var quotation = await _context.Quotations.FindAsync(id);
            if (quotation == null)
            {
                return NotFound();
            }

            _context.Quotations.Remove(quotation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuotationExists(int id)
        {
            return _context.Quotations.Any(e => e.Id == id);
        }

    }
}
