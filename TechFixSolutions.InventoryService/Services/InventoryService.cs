using Microsoft.EntityFrameworkCore;
using TechFixSolutions.InventoryService.Data;
using TechFixSolutions.InventoryService.Model;

namespace TechFixSolutions.InventoryService.Services
{
    public class InventoryService
    {

        private readonly InventoryContext _context;

        public InventoryService (InventoryContext context)
        {
            _context = context;
        }

        public async Task<List<Inventory>> GetAllInventriesAsync()
        {
            return await _context.Inventries.ToListAsync();
        }

        public async Task<Inventory> GetInventoryByIdAsync(int id)
        {
            return await _context.Inventries.FindAsync(id);
        }

        public async Task AddInventoryAsync(Inventory inventory)
        {
            _context.Inventries.Add(inventory);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateInventoryAsync(Inventory inventory)
        {
            _context.Inventries.Update(inventory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteInventoryAsync(int id)
        {
            var inventory = await _context.Inventries.FindAsync(id);
            if (inventory != null)
            {
                _context.Inventries.Remove(inventory);
                await _context.SaveChangesAsync();
            }
        }

    }
}
