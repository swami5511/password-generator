let lastPassword = '';

function generatePassword() {
  const name = document.getElementById('name').value.trim();
  const dob = document.getElementById('dob').value;
  const outputDiv = document.getElementById('output');
  const successMsg = document.getElementById('successMessage');
  successMsg.classList.add("hidden");

  if (!name || !dob) {
    alert("Please enter both name and date of birth.");
    return;
  }

  const dobParts = dob.split("-");
  const day = dobParts[2];
  const month = dobParts[1];
  const year = dobParts[0].slice(2);

  const specialChars = "!@#$%^&*";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function getRandomItem(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  const base = name.toLowerCase().slice(0, 3) + day + month + year;
  const randUpper = getRandomItem(upperChars);
  const randSpecial = getRandomItem(specialChars);
  const randDigit = Math.floor(Math.random() * 100);

  let password = shuffleString(base + randSpecial + randUpper + randDigit);

  // Ensure password is different each time
  while (password === lastPassword) {
    password = shuffleString(base + getRandomItem(specialChars) + getRandomItem(upperChars) + Math.floor(Math.random() * 100));
  }

  lastPassword = password;

  // Display password
  document.getElementById("password").textContent = password;
  outputDiv.classList.remove("hidden");

  // Check strength
  const strength = getPasswordStrength(password);
  document.getElementById("strength").style.width = strength + "%";

  let label = "Weak";
  if (strength >= 80) label = "Very Strong";
  else if (strength >= 60) label = "Strong";
  else if (strength >= 40) label = "Moderate";
  else label = "Weak";

  document.getElementById("strengthLabel").textContent = `Strength: ${label} (${strength}%)`;

  // Toggle OK and Regenerate buttons
  const okBtn = document.getElementById("okBtn");
  const regenBtn = document.getElementById("regenBtn");

  if (strength >= 70) {
    okBtn.classList.remove("hidden");
    regenBtn.classList.add("hidden");
  } else {
    okBtn.classList.add("hidden");
    regenBtn.classList.remove("hidden");
  }
}

function getPasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score += 25;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 20;
  if (/\d/.test(pwd)) score += 20;
  if (/[!@#$%^&*]/.test(pwd)) score += 20;
  if (pwd.length > 12) score += 15;
  return Math.min(score, 100);
}

function showSuccess() {
  document.getElementById("successMessage").classList.remove("hidden");
}
