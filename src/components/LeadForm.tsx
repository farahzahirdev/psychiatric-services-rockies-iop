"use client";

import { FormEvent, useState } from "react";
import { PRIVACY_CONSENT } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({
  variant = "panel",
  id,
}: {
  variant?: "panel" | "inline";
  id?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      consent: data.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Unable to submit right now. Please call us or try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`lead-form lead-form--${variant} lead-form--success`} role="status">
        <p className="lead-form-success-title">Thank you</p>
        <p className="lead-form-success-body">
          We received your request. Our team will follow up soon with next steps for the Adult IOP
          program.
        </p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStatus("idle")}>
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      id={id}
      className={`lead-form lead-form--${variant}`}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="lead-form-header">
        <p id={id ? `${id}-title` : undefined} className="lead-form-title">
          Request More Information
        </p>
        <p className="lead-form-subtitle">
          Share a few details and we&apos;ll reach out about the Adult IOP.
        </p>
      </div>

      <div className="lead-form-grid">
        <div className="field">
          <label htmlFor={id ? `${id}-firstName` : "firstName"}>First Name</label>
          <input
            id={id ? `${id}-firstName` : "firstName"}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor={id ? `${id}-lastName` : "lastName"}>Last Name</label>
          <input
            id={id ? `${id}-lastName` : "lastName"}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
          />
        </div>
        <div className="field field-span">
          <label htmlFor={id ? `${id}-phone` : "phone"}>Phone Number</label>
          <input
            id={id ? `${id}-phone` : "phone"}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </div>
        <div className="field field-span">
          <label htmlFor={id ? `${id}-email` : "email"}>Email Address</label>
          <input
            id={id ? `${id}-email` : "email"}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>{PRIVACY_CONSENT}</span>
      </label>

      {error ? (
        <p className="lead-form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Request More Information"}
      </button>
    </form>
  );
}
