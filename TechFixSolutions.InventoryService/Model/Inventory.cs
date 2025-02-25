
namespace TechFixSolutions.InventoryService.Model
{
    public class Inventory
    {

        public int Id { get; set; }
        public string InventoryName { get; set; }
        public string SupplierName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string IsAvialable { get; set; }

    }
}
