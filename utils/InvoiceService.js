const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");

async function sendInvoiceEmail(orderDetails, userEmail) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });

    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      // Nodemailer transporter (Use your SMTP details)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ksoni5079@gmail.com",
          pass: "suvd cmzu usux ncew",
        },
      });

      // Styled HTML Email Content
      const emailHtml = `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); margin: auto;">
                        <div style="text-align: center;">
                            <h1>READMOREE</h1>
                        </div>
                        <h2 style="color: #444;">📜 Invoice #${orderDetails.orderId}</h2>
                        <p>Dear <strong>${orderDetails.customerName}</strong>,</p>
                        <p>Thank you for shopping with <strong>READMOREE</strong>! Please find your invoice attached.</p>

                       

                        <p>If you have any questions, feel free to contact us at <a href="mailto:support@youremail.com">support@youremail.com</a>.</p>
                        <p style="text-align: center;">
                            <a href="http://localhost:3000" style="background-color: #A294F9; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Shop Again</a>
                        </p>
                        <p style="text-align: center; font-size: 12px; color: #888;">1801 California St., Denver, CO 80202</p>
                    </div>
                </body>
            </html>`;

      // Email options
      const mailOptions = {
        from: "ksoni5079@gmail.com",
        to: userEmail,
        subject: `Invoice #${orderDetails.orderId}`,
        html: emailHtml,
        attachments: [
          {
            filename: `Invoice-${orderDetails.orderId}.pdf`,
            content: pdfData,
            contentType: "application/pdf",
          },
        ],
      };

      // Send Email
      try {
        await transporter.sendMail(mailOptions);
        resolve("Invoice sent successfully!");
      } catch (error) {
        reject(`Error sending invoice: ${error}`);
      }
    });

    // ================== PDF INVOICE ==================
    doc.font("Helvetica-Bold").fontSize(24).text("Invoice", 50, 50);
    doc.fontSize(16).text(`#${orderDetails.orderId}`, 50, 80);

    doc
      .font("Helvetica-Bold")
      .fontSize(17)
      .text("READMOREE", 450, 50, { align: "right" });

    doc.moveDown(2);

    // =================== BILLING & SHIPPING ADDRESS ===================
    doc.fontSize(12).fillColor("#333").text("BILLING ADDRESS", 50, doc.y);
    doc
      .fillColor("black")
      .font("Helvetica")
      .text(orderDetails.customerName, 50);
    doc.text(orderDetails.billingAddress, 50);
    doc.text(orderDetails.email, 50);
    doc.text(orderDetails.phone, 50);

    doc
      .fontSize(12)
      .fillColor("#333")
      .text("SHIPPING ADDRESS", 350, doc.y - 80);
    doc
      .fillColor("black")
      .font("Helvetica")
      .text(orderDetails.customerName, 350);
    doc.text(orderDetails.shippingAddress, 350);
    doc.text(orderDetails.email, 350);
    doc.text(orderDetails.phone, 350);

    doc.moveDown(2);

    // =================== TABLE HEADER ===================
    let tableTop = doc.y + 10;
    doc.fillColor("#A294F9").rect(50, tableTop, 500, 25).fill();
    doc.fillColor("black").fontSize(12).font("Helvetica-Bold");
    doc.text("Product Description", 55, tableTop + 6);
    doc.text("Quantity", 280, tableTop + 6);
    doc.text("Unit Price", 340, tableTop + 6);
    doc.text("Discount", 400, tableTop + 6);
    doc.text("Total", 470, tableTop + 6);

    doc.moveDown();

    // =================== TABLE ROWS ===================
    let rowY = tableTop + 30;
    let total = 0;
    doc.font("Helvetica").fontSize(12);
    orderDetails.items.forEach((item) => {
      doc.fillColor("black");
      doc.text(item.name, 55, rowY);
      doc.text(item.quantity.toString(), 280, rowY);
      doc.text(`$${item.price.toFixed(2)}`, 340, rowY);
      doc.text(`${item.discount}%`, 400, rowY);
      let discountedPrice = item.price - (item.price * item.discount) / 100;
      doc.text(`$${(discountedPrice * item.quantity).toFixed(2)}`, 470, rowY);
      total += discountedPrice * item.quantity;
      rowY += 20;
    });

    // =================== TOTAL CALCULATION (FIXED) ===================
    rowY += 30;
    doc.font("Helvetica-Bold").text("Subtotal:", 400, rowY);
    doc.text(`$${total.toFixed(2)}`, 500, rowY, { align: "right" });

    rowY += 20;
    doc.text("Total Amount Paid:", 400, rowY);
    doc.text(`$${total.toFixed(2)}`, 500, rowY, { align: "right" });

    rowY += 20;
    doc.text("Total Due:", 400, rowY);
    doc.text(`$0`, 500, rowY, { align: "right" });

    doc.moveDown(2);

    // =================== FOOTER NOTE ===================
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        "Please note that depending on the availability of your products, your order will be shipped within 5 to 7 business days.",
        50,
        doc.y + 40,
        { width: 500, align: "left" }
      );
    doc.text(
      "For any additional queries please call 654-123-123 or send us an email at support@youremail.com.",
      50,
      doc.y + 10,
      { width: 500, align: "left" }
    );
    doc.text("Thank you for shopping!", 50, doc.y + 10, {
      width: 500,
      align: "left",
    });

    doc.end();
  });
}

// Example Usage

module.exports = sendInvoiceEmail;
