// app/lib/schema.js
export function validateOrder(data) {
  const errors = {};

  if (!data.name || data.name.trim() === "") {
    errors.name = "Customer name field is required.";
  }
  
  if (!data.phone || data.phone.trim() === "") {
    errors.phone = "A valid phone number is required.";
  } else if (!/^\+?[0-9]{10,14}$/.test(data.phone.trim())) {
    errors.phone = "Invalid phone number format. Must be 10-14 digits.";
  }

  if (!data.address || data.address.trim() === "") {
    errors.address = "Delivery address destination is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
