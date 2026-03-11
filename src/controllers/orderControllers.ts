import { create } from "node:domain";
import { prisma } from "../lib/prisma";



export const orderController = {

          createOrder: async (req, res) => { 
            
        const order = await prisma.order.create({
              data: {
                userId: 1, // Replace with actual user ID from authentication
                req.body
              }
            })
            res.json(order);

},

            getOrders: async (req, res) => {      
                
                prisma.order.findMany().then(orders => {
                    res.json(orders);
                }).catch(error => {
                    res.status(500).json({ error: 'Failed to fetch orders' });
                }

},

            getOrderById: async (req, res) => { 

                const { id } = req.params;
            

}

}


