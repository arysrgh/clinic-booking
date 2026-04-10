const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /encounters
router.post('/', async (req, res) => {
  try {
    const {
      user_id,
      doctor_id,
      region_id,
      appointment_slot_id
    } = req.body;

    // VALIDATION
    if (!user_id || !doctor_id || !region_id || !appointment_slot_id) {
      return res.status(400).json({
        error: {
          code: "BAD_REQUEST",
          message: "Missing required fields"
        }
      });
    }

    // CEK SLOT
    const slot = await prisma.appointmentSlot.findUnique({
      where: { id: appointment_slot_id }
    });

    if (!slot || !slot.is_available) {
      return res.status(400).json({
        error: {
          code: "SLOT_NOT_AVAILABLE",
          message: "Selected appointment slot is no longer available"
        }
      });
    }

    // GENERATE BOOKING CODE
    const bookingCode = `BKG-${Date.now()}`;

    // TRANSACTION (PENTING 🔥)
    const result = await prisma.$transaction(async (tx) => {
      // CREATE ENCOUNTER
      const encounter = await tx.encounter.create({
        data: {
          booking_code: bookingCode,
          user_id,
          doctor_id,
          region_id,
          appointment_slot_id,
          status: "BOOKED"
        }
      });

      // UPDATE SLOT
      await tx.appointmentSlot.update({
        where: { id: appointment_slot_id },
        data: {
          is_available: false
        }
      });

      return encounter;
    });

    res.json({
      id: result.id,
      booking_code: result.booking_code,
      status: result.status,
      message: "Encounter created successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong"
      }
    });
  }
});

module.exports = router;