const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.admin.create({
    data: {
      name: "Main Admin",
      email: "admin@smartauto.com",
      passwordHash: adminPassword,
      role: "superadmin",
    },
  });

  // Regular users
  const user1Password = await bcrypt.hash("password123", 10);
  const user2Password = await bcrypt.hash("password456", 10);

  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      passwordHash: user1Password,
      phone: "0767771234",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Sarah Lee",
      email: "sarah@example.com",
      passwordHash: user2Password,
    },
  });

    // Branches
  const colomboBranch = await prisma.branch.create({
    data: {
      name: "Colombo Branch",
      location: "Colombo 07",
      contactNumber: "0112233111",
    },
  });

  const kandyBranch = await prisma.branch.create({
    data: {
      name: "Kandy Branch",
      location: "Kandy City",
      contactNumber: "0812222333",
    },
  });

  // Cars
  const car1 = await prisma.car.create({
    data: {
      brand: "Toyota",
      model: "Aqua",
      year: 2018,
      price: 4500000,
      mileage: 55000,
      images: [],
      specifications: {
        hybrid: true,
        engine: "1500cc",
      },
      createdById: admin.id,
    },
  });

  const car2 = await prisma.car.create({
    data: {
      brand: "Honda",
      model: "Vezel",
      year: 2017,
      price: 7200000,
      mileage: 65000,
      images: [],
      specifications: {
        hybrid: true,
        engine: "1500cc",
      },
      createdById: admin.id,
    },
  });

    // Availability
  await prisma.availability.createMany({
    data: [
      {
        carId: car1.id,
        branchId: colomboBranch.id,
        quantity: 4,
      },
      {
        carId: car1.id,
        branchId: kandyBranch.id,
        quantity: 2,
      },
      {
        carId: car2.id,
        branchId: colomboBranch.id,
        quantity: 3,
      },
    ],
  });

  // Newsletter Entries
  await prisma.newsletterEntry.createMany({
    data: [
      {
        email: "guest1@gmail.com",
        source: "GUEST",
        status: "ACTIVE",
      },
      {
        email: user1.email,
        userId: user1.id,
        source: "USER",
        status: "ACTIVE",
      },
      {
        email: user2.email,
        userId: user2.id,
        source: "USER",
        status: "ACTIVE",
      },
    ],
  });

    // Newsletters
  const newsletter = await prisma.newsletter.create({
    data: {
      title: "New Arrivals 🚗",
      subject: "Check out our latest vehicles!",
      content: `
        <h1>New Vehicles Available</h1>
        <p>We have added new hybrid vehicles to our collection.</p>
        <p>Visit Smart Auto Hub today!</p>
      `,
    },
  });

  // Newsletter Broadcasts
  await prisma.newsletterBroadcast.create({
    data: {
      newsletterId: newsletter.id,
      status: "COMPLETED",
      sentCount: 3,
      sentAt: new Date(),
    },
  });

  console.log("✅ Seeding completed successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
