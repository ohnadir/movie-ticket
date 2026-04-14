// api/advanced-ticket-generator.js
// Advanced PDF generation with QR code, better styling, and batch processing

import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// HTML Template with QR Code
const createTicketHTML = async (ticketData) => {
    const { bookingId, movieName, language, movieClass, date, time, duration, seats, cinema, location } = ticketData;
    
    // QR Code generate করুন (booking link)
    const qrCodeDataURL = await QRCode.toDataURL(`https://yoursite.com/tickets/${bookingId}`);

    return `
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Movie Ticket</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #f5f5f5;
                    padding: 20px;
                }
                
                .page {
                    width: 210mm;
                    height: 297mm;
                    background: white;
                    margin: 0 auto;
                    display: flex;
                    gap: 30px;
                    padding: 30px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }
                
                .ticket-section {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background: white;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                }
                
                .ticket-header {
                    height: 150px;
                    background: linear-gradient(135deg, rgba(22, 163, 74, 0.8), rgba(22, 163, 74, 0.6)), 
                                url('https://res.cloudinary.com/ddqovbzxy/image/upload/v1775355667/177400593321790_m9a1b6.jpg');
                    background-size: cover;
                    background-position: center;
                    color: white;
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }
                
                .movie-class-badge {
                    display: inline-block;
                    background: rgba(255, 255, 255, 0.9);
                    color: #16a34a;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    width: fit-content;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .movie-title {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
                
                .movie-lang {
                    font-size: 13px;
                    font-weight: 500;
                    opacity: 0.95;
                }
                
                .ticket-body {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 0;
                    border-bottom: 1px solid #eee;
                }
                
                .info-item {
                    padding: 20px;
                    text-align: center;
                    border-right: 1px solid #eee;
                }
                
                .info-item:last-child {
                    border-right: none;
                }
                
                .info-label {
                    font-size: 10px;
                    color: #999;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 8px;
                }
                
                .info-value {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                }
                
                .seats-section {
                    padding: 20px;
                    background: linear-gradient(135deg, rgba(22, 163, 74, 0.05), rgba(22, 163, 74, 0.1));
                    border-bottom: 2px dashed #16a34a;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .seats-info {
                    flex: 1;
                }
                
                .seats-icon {
                    font-size: 40px;
                    opacity: 0.2;
                }
                
                .cinema-section {
                    padding: 20px;
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                }
                
                .cinema-info {
                    flex: 1;
                }
                
                .cinema-name {
                    font-weight: bold;
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 5px;
                }
                
                .location {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 15px;
                }
                
                .booking-id {
                    font-size: 11px;
                    color: #999;
                    font-family: 'Courier New', monospace;
                    background: #f5f5f5;
                    padding: 8px 12px;
                    border-radius: 4px;
                    word-break: break-all;
                }
                
                .qr-code {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                
                .qr-code img {
                    width: 100px;
                    height: 100px;
                    border: 2px solid #16a34a;
                    padding: 8px;
                    border-radius: 8px;
                }
                
                .qr-label {
                    font-size: 10px;
                    color: #999;
                    margin-top: 8px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .seating-chart {
                    flex: 1;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                
                .seat-grid {
                    display: grid;
                    grid-template-columns: repeat(14, 1fr);
                    gap: 8px;
                    margin-bottom: 15px;
                }
                
                .seat {
                    width: 20px;
                    height: 20px;
                    border-radius: 3px;
                    border: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 8px;
                    font-weight: bold;
                }
                
                .seat.booked {
                    background: #16a34a;
                    color: white;
                    border-color: #16a34a;
                }
                
                .seat.available {
                    background: #f0f0f0;
                    color: #999;
                }
                
                .seat.empty {
                    visibility: hidden;
                }
                
                .legend {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    margin-top: 15px;
                    font-size: 10px;
                    padding-top: 15px;
                    border-top: 1px solid #eee;
                }
                
                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .legend-seat {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                }
                
                .legend-seat.booked {
                    background: #16a34a;
                }
                
                .legend-seat.available {
                    background: #f0f0f0;
                    border: 1px solid #ddd;
                }
                
                .divider {
                    width: 2px;
                    height: 50px;
                    background: dashed #ddd;
                    margin: 0 15px;
                }
                
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .page {
                        box-shadow: none;
                        margin: 0;
                    }
                }
            </style>
        </head>
        <body>
            <div class="page">
                <!-- Left: Main Ticket -->
                <div class="ticket-section">
                    <div class="ticket-header">
                        <div class="movie-class-badge">${movieClass}</div>
                        <div class="movie-title">${movieName}</div>
                        <div class="movie-lang">${language}</div>
                    </div>
                    
                    <div class="ticket-body">
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">Date</div>
                                <div class="info-value">${date}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Time</div>
                                <div class="info-value">${time}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Duration</div>
                                <div class="info-value">${duration}</div>
                            </div>
                        </div>
                        
                        <div class="seats-section">
                            <div class="seats-info">
                                <div class="info-label">Your Seats</div>
                                <div class="info-value">${seats.join(", ")}</div>
                            </div>
                            <div class="seats-icon">🎬</div>
                        </div>
                        
                        <div class="cinema-section">
                            <div class="cinema-info">
                                <div class="cinema-name">${cinema}</div>
                                <div class="location">${location}</div>
                                <div class="booking-id">ID: ${bookingId}</div>
                            </div>
                            <div class="qr-code">
                                <img src="${qrCodeDataURL}" alt="QR Code">
                                <div class="qr-label">Scan to Verify</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

// PDF Generate করুন
export async function generateTicketPDF(ticketData) {
    try {
        const htmlContent = await createTicketHTML(ticketData);
        
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            printBackground: true
        });
        
        await browser.close();
        
        return pdfBuffer;
    } catch (error) {
        throw new Error(`PDF generation failed: ${error.message}`);
    }
}

// Email পাঠান
export async function sendTicketEmail(email, ticketData, pdfBuffer) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `🎬 আপনার সিনেমা টিকিট - ${ticketData.movieName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0;">🎬 আপনার টিকিট প্রস্তুত!</h1>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #333; margin-top: 0;">আপনার বুকিং নিশ্চিত হয়েছে! ✅</h2>
                        
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>মুভি:</strong> ${ticketData.movieName}</p>
                            <p><strong>তারিখ:</strong> ${ticketData.date}</p>
                            <p><strong>সময়:</strong> ${ticketData.time}</p>
                            <p><strong>সিট:</strong> ${ticketData.seats.join(", ")}</p>
                            <p><strong>সিনেমা:</strong> ${ticketData.cinema}</p>
                            <p style="margin-bottom: 0;"><strong>বুকিং আইডি:</strong> <code style="background: #fff; padding: 5px; border-radius: 4px;">${ticketData.bookingId}</code></p>
                        </div>
                        
                        <div style="background: #e8f5e9; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0;">
                            <strong>📌 গুরুত্বপূর্ণ:</strong>
                            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                                <li>নিচের PDF টিকিট ডাউনলোড করুন এবং প্রিন্ট করুন</li>
                                <li>অথবা মোবাইলে এটি দেখান এবং স্ক্যান করতে দিন</li>
                                <li>শো এর ১০ মিনিট আগে পৌঁছান</li>
                            </ul>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="https://yoursite.com/tickets/${ticketData.bookingId}" 
                               style="display: inline-block; background: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                টিকিট দেখুন
                            </a>
                        </div>
                        
                        <div style="background: #fff3cd; border-radius: 8px; padding: 15px; margin-top: 20px; font-size: 12px; color: #856404;">
                            <strong>⚠️ সতর্কতা:</strong> এই ইমেলটি শেয়ার করবেন না। শুধুমাত্র আপনার অ্যাকাউন্টের মাধ্যমে টিকিট যাচাই করুন।
                        </div>
                        
                        <p style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
                            যদি কোনো সমস্যা হয়, আমাদের সাথে যোগাযোগ করুন: support@yoursite.com
                        </p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: `ticket-${ticketData.bookingId}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        };
        
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new Error(`Email sending failed: ${error.message}`);
    }
}

// API Handler
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, ticketData } = req.body;

        // Validation
        if (!email || !ticketData) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // PDF Generate করুন
        const pdfBuffer = await generateTicketPDF(ticketData);

        // Email পাঠান
        await sendTicketEmail(email, ticketData, pdfBuffer);

        res.status(200).json({
            success: true,
            message: 'Ticket sent successfully',
            bookingId: ticketData.bookingId
        });

    } catch (error) {
        console.error('Ticket generation error:', error);
        res.status(500).json({
            error: 'Failed to generate and send ticket',
            details: error.message
        });
    }
}