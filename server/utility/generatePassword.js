function generateStrongPassword(length=12) {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    const allChars = lowerCaseChars + upperCaseChars + numberChars + specialChars;
    let password = '';

    if (length < 4) {
        throw new Error('Password length should be at least 4 characters to include all character types.');
    }

    // Ensure the password has at least one of each type of character
    password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password length with random characters
    for (let i = 4; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

// Example usage:

module.exports = generateStrongPassword;
