namespace TechFixSolutions.QuotationService.Model
{
    public class Quotation
    {

        public int Id { get; set; }
        public string SupplierName { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public DateTime DateReceived { get; set; }

    }
}
