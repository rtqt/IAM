import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@infnova.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'password123';

  const existingAdmin = await prisma.administrator.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.administrator.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    });
    console.log(`Created seed administrator: ${adminEmail}`);
  } else {
    console.log(`Seed administrator already exists: ${adminEmail}`);
  }

  // Seed sample applicants if none exist
  const count = await prisma.applicant.count();
  if (count === 0) {
    await prisma.applicant.createMany({
      data: [
        {
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice@example.com',
          track: 'FRONTEND_DEVELOPMENT',
          status: 'PENDING',
        },
        {
          firstName: 'Bob',
          lastName: 'Jones',
          email: 'bob@example.com',
          track: 'BACKEND_DEVELOPMENT',
          status: 'SHORTLISTED',
        },
        {
          firstName: 'Charlie',
          lastName: 'Brown',
          email: 'charlie@example.com',
          track: 'UI_UX_DESIGN',
          status: 'REJECTED',
        },
      ],
    });
    console.log('Seeded sample applicants');
  } else {
    console.log('Applicants already exist, skipping applicant seed');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
