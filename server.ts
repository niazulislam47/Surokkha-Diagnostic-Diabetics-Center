import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Serve uploads directory
  app.use("/uploads", express.static(uploadDir));

  // Multer configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `doctor-${req.params.id}-${Date.now()}${ext}`);
    }
  });

  const upload = multer({ storage });

  // Socket connection handling
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // API Endpoint for appointments
  app.post("/api/appointment", async (req, res) => {
    const { name, phone, doctor, date, time } = req.body;

    // Emit real-time update to all clients
    io.emit("appointment_booked", {
      doctorName: doctor,
      date,
      time,
      bookedAt: new Date()
    });

    // Email logic...

    // Check for environment variables
    const user = process.env.CLINIC_GMAIL_USER;
    const pass = process.env.CLINIC_GMAIL_PASS;
    const receiver = process.env.RECEIVER_EMAIL || "surokkha.dc.info@gmail.com";

    if (!user || !pass) {
      console.warn("Email credentials not configured. Simulation mode.");
      return res.status(200).json({ 
        success: true, 
        message: "অ্যপয়েন্টমেন্ট তথ্য গ্রহণ করা হয়েছে (Simulation Mode)। ইমেইল সচল করতে CLINIC_GMAIL_USER এবং CLINIC_GMAIL_PASS কনফিগার করুন।" 
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: user,
      to: receiver,
      subject: `New Appointment: ${name} with ${doctor}`,
      text: `
        New Appointment Details:
        -------------------------
        Patient Name: ${name}
        Phone Number: ${phone}
        Doctor: ${doctor}
        Date: ${date}
        Time: ${time}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Appointment sent successfully!" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email.", error: error.message });
    }
  });

  // API Endpoint for photo uploads
  app.post("/api/doctors/:id/photo", upload.single("photo"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const photoUrl = `/uploads/${req.file.filename}`;
    
    // Notify clients about the photo update
    io.emit("doctor_photo_updated", {
      doctorId: req.params.id,
      photoUrl
    });

    res.status(200).json({ 
      success: true, 
      message: "Photo uploaded successfully!",
      photoUrl 
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
