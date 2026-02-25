import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/products.js";
import salesRoutes from "../routes/sales.js";
import categoryRoutes from "../routes/categories.js";
import { AuthService } from "../services/AuthService.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { errorHandler } from "../middleware/error.js";
import prisma from "../config/database.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/categories", categoryRoutes);

// Error Handler
app.use(errorHandler);

// Seed initial data
const seed = async () => {
  const userCount = await UserRepository.count();
  if (userCount === 0) {
    await AuthService.register("admin", "admin123", "Admin");
    await AuthService.register("cashier", "cashier123", "Cashier");
    console.log("Seeded default users: admin/admin123, cashier/cashier123");
  }

  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    const categories = ["Produce", "Dairy", "Bakery", "Meat", "Frozen", "Pantry", "Beverages", "Household"];
    for (const name of categories) {
      await prisma.category.create({ data: { name } });
    }

    await prisma.product.create({
      data: { name: "Organic Bananas", categoryId: 1, price: 0.99, stock: 150, sku: "PROD-001" }
    });
    await prisma.product.create({
      data: { name: "Whole Milk 1L", categoryId: 2, price: 1.49, stock: 80, sku: "DAIR-001" }
    });
    await prisma.product.create({
      data: { name: "Sourdough Bread", categoryId: 3, price: 3.50, stock: 20, sku: "BAKE-001" }
    });
    console.log("Seeded initial categories and products");
  }
};

seed();

export default app;
