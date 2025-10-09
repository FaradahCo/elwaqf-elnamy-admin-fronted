import React from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneNumberProps {
  value?: string;
  onChange?: (phoneNumber?: string, country?: string) => void;
  placeholder?: string;
  defaultCountry?: string;
  disabled?: boolean;
  iconSrc?: string;
  iconAlt?: string;
  withIcon?: boolean;
  styles?: React.CSSProperties;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  value,
  onChange,
  placeholder,
  defaultCountry = "SA",
  disabled = false,
  styles = {},
}) => {
  const handleChange = (phoneValue?: string) => {
    let countryCode = defaultCountry.toLowerCase();

    // Extract country code from phone number
    if (phoneValue) {
      const phoneNumber = parsePhoneNumber(phoneValue);
      if (phoneNumber?.country) {
        countryCode = phoneNumber.country.toLowerCase();
      }
    }

    // Call onChange with both phone number and country
    onChange?.(phoneValue, countryCode);
  };

  return (
    <div style={{ position: "relative", ...styles }}>
      <PhoneInput
        value={value as any}
        onChange={handleChange}
        placeholder={placeholder}
        defaultCountry={defaultCountry as any}
        disabled={disabled}
        style={{
          height: "40px",
          fontSize: "14px",
          border: "1px solid #d9d9d9",
          borderRadius: "6px",
          padding: "4px 15px",
        }}
        className="dir-ltr!"
      />
    </div>
  );
};

export { PhoneNumber };
export default PhoneNumber;
