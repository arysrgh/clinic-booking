const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // ======================
  // REGION (UPSERT)
  // ======================
  const jakarta = await prisma.region.upsert({
    where: { code: "JKT" },
    update: {},
    create: {
      name: "Jakarta",
      code: "JKT"
    }
  });

  const bandung = await prisma.region.upsert({
    where: { code: "BDG" },
    update: {},
    create: {
      name: "Bandung",
      code: "BDG"
    }
  });

  // ======================
  // DOCTORS (NO DUPLICATE)
  // ======================
  await prisma.doctor.createMany({
    data: [
      {
        name: "Dr. Andi",
        specialization: "General",
        region_id: jakarta.id
      },
      {
        name: "Dr. Budi",
        specialization: "Pediatric",
        region_id: jakarta.id
      },
      {
        name: "Dr. Sari",
        specialization: "Dermatology",
        region_id: bandung.id
      }
    ],
    skipDuplicates: true
  });

  // ======================
  // AMBIL DOCTOR
  // ======================
  const doctor = await prisma.doctor.findFirst();

  if (!doctor) {
    throw new Error("No doctor found for slot seeding");
  }

  // ======================
  // SLOTS (UPSERT STYLE)
  // ======================
  const slotDate = new Date("2026-04-10");

  const slots = [
    { start: "09:00", end: "09:30" },
    { start: "10:00", end: "10:30" }
  ];

  for (const s of slots) {
    await prisma.appointmentSlot.upsert({
      where: {
        // composite unique (manual trick)
        id: `${doctor.id}-${s.start}-${slotDate.toISOString()}`
      },
      update: {},
      create: {
        id: `${doctor.id}-${s.start}-${slotDate.toISOString()}`,
        doctor_id: doctor.id,
        region_id: doctor.region_id,
        slot_date: slotDate,
        start_time: s.start,
        end_time: s.end,
        is_available: true
      }
    });
  }

  console.log("🌱 Seed success (safe upsert)");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });