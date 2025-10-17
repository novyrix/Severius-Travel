'use client';

import { HONEYPOT_FIELDS, generateFormTimestamp } from '@/lib/honeypot';

interface HoneypotFieldsProps {
  onLoad?: () => void;
}

/**
 * Honeypot fields component - include in all forms to detect bots
 * These fields are hidden from users but visible to bots
 */
export function HoneypotFields({ onLoad }: HoneypotFieldsProps) {
  return (
    <>
      <style jsx global>{`
        .honeypot-field {
          position: absolute !important;
          left: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          opacity: 0 !important;
          pointer-events: none !important;
          tab-index: -1;
        }
      `}</style>

      {/* Honeypot fields - leave empty */}
      <div className="honeypot-field" aria-hidden="true">
        <input
          type="text"
          name={HONEYPOT_FIELDS.website}
          tabIndex={-1}
          autoComplete="off"
          placeholder="Leave blank"
        />
      </div>

      <div className="honeypot-field" aria-hidden="true">
        <input
          type="url"
          name={HONEYPOT_FIELDS.url}
          tabIndex={-1}
          autoComplete="off"
          placeholder="Leave blank"
        />
      </div>

      <div className="honeypot-field" aria-hidden="true">
        <input
          type="tel"
          name={HONEYPOT_FIELDS.phone}
          tabIndex={-1}
          autoComplete="off"
          placeholder="Leave blank"
        />
      </div>

      <div className="honeypot-field" aria-hidden="true">
        <input
          type="text"
          name={HONEYPOT_FIELDS.company}
          tabIndex={-1}
          autoComplete="off"
          placeholder="Leave blank"
        />
      </div>

      {/* Timestamp field - used to detect too-fast submissions */}
      <input
        type="hidden"
        name={HONEYPOT_FIELDS.timestamp}
        defaultValue={generateFormTimestamp()}
      />
    </>
  );
}
