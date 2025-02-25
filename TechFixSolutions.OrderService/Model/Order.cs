namespace TechFixSolutions.OrderService.Model
{
    public class Order
    {
            public int Id { get; set; }

            public string ProductName { get; set; }

            public string ProductCategory { get; set; }

            public int Quantity { get; set; }

            public decimal TotalPrice { get; set; }
        

    }
}
