﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechFixSolutions.OrderService.Data;
using TechFixSolutions.OrderService.Model;

namespace TechFixSolutions.OrderService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

            private readonly OrderContext _context;

            public OrderController(OrderContext context)
            {
                _context = context;
            }

            // GET: api/Orders
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
            {
                return await _context.Orders.ToListAsync();
            }

            // GET: api/Orders/5
            [HttpGet("{id}")]
            public async Task<ActionResult<Order>> GetOrder(int id)
            {
                var order = await _context.Orders.FindAsync(id);

                if (order == null)
                {
                    return NotFound();
                }

                return order;
            }

            // POST: api/Orders
            [HttpPost]
            public async Task<ActionResult<Order>> PostOrder(Order order)
            {
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
            }

            // PUT: api/Orders/5
            [HttpPut("{id}")]
            public async Task<IActionResult> PutOrder(int id, Order order)
            {
                if (id != order.Id)
                {
                    return BadRequest();
                }

                _context.Entry(order).State = EntityState.Modified;

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

            // DELETE: api/Orders/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteOrder(int id)
            {
                var quotation = await _context.Orders.FindAsync(id);
                if (quotation == null)
                {
                    return NotFound();
                }

                _context.Orders.Remove(quotation);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool QuotationExists(int id)
            {
                return _context.Orders.Any(e => e.Id == id);
            }

        }
    }

