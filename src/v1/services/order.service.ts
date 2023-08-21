import { PlaceOrder } from '../models/order.model'; 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

class OrderService {
    public create = async (order: PlaceOrder) => {
        return prisma.orders.create({ data: order });
    };
    public getOrdersByUserID = async (user_id: number) => {
        return await prisma.orders.findMany({ where: { user_id } });
    };
    public getOrdersById = async (id:number, user_id: number) => {
        return await prisma.orders.findMany({ where: { id, user_id } });
    };
    public show = async (id: number) => {
        return await prisma.orders.findUnique({ where: { id } });
    };
    public getOrderByTrxRef = async (txn_ref: string, user_id: number) => {
        return await prisma.orders.findFirst({ where: { txn_ref, user_id } });
    };
    public updatePaymentStatus = async (id: number, txn_ref: string) => {
        return await prisma.orders.update({ where: { id }, data: { txn_ref } });
    };
    public destroy = async ( id: number) => {
        return await prisma.orders.delete({ where: { id } });
    };
}
export default new OrderService;