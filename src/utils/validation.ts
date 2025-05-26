/**
 * Validates an email address using a regular expression
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates form data and returns any errors
 * @param data The form data to validate
 * @returns An object containing any validation errors
 */
export const validateFormData = (data: { name: string; email: string; city: string }) => {
  const errors: { name?: string; email?: string; city?: string } = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.city.trim()) {
    errors.city = 'City is required';
  }

  return errors;
};