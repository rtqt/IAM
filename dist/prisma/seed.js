"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
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
    }
    else {
        console.log(`Seed administrator already exists: ${adminEmail}`);
    }
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
    }
    else {
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
//# sourceMappingURL=seed.js.map