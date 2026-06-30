import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const DESTINATIONS = new Set([
  "Komodo Island",
  "Raja Ampat",
  "Both",
  "Not sure yet",
]);

const DURATIONS = new Set([
  "5–7 nights",
  "7–10 nights",
  "10+ nights",
  "Not sure yet",
]);

const GUESTS = new Set(["1–4 guests", "5–8 guests", "9–12 guests"]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function badRequest() {
  return NextResponse.json(
    {
      ok: false,
      error: "VALIDATION_ERROR",
      message: "Please fill in your name, email, and message.",
    },
    { status: 400 }
  );
}

function validateAllowed(value, allowedSet) {
  return value === "" || allowedSet.has(value);
}

function formatValue(value) {
  return value || "Not provided";
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding: 8px 0; width: 180px; vertical-align: top; color: #6A6A6A; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.5; border-bottom: 1px solid #ECE8DD;">
        ${label}
      </td>
      <td style="padding: 8px 0; vertical-align: top; color: #2D3C68; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #ECE8DD;">
        ${value}
      </td>
    </tr>
  `;
}

function sectionTitle(title) {
  return `
    <p style="margin: 28px 0 10px; color: #2D3C68; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; line-height: 1.25;">
      ${title}
    </p>
  `;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return badRequest();
  }

  const name = trimString(body?.name);
  const email = trimString(body?.email);
  const phone = trimString(body?.phone);
  const destination = trimString(body?.destination);
  const duration = trimString(body?.duration);
  const guests = trimString(body?.guests);
  const dates = trimString(body?.dates);
  const message = trimString(body?.message);
  const website = trimString(body?.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const isValid =
    name.length > 0 &&
    name.length <= 120 &&
    email.length > 0 &&
    email.length <= 180 &&
    EMAIL_REGEX.test(email) &&
    message.length > 0 &&
    message.length <= 3000 &&
    phone.length <= 80 &&
    dates.length <= 160 &&
    validateAllowed(destination, DESTINATIONS) &&
    validateAllowed(duration, DURATIONS) &&
    validateAllowed(guests, GUESTS);

  if (!isValid) {
    return badRequest();
  }

  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_TO_EMAIL ||
    !process.env.CONTACT_FROM_EMAIL
  ) {
    console.error("Contact API configuration missing required env vars");

    return NextResponse.json(
      {
        ok: false,
        error: "CONFIGURATION_ERROR",
        message: "Email is not configured yet. Please email us directly.",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const submittedAt = new Date().toISOString();

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(formatValue(phone));
  const safeDestination = escapeHtml(formatValue(destination));
  const safeDuration = escapeHtml(formatValue(duration));
  const safeGuests = escapeHtml(formatValue(guests));
  const safeDates = escapeHtml(formatValue(dates));
  const safeMessage = escapeHtml(message);
  const safeSubmittedAt = escapeHtml(submittedAt);

  const subject = `New Serenity Inquiry: ${name}`;

  const text = [
    "SERENITY PHINISI",
    "Website Inquiry",
    "",
    "New private charter inquiry",
    "",
    "A guest has submitted an inquiry through the Serenity website.",
    "",
    "Guest",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone or WhatsApp: ${formatValue(phone)}`,
    "",
    "Journey",
    `Destination: ${formatValue(destination)}`,
    `Duration: ${formatValue(duration)}`,
    `Number of Guests: ${formatValue(guests)}`,
    `Preferred Dates: ${formatValue(dates)}`,
    "",
    "Message",
    `Message: ${message}`,
    "",
    `Submitted at: ${submittedAt}`,
    `Reply directly to this email to respond to ${name}.`,
  ].join("\n");

  const html = `
    <div style="width: 100%; background: #F4F5F2; padding: 32px 16px;">
      <div style="max-width: 640px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8E3D7;">
        <div style="height: 3px; background: #B08D57;"></div>
        <div style="padding: 26px 24px 28px;">
          <p style="margin: 0; color: #6A6A6A; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.18em; line-height: 1.6; text-transform: uppercase;">
            SERENITY PHINISI<br/>Website Inquiry
          </p>
          <h1 style="margin: 14px 0 10px; color: #2D3C68; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.2; font-weight: normal;">
            New private charter inquiry
          </h1>
          <p style="margin: 0 0 14px; color: #2D3C68; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7;">
            A guest has submitted an inquiry through the Serenity website.
          </p>

          ${sectionTitle("Guest")}
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            ${detailRow("Name", safeName)}
            ${detailRow("Email", safeEmail)}
            ${detailRow("Phone or WhatsApp", safePhone)}
          </table>

          ${sectionTitle("Journey")}
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            ${detailRow("Destination", safeDestination)}
            ${detailRow("Duration", safeDuration)}
            ${detailRow("Number of Guests", safeGuests)}
            ${detailRow("Preferred Dates", safeDates)}
          </table>

          ${sectionTitle("Message")}
          <div style="background: #F8F6EF; border: 1px solid #E8E3D7; padding: 14px 16px; color: #2D3C68; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7;">
            ${safeMessage.replace(/\n/g, "<br/>")}
          </div>

          <p style="margin: 22px 0 0; color: #6A6A6A; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.7;">
            Submitted at: ${safeSubmittedAt}<br/>
            Reply directly to this email to respond to ${safeName}.
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    console.error("Contact API failed to send email");

    return NextResponse.json(
      {
        ok: false,
        error: "SEND_FAILED",
        message: "We could not send your enquiry. Please email us directly.",
      },
      { status: 500 }
    );
  }
}
